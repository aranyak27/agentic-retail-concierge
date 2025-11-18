import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, Check, CheckCheck, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type MessageStatus = 'sending' | 'sent' | 'delivered' | 'error';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: MessageStatus;
}

interface ChatInterfaceProps {
  userId: string;
}

const ChatInterface = ({ userId }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, [conversationId]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(data.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date(msg.created_at),
        })));
      } else {
        // Show welcome message for new conversations
        setMessages([{
          role: 'assistant',
          content: 'Hello! I\'m your AI retail concierge. I can help you with styling advice, product recommendations, order tracking, and more. How can I assist you today?',
          timestamp: new Date(),
        }]);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveMessage = async (role: 'user' | 'assistant', content: string) => {
    try {
      await supabase.from('chat_messages').insert({
        user_id: userId,
        conversation_id: conversationId,
        role,
        content,
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Update message status to sent
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], status: 'sent' };
      return updated;
    });

    // Save user message
    await saveMessage('user', userMessage.content);
    
    // Update to delivered
    setMessages(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = { ...updated[updated.length - 1], status: 'delivered' };
      return updated;
    });

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/coordinator-agent`;
      
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          userId,
          message: userMessage.content,
          conversationHistory: messages,
        }),
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please wait a moment and try again.");
      }
      if (response.status === 402) {
        throw new Error("Payment required. Please add credits to your workspace.");
      }
      if (!response.ok || !response.body) {
        throw new Error('Failed to start stream');
      }

      // Show typing indicator
      setIsTyping(true);

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
      let streamDone = false;

      // Create assistant message placeholder
      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      
      // Wait a bit to show typing indicator
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsTyping(false);
      setMessages(prev => [...prev, assistantMessage]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        // Process line-by-line as data arrives
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              // Update the last message with accumulated content
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            // Incomplete JSON, put it back
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Save assistant message
      await saveMessage('assistant', assistantContent);

    } catch (error: any) {
      console.error('Chat error:', error);
      
      let errorMessage = "Failed to get response from AI";
      if (error.message) {
        if (error.message.includes("Rate limit")) {
          errorMessage = "Too many requests. Please wait a moment and try again.";
        } else if (error.message.includes("Payment required")) {
          errorMessage = "AI service requires credits. Please contact support.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Mark user message as error and remove assistant placeholder
      setMessages(prev => {
        const updated = [...prev];
        if (updated.length >= 2 && updated[updated.length - 2].role === 'user') {
          updated[updated.length - 2] = { ...updated[updated.length - 2], status: 'error' };
        }
        // Remove assistant placeholder if it exists
        if (updated[updated.length - 1]?.role === 'assistant' && !updated[updated.length - 1].content) {
          return updated.slice(0, -1);
        }
        return updated;
      });
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] shadow-medium">
      <div className="border-b p-4 bg-muted/50">
        <h3 className="font-semibold">AI Concierge Chat</h3>
        <p className="text-sm text-muted-foreground">Ask me anything about products, styling, or orders</p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {message.role === 'user' && message.status && (
                    <span className="flex items-center">
                      {message.status === 'sending' && (
                        <Loader2 className="h-3 w-3 animate-spin opacity-70" />
                      )}
                      {message.status === 'sent' && (
                        <Check className="h-3 w-3 opacity-70" />
                      )}
                      {message.status === 'delivered' && (
                        <CheckCheck className="h-3 w-3 opacity-70" />
                      )}
                      {message.status === 'error' && (
                        <AlertCircle className="h-3 w-3 text-destructive opacity-70" />
                      )}
                    </span>
                  )}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="bg-secondary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;
