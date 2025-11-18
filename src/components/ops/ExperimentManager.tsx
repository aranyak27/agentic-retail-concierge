import { Card } from "@/components/ui/card";
import { Beaker } from "lucide-react";

const ExperimentManager = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Beaker className="h-5 w-5 text-secondary" />
        A/B Testing & Experiments
      </h3>
      <p className="text-muted-foreground">Configure and monitor experiments.</p>
    </Card>
  );
};

export default ExperimentManager;
