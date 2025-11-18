import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const KnowledgeManagement = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Knowledge Base Management
      </h3>
      <p className="text-muted-foreground">Manage articles and knowledge gap candidates.</p>
    </Card>
  );
};

export default KnowledgeManagement;
