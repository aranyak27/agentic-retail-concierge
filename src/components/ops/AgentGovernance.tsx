import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

const AgentGovernance = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Agent Safety & Governance
        </h3>
        <div className="grid gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="font-medium mb-2">Human-in-the-Loop Threshold</p>
            <p className="text-sm text-muted-foreground">Uncertainty Score: &gt; 0.7</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="font-medium mb-2">Max Discount Cap</p>
            <p className="text-sm text-muted-foreground">15% per transaction</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Pending Reviews
        </h4>
        <p className="text-center py-8 text-muted-foreground">No high-risk actions pending review</p>
      </Card>
    </div>
  );
};

export default AgentGovernance;
