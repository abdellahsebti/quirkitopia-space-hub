
import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Join Our Community!</h2>
          <p className="text-lg mb-8">
            Connect with us on social media to stay updated with the latest quirky content and community events.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="https://instagram.com/quirki_topia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <Button 
                variant="outline" 
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-6 rounded-xl transition-all group-hover:scale-105 flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                <span>Instagram: @quirki_topia</span>
              </Button>
            </a>
            
            <a 
              href="https://t.me/quirkitopia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <Button 
                className="bg-accent text-dark hover:bg-accent/80 px-6 py-6 rounded-xl transition-all group-hover:scale-105 flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Telegram: Join Here</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
