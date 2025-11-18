import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoCommerceProps {
  userId: string;
}

const VideoCommerce = ({ userId }: VideoCommerceProps) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!videoUrl.trim()) {
      toast({
        title: "No URL provided",
        description: "Please enter a video URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulated video analysis - in production this would call an AI vision model
    setTimeout(() => {
      toast({
        title: "Video analyzed!",
        description: "Found 3 products in the video. This is a demo placeholder.",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Video className="h-5 w-5 text-primary" />
            Video Commerce - Moment of Intent Capture
          </h3>
          <p className="text-sm text-muted-foreground">
            Paste a video URL or upload a screenshot to discover products instantly
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste video URL (YouTube, Instagram, etc.)"
              className="flex-1"
            />
            <Button onClick={handleAnalyze} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          <div className="border-2 border-dashed rounded-lg p-12 text-center bg-muted/20">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Or drag and drop a video/image here</p>
            <p className="text-sm text-muted-foreground">
              Our AI will identify products and find similar items in our catalog
            </p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-primary">How it works:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AI vision analyzes your video frame-by-frame</li>
              <li>• Identifies fashion items, accessories, and products</li>
              <li>• Matches them with our real-time inventory</li>
              <li>• Shows you instant purchase options</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-semibold mb-4">Recent Video Analyses</h4>
        <div className="text-center py-8 text-muted-foreground">
          <p>No video analyses yet. Try analyzing your first video!</p>
        </div>
      </Card>
    </div>
  );
};

export default VideoCommerce;
