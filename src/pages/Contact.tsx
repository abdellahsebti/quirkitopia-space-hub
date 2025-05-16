
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Instagram, MessageCircle } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    document.title = "Quirkitopia Space! | Contact";
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Connect With Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you!
            </p>
          </div>
        </div>

        <section className="py-16 bg-light dark:bg-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-dark/80 rounded-xl p-8 shadow-lg hover-card">
                  <div className="text-4xl mb-4">📱</div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Social Media</h2>
                  <p className="mb-6">
                    Follow us on social media to stay updated with the latest quirky content and community events.
                  </p>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://instagram.com/quirki_topia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-creative transition-colors"
                    >
                      <Instagram className="h-5 w-5 mr-2" />
                      <span>@quirki_topia</span>
                    </a>
                    
                    <a 
                      href="https://t.me/quirkitopia" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:text-creative transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      <span>t.me/quirkitopia</span>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-dark/80 rounded-xl p-8 shadow-lg hover-card">
                  <div className="text-4xl mb-4">💡</div>
                  <h2 className="text-2xl font-serif font-bold mb-4">Share Your Ideas</h2>
                  <p className="mb-6">
                    Have a quirky idea or suggestion for our community? We'd love to hear it!
                  </p>
                  
                  <Button 
                    onClick={() => window.location.href = '/idea-form'} 
                    className="bg-accent text-dark hover:bg-accent/80 font-bold w-full"
                  >
                    Submit an Idea
                  </Button>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Join Our Community</h2>
                <p className="mb-8 max-w-2xl mx-auto">
                  Quirkitopia Space is more than just a website - it's a community of creative minds. Join us and be part of something special!
                </p>
                
                <div className="bg-gradient-to-br from-creative to-creative/60 rounded-xl p-8 shadow-lg inline-block">
                  <p className="text-xl font-serif font-bold mb-2">Our Community Values</p>
                  <p className="italic">
                    "Creativity, Knowledge, Community, and Wonder"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
