import { Bot, ShoppingBag, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Agentic Commerce Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Hyper-Autonomous Retail Concierge
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Experience the future of retail with GPT-powered multi-agent AI that understands, anticipates, and executes—transforming shopping into intelligent conversations
          </p>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card p-6 rounded-lg border shadow-soft animate-slide-up">
              <Bot className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Multi-Agent AI</h3>
              <p className="text-sm text-muted-foreground">
                Coordinator, Stylist, Rewards, and Verification agents working together
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-soft animate-slide-up [animation-delay:100ms]">
              <Sparkles className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-Time Intelligence</h3>
              <p className="text-sm text-muted-foreground">
                Live inventory, dynamic rewards, and instant personalization
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-soft animate-slide-up [animation-delay:200ms]">
              <BarChart3 className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Trusted Execution</h3>
              <p className="text-sm text-muted-foreground">
                Built-in verification, safety checks, and complete transparency
              </p>
            </div>
          </div>

          {/* Persona Selection */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => navigate('/auth?role=shopper')}>
              <ShoppingBag className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-3">I'm a Shopper</h2>
              <p className="text-muted-foreground mb-6">
                Get AI-powered styling advice, video shopping experiences, and smart rewards tailored just for you
              </p>
              <Button className="w-full group-hover:bg-primary-glow">
                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => navigate('/auth?role=ops_manager')}>
              <BarChart3 className="h-16 w-16 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-3">I'm a Retail Manager</h2>
              <p className="text-muted-foreground mb-6">
                Configure AI agents, monitor CLV & AOV metrics, manage safety, and drive growth
              </p>
              <Button variant="secondary" className="w-full">
                Access Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-24">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Powered by Lovable AI • Built for India's Next-Gen Retail</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
