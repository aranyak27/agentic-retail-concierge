import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, TrendingUp, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RewardsPanelProps {
  userId: string;
}

const RewardsPanel = ({ userId }: RewardsPanelProps) => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [activeRules, setActiveRules] = useState<any[]>([]);

  useEffect(() => {
    fetchActiveRules();
  }, [userId]);

  const fetchActiveRules = async () => {
    const { data } = await supabase
      .from('reward_rules')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false });

    if (data) setActiveRules(data);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-accent/20 p-3 rounded-full">
            <Gift className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your Rewards</h3>
            <p className="text-sm text-muted-foreground">Dynamic offers based on your loyalty</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Total Rewards</p>
            <p className="text-2xl font-bold">{rewards.length}</p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">This Month</p>
            <p className="text-2xl font-bold">
              {rewards.filter(r => new Date(r.applied_at).getMonth() === new Date().getMonth()).length}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Estimated Savings</p>
            <p className="text-2xl font-bold">
              ₹{rewards.reduce((sum, r) => sum + parseFloat(r.incentive_value), 0).toFixed(0)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Available Offers
        </h4>
        <div className="space-y-3">
          {activeRules.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No active offers at the moment</p>
          ) : (
            activeRules.map((rule) => (
              <Card key={rule.id} className="p-4 hover:shadow-medium transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium">{rule.name}</h5>
                  <Badge variant="secondary">{rule.type.replace('_', ' ')}</Badge>
                </div>
                {rule.description && (
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                )}
              </Card>
            ))
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Recent Rewards History
        </h4>
        <div className="space-y-3">
          {rewards.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              No rewards applied yet. Keep shopping to unlock rewards!
            </p>
          ) : (
            rewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{reward.incentive_type}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(reward.applied_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline" className="text-success border-success">
                  ₹{parseFloat(reward.incentive_value).toFixed(2)}
                </Badge>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default RewardsPanel;
