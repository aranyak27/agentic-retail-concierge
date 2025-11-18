import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, Sparkles, Video, Gift, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatInterface from "@/components/shopper/ChatInterface";
import WardrobeManager from "@/components/shopper/WardrobeManager";
import VideoCommerce from "@/components/shopper/VideoCommerce";
import RewardsPanel from "@/components/shopper/RewardsPanel";

const Shopper = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Demo mode - no authentication required
  const demoUserId = 'demo-shopper-' + Date.now();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Retail Concierge</h1>
              <p className="text-sm text-muted-foreground">Your AI Shopping Assistant</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <LogOut className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="stylist" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Stylist</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Video</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <ChatInterface userId={demoUserId} />
          </TabsContent>

          <TabsContent value="stylist" className="space-y-4">
            <WardrobeManager userId={demoUserId} />
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <VideoCommerce userId={demoUserId} />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <RewardsPanel userId={demoUserId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Shopper;
