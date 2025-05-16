
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface YoutubeChannel {
  id: string;
  title: string;
  creator: string;
  description: string;
  channelUrl: string;
  thumbnailUrl: string;
  createdAt: any;
}

const AdminYouTube = () => {
  const [channels, setChannels] = useState<YoutubeChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState('');
  const [description, setDescription] = useState('');
  const [channelUrl, setChannelUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  useEffect(() => {
    const q = query(collection(db, "youtube"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const channelsData: YoutubeChannel[] = [];
      snapshot.forEach((doc) => {
        channelsData.push({ id: doc.id, ...doc.data() } as YoutubeChannel);
      });
      setChannels(channelsData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const getYouTubeID = (url: string) => {
    // Get channel ID or username from URL
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|channel\/|@)|youtu\.be\/)([^"&?\/\s]{11,})/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !creator || !description || !channelUrl || !thumbnailUrl) {
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
      await addDoc(collection(db, "youtube"), {
        title,
        creator,
        description,
        channelUrl,
        thumbnailUrl,
        createdAt: serverTimestamp(),
      });
      
      // Reset form
      setTitle('');
      setCreator('');
      setDescription('');
      setChannelUrl('');
      setThumbnailUrl('');
      
      toast({
        title: "YouTube channel added successfully!",
      });
    } catch (error) {
      console.error("Error adding YouTube channel:", error);
      toast({
        title: "Error",
        description: "Failed to add YouTube channel.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this YouTube channel?")) {
      try {
        await deleteDoc(doc(db, "youtube", id));
        toast({
          title: "YouTube channel deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting YouTube channel:", error);
        toast({
          title: "Error",
          description: "Failed to delete YouTube channel.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-accent/10">
        <CardHeader>
          <CardTitle>Add New YouTube Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Channel Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Channel title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Creator Name</label>
                <Input
                  value={creator}
                  onChange={(e) => setCreator(e.target.value)}
                  placeholder="Creator name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Channel Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Channel description"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Channel URL</label>
              <Input
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://www.youtube.com/c/..."
                type="url"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
              <Input
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="https://i.ytimg.com/vi/..."
                type="url"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use a YouTube video thumbnail or channel art URL
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-accent text-dark hover:bg-accent/80"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Channel...
                </>
              ) : (
                "Add YouTube Channel"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">YouTube Channels List</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No YouTube channels added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {channels.map((channel) => (
              <Card key={channel.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                {channel.thumbnailUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={channel.thumbnailUrl} 
                      alt={channel.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{channel.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {channel.creator}</p>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-3">{channel.description}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <a 
                    href={channel.channelUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary hover:underline"
                  >
                    Visit Channel
                  </a>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(channel.id)}
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

export default AdminYouTube;
