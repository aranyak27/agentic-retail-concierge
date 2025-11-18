import { Bot, ShoppingBag, BarChart3, ArrowRight, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Retail Platform</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent animate-fade-in">
            The Future of Shopping
          </h1>
          
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Multi-agent AI that understands your style, manages inventory, and delivers personalized experiences
          </p>

          {/* Browse Products CTA */}
          <div className="flex justify-center mb-20 animate-fade-in">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-glow hover:shadow-elegant transition-all"
              onClick={() => navigate('/catalog')}
            >
              <Store className="h-5 w-5 mr-2" />
              Browse Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Persona Cards - Prominent */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 cursor-pointer animate-slide-up" onClick={() => navigate('/shopper')}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-10">
                <div className="mb-6">
                  <ShoppingBag className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Shopper</h2>
                <p className="text-muted-foreground mb-8 text-base">
                  AI styling assistant, virtual wardrobe, video shopping, and personalized rewards
                </p>
                <Button size="lg" className="w-full group-hover:shadow-medium transition-all">
                  Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-secondary transition-all duration-300 cursor-pointer animate-slide-up [animation-delay:100ms]" onClick={() => navigate('/ops')}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-10">
                <div className="mb-6">
                  <BarChart3 className="h-20 w-20 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Retail Manager</h2>
                <p className="text-muted-foreground mb-8 text-base">
                  Agent governance, analytics dashboard, experiments, and knowledge management
                </p>
                <Button size="lg" variant="secondary" className="w-full group-hover:shadow-medium transition-all">
                  Access Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Feature Pills - Simplified */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Multi-Agent AI</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium">Real-Time Intelligence</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border">
              <BarChart3 className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Trusted Execution</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by Lovable AI • Built for India's Next-Gen Retail</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
