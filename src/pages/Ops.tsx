import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3, Shield, Gift, BookOpen, Beaker } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ExecutiveDashboard from "@/components/ops/ExecutiveDashboard";
import AgentGovernance from "@/components/ops/AgentGovernance";
import RewardsConfig from "@/components/ops/RewardsConfig";
import KnowledgeManagement from "@/components/ops/KnowledgeManagement";
import ExperimentManager from "@/components/ops/ExperimentManager";

const Ops = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth?role=ops_manager');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth?role=ops_manager');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "Session ended successfully.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Operations Dashboard</h1>
              <p className="text-sm text-muted-foreground">Agent Governance & Analytics</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Agents</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Knowledge</span>
            </TabsTrigger>
            <TabsTrigger value="experiments" className="flex items-center gap-2">
              <Beaker className="h-4 w-4" />
              <span className="hidden sm:inline">Tests</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <AgentGovernance />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <RewardsConfig />
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4">
            <KnowledgeManagement />
          </TabsContent>

          <TabsContent value="experiments" className="space-y-4">
            <ExperimentManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Ops;
