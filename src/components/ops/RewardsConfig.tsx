import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";

const RewardsConfig = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Gift className="h-5 w-5 text-accent" />
        Reward Rules Configuration
      </h3>
      <p className="text-muted-foreground">Configure dynamic reward rules and pricing strategies here.</p>
    </Card>
  );
};

export default RewardsConfig;
