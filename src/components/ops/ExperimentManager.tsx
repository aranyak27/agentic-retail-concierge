import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Beaker } from "lucide-react";

const ExperimentManager = () => {
  const experiments = [
    {
      id: '1',
      name: 'Personalized Homepage Layout',
      status: 'active',
      startDate: '2024-11-01',
      variants: 2,
      traffic: '50% split',
      metric: 'Click-through rate',
      uplift: '+12.4%',
    },
    {
      id: '2',
      name: 'AI Chat Position Test',
      status: 'active',
      startDate: '2024-11-10',
      variants: 3,
      traffic: '33% split',
      metric: 'Engagement rate',
      uplift: '+8.2%',
    },
    {
      id: '3',
      name: 'Product Image Size Optimization',
      status: 'completed',
      startDate: '2024-10-15',
      variants: 2,
      traffic: '50% split',
      metric: 'Add to cart rate',
      uplift: '+15.7%',
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Beaker className="h-5 w-5 text-secondary" />
          A/B Testing & Experiments
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Configure and monitor experiments to optimize user experience
        </p>

        <div className="space-y-4">
          {experiments.map((exp) => (
            <Card key={exp.id} className="p-4 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{exp.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Started: {new Date(exp.startDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge 
                  variant={exp.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {exp.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Variants</p>
                  <p className="font-medium">{exp.variants}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Traffic</p>
                  <p className="font-medium">{exp.traffic}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Metric</p>
                  <p className="font-medium">{exp.metric}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uplift</p>
                  <p className="font-medium text-success">{exp.uplift}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Experiment Performance Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Active Experiments</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Avg. Uplift</p>
            <p className="text-2xl font-bold text-success">+12.1%</p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Total Tests Run</p>
            <p className="text-2xl font-bold">3</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ExperimentManager;
