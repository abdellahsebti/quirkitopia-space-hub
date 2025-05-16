
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Quirkitopia Space! | Page Not Found";
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="min-h-[70vh] flex items-center justify-center bg-light dark:bg-dark">
          <div className="container mx-auto px-4 text-center">
            <div className="text-9xl mb-6 animate-bounce-slow">🧩</div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Oops! Page Not Found
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              It seems like you've ventured into an unexplored corner of Quirkitopia. Let's get you back on track!
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-accent text-dark hover:bg-accent/80 font-bold px-8 py-6 rounded-xl"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
