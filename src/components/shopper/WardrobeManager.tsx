import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WardrobeManagerProps {
  userId: string;
}

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
}

const WardrobeManager = ({ userId }: WardrobeManagerProps) => {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    color: "",
    season: "",
  });

  useEffect(() => {
    // Demo mode - no database fetch needed
  }, [userId]);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.category) {
      toast({
        title: "Missing fields",
        description: "Please fill in name and category",
        variant: "destructive",
      });
      return;
    }

    // Demo mode - just add to local state
    const newItemWithId = {
      id: Date.now().toString(),
      user_id: userId,
      ...newItem,
    };
    
    setItems(prev => [newItemWithId, ...prev]);
    toast({
      title: "Item added",
      description: "Successfully added to your wardrobe (demo mode)",
    });
    setNewItem({ name: "", category: "", color: "", season: "" });
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    // Demo mode - remove from local state
    setItems(prev => prev.filter(item => item.id !== id));
    toast({ title: "Item removed" });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Your Wardrobe
            </h3>
            <p className="text-sm text-muted-foreground">Manage your clothing items for personalized styling</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Wardrobe Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Item Name</Label>
                  <Input
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Blue denim jacket"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newItem.category} onValueChange={(v) => setNewItem({ ...newItem, category: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tops">Tops</SelectItem>
                      <SelectItem value="bottoms">Bottoms</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="outerwear">Outerwear</SelectItem>
                      <SelectItem value="footwear">Footwear</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    value={newItem.color}
                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                    placeholder="Blue, Black, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Season</Label>
                  <Select value={newItem.season} onValueChange={(v) => setNewItem({ ...newItem, season: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-season">All Season</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                      <SelectItem value="monsoon">Monsoon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleAddItem} disabled={loading} className="w-full">
                  Add to Wardrobe
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p>No wardrobe items yet. Add your first item to get personalized styling advice!</p>
            </div>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-medium transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><span className="font-medium">Category:</span> {item.category}</p>
                  {item.color && <p><span className="font-medium">Color:</span> {item.color}</p>}
                  {item.season && <p><span className="font-medium">Season:</span> {item.season}</p>}
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default WardrobeManager;
