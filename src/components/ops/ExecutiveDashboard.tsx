import { Card } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, CheckCircle } from "lucide-react";

const ExecutiveDashboard = () => {
  const metrics = [
    { label: "AOV Uplift", value: "+18.5%", icon: DollarSign, color: "text-success" },
    { label: "CLV Impact", value: "+24.3%", icon: TrendingUp, color: "text-primary" },
    { label: "FRIES Trust Score", value: "8.7/10", icon: CheckCircle, color: "text-accent" },
    { label: "Active Users", value: "1,247", icon: Users, color: "text-secondary" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Performance Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="p-4 bg-gradient-to-br from-card to-muted/20">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-background ${metric.color}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
              <p className="text-2xl font-bold">{metric.value}</p>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Agent Performance Overview</h3>
        <div className="space-y-4">
          {['Coordinator', 'Stylist', 'Rewards', 'Service', 'Verification'].map((agent) => (
            <div key={agent} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">{agent} Agent</span>
              <span className="text-sm text-success">Active • 99.8% uptime</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;
