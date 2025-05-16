
import React, { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt: any;
}

const AdminBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const booksData: Book[] = [];
      snapshot.forEach((doc) => {
        booksData.push({ id: doc.id, ...doc.data() } as Book);
      });
      setBooks(booksData);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !author || !description || !link || !image) {
      toast({
        title: "Error",
        description: "Please fill all fields and upload an image.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload image first
      const storageRef = ref(storage, `books/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      
      // Add document to Firestore
      await addDoc(collection(db, "books"), {
        title,
        author,
        description,
        imageUrl,
        link,
        createdAt: serverTimestamp(),
      });
      
      // Reset form
      setTitle('');
      setAuthor('');
      setDescription('');
      setLink('');
      setImage(null);
      
      toast({
        title: "Book added successfully!",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      toast({
        title: "Error",
        description: "Failed to add book.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteDoc(doc(db, "books", id));
        toast({
          title: "Book deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting book:", error);
        toast({
          title: "Error",
          description: "Failed to delete book.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-accent/10">
        <CardHeader>
          <CardTitle>Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Book description"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Link (Amazon, Goodreads, etc.)</label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                type="url"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cover Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
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
                  Adding Book...
                </>
              ) : (
                "Add Book"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Books List</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">No books added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                {book.imageUrl && (
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={book.imageUrl} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-3">{book.description}</p>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary hover:underline"
                  >
                    View Link
                  </a>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(book.id)}
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

export default AdminBooks;
