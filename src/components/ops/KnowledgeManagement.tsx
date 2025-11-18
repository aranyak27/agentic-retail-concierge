import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const KnowledgeManagement = () => {
  const knowledgeArticles = [
    {
      id: '1',
      title: 'Return & Exchange Policy',
      category: 'Customer Service',
      views: 1247,
      published: true,
    },
    {
      id: '2',
      title: 'Sizing Guide for Indian Wear',
      category: 'Product Information',
      views: 892,
      published: true,
    },
    {
      id: '3',
      title: 'Festive Collection Care Instructions',
      category: 'Product Care',
      views: 543,
      published: true,
    },
  ];

  const gapCandidates = [
    {
      id: '1',
      query: 'How to combine traditional and western wear?',
      frequency: 34,
      status: 'pending',
    },
    {
      id: '2',
      query: 'Best fabrics for summer in India',
      frequency: 28,
      status: 'new',
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Knowledge Articles
        </h3>
        <div className="space-y-3">
          {knowledgeArticles.map((article) => (
            <Card key={article.id} className="p-4 hover:shadow-medium transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{article.title}</h4>
                  <p className="text-sm text-muted-foreground">{article.category}</p>
                </div>
                <div className="text-right">
                  <Badge variant={article.published ? "default" : "secondary"}>
                    {article.published ? "Published" : "Draft"}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {article.views} views
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Knowledge Gap Candidates</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Common queries without documented answers
        </p>
        <div className="space-y-3">
          {gapCandidates.map((gap) => (
            <Card key={gap.id} className="p-4 border-accent/50 bg-accent/5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium mb-1">{gap.query}</p>
                  <p className="text-sm text-muted-foreground">
                    Asked {gap.frequency} times
                  </p>
                </div>
                <Badge 
                  variant={gap.status === 'new' ? 'default' : 'outline'}
                  className="capitalize"
                >
                  {gap.status}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default KnowledgeManagement;
