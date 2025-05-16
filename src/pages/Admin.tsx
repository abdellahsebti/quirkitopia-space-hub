
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';

// Admin Components
import AdminBooks from '@/components/admin/AdminBooks';
import AdminYouTube from '@/components/admin/AdminYouTube';
import AdminPodcasts from '@/components/admin/AdminPodcasts';
import AdminIdeas from '@/components/admin/AdminIdeas';
import AdminLogin from '@/components/admin/AdminLogin';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Quirkitopia Space! | Admin Panel";
    
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-10 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              🔐 Admin Panel
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Manage your Quirkitopia Space! content here.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 bg-accent text-dark hover:bg-accent/80"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        <section className="py-10 bg-light dark:bg-dark min-h-screen">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="books" className="w-full">
              <TabsList className="w-full flex flex-wrap mb-8 bg-primary/10 p-1 rounded-lg">
                <TabsTrigger value="books" className="flex-1">📚 Books</TabsTrigger>
                <TabsTrigger value="youtube" className="flex-1">🎥 YouTube</TabsTrigger>
                <TabsTrigger value="podcasts" className="flex-1">🎙️ Podcasts</TabsTrigger>
                <TabsTrigger value="ideas" className="flex-1">💡 User Ideas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="books" className="p-4">
                <AdminBooks />
              </TabsContent>
              
              <TabsContent value="youtube" className="p-4">
                <AdminYouTube />
              </TabsContent>
              
              <TabsContent value="podcasts" className="p-4">
                <AdminPodcasts />
              </TabsContent>
              
              <TabsContent value="ideas" className="p-4">
                <AdminIdeas />
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
