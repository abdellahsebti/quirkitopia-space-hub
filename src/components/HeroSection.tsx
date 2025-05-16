
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Emojis with animation delays
  const emojis = [
    { icon: '🎩', delay: 'delay-100' },
    { icon: '💡', delay: 'delay-200' },
    { icon: '✨', delay: 'delay-300' },
    { icon: '🌈', delay: 'delay-400' },
    { icon: '🎭', delay: 'delay-500' },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-9xl">🎩</div>
        <div className="absolute bottom-40 right-20 text-9xl">💡</div>
        <div className="absolute top-40 right-40 text-6xl">✨</div>
        <div className="absolute bottom-20 left-40 text-6xl">🎨</div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`flex justify-center space-x-4 mb-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
            {emojis.map((emoji, index) => (
              <span 
                key={index}
                className={`text-4xl md:text-5xl animate-bounce-slow ${emoji.delay}`}
              >
                {emoji.icon}
              </span>
            ))}
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold font-serif mb-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            Quirkitopia <span className="text-accent">Space!</span>
          </h1>
          
          <p className={`text-lg md:text-xl mb-8 ${isVisible ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
            Where every moment is a celebration of uniqueness and creativity!
          </p>
          
          <div className={`flex flex-wrap justify-center gap-4 ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
            <Button 
              onClick={() => navigate('/categories')}
              className="bg-accent text-dark hover:bg-accent/80 font-bold px-8 py-6 rounded-xl transition-all hover:scale-105"
            >
              Explore Categories
            </Button>
            
            <Button 
              onClick={() => navigate('/idea-form')}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl transition-all hover:scale-105"
            >
              💡 Submit an Idea
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
