-- Create chat_messages table for storing conversation history
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  conversation_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON public.chat_messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON public.chat_messages(user_id);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat messages
CREATE POLICY "Users can view their own messages"
  ON public.chat_messages
  FOR SELECT
  USING (true); -- Public for demo, you can restrict to user_id later

CREATE POLICY "Users can insert their own messages"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (true); -- Public for demo