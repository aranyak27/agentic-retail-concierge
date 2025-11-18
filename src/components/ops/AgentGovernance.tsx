import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle } from "lucide-react";

const AgentGovernance = () => {
  const pendingReviews = [
    {
      id: '1',
      agent: 'Rewards',
      action: 'High-value discount approval',
      uncertainty: 0.82,
      amount: '₹750',
      timestamp: new Date('2024-11-18T10:30:00'),
    },
    {
      id: '2',
      agent: 'Service',
      action: 'Return request beyond policy',
      uncertainty: 0.75,
      amount: '₹2,450',
      timestamp: new Date('2024-11-18T09:15:00'),
    },
  ];

  const recentActions = [
    {
      agent: 'Coordinator',
      action: 'Product recommendation',
      status: 'Auto-approved',
      uncertainty: 0.12,
      timestamp: '2 min ago',
    },
    {
      agent: 'Stylist',
      action: 'Outfit suggestion',
      status: 'Auto-approved',
      uncertainty: 0.28,
      timestamp: '15 min ago',
    },
    {
      agent: 'Verification',
      action: 'Order verification',
      status: 'Auto-approved',
      uncertainty: 0.45,
      timestamp: '1 hour ago',
    },
  ];

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
          Pending Reviews ({pendingReviews.length})
        </h4>
        {pendingReviews.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">No high-risk actions pending review</p>
        ) : (
          <div className="space-y-3">
            {pendingReviews.map((review) => (
              <Card key={review.id} className="p-4 border-warning/50 bg-warning/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium">{review.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {review.agent} Agent • {review.amount}
                    </p>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning">
                    Uncertainty: {(review.uncertainty * 100).toFixed(0)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {review.timestamp.toLocaleString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Recent Agent Actions</h4>
        <div className="space-y-2">
          {recentActions.map((action, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{action.agent}</p>
                <p className="text-xs text-muted-foreground">{action.action}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {action.status}
                </Badge>
                <p className="text-xs text-muted-foreground">{action.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AgentGovernance;
