
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface Idea {
  id: string;
  name: string;
  email: string;
  category: string;
  idea: string;
  createdAt: any;
  reviewed: boolean;
}

const AdminIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "ideas"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ideasData: Idea[] = [];
      snapshot.forEach((doc) => {
        ideasData.push({ id: doc.id, ...doc.data() } as Idea);
      });
      setIdeas(ideasData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const handleReviewToggle = async (idea: Idea) => {
    try {
      await updateDoc(doc(db, "ideas", idea.id), {
        reviewed: !idea.reviewed
      });
      
      toast({
        title: idea.reviewed ? "Marked as unreviewed" : "Marked as reviewed",
      });
    } catch (error) {
      console.error("Error updating idea: ", error);
      toast({
        title: "Error",
        description: "Failed to update idea status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this idea?")) {
      try {
        await deleteDoc(doc(db, "ideas", id));
        
        toast({
          title: "Idea deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting idea: ", error);
        toast({
          title: "Error",
          description: "Failed to delete idea.",
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading ideas...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Submitted Ideas</h2>
        <Badge variant="outline" className="bg-primary text-white">
          {ideas.length} {ideas.length === 1 ? 'Idea' : 'Ideas'}
        </Badge>
      </div>

      {ideas.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">No ideas submitted yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {ideas.map((idea) => (
            <Card key={idea.id} className={`overflow-hidden transition-all duration-300 ${idea.reviewed ? 'border-green-500/50 bg-green-50/10' : 'border-amber-500/50'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="font-semibold text-lg">{idea.name}</CardTitle>
                  <Badge className={idea.reviewed ? 'bg-green-500' : 'bg-amber-500'}>
                    {idea.reviewed ? 'Reviewed' : 'Pending'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground flex gap-2 mt-1">
                  <span>{idea.email}</span>
                  <span>•</span>
                  <span className="capitalize">{idea.category}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{idea.idea}</p>
                {idea.createdAt && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted on: {idea.createdAt.toDate().toLocaleString()}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between gap-2 pt-2">
                <Button 
                  variant={idea.reviewed ? "outline" : "default"} 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleReviewToggle(idea)}
                >
                  {idea.reviewed ? 'Mark Unreviewed' : 'Mark Reviewed'}
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDelete(idea.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminIdeas;
