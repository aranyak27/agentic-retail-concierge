import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  // Demo mode - no authentication required

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
          
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <LogOut className="h-4 w-4 mr-2" />
            Back to Home
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
