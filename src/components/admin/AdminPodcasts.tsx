
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  podcastUrl: string;
  imageUrl: string;
  createdAt: any;
}

const AdminPodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [description, setDescription] = useState('');
  const [podcastUrl, setPodcastUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const q = query(collection(db, "podcasts"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const podcastsData: Podcast[] = [];
      snapshot.forEach((doc) => {
        podcastsData.push({ id: doc.id, ...doc.data() } as Podcast);
      });
      setPodcasts(podcastsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !host || !description || !podcastUrl || !imageUrl) {
      toast({
        title: "Error",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Add document to Firestore
      await addDoc(collection(db, "podcasts"), {
        title,
        host,
        description,
        podcastUrl,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      
      // Reset form
      setTitle('');
      setHost('');
      setDescription('');
      setPodcastUrl('');
      setImageUrl('');
      
      toast({
        title: "Podcast added successfully!",
      });
    } catch (error) {
      console.error("Error adding podcast:", error);
      toast({
        title: "Error",
        description: "Failed to add podcast.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this podcast?")) {
      try {
        await deleteDoc(doc(db, "podcasts", id));
        toast({
          title: "Podcast deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting podcast:", error);
        toast({
          title: "Error",
          description: "Failed to delete podcast.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-accent/10">
        <CardHeader>
          <CardTitle>Add New Podcast</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Podcast Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Podcast title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Host/Creator</label>
                <Input
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="Host name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Podcast Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Podcast description"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Podcast URL</label>
              <Input
                value={podcastUrl}
                onChange={(e) => setPodcastUrl(e.target.value)}
                placeholder="https://..."
                type="url"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Link to Apple Podcasts, Spotify, or other streaming platform
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                type="url"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent text-dark hover:bg-accent/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Podcast...
                </>
              ) : (
                "Add Podcast"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Podcasts List</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : podcasts.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No podcasts added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {podcasts.map((podcast) => (
              <Card key={podcast.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                {podcast.imageUrl && (
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={podcast.imageUrl} 
                      alt={podcast.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{podcast.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {podcast.host}</p>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-3">{podcast.description}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <a 
                    href={podcast.podcastUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary hover:underline"
                  >
                    Listen Now
                  </a>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(podcast.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPodcasts;
