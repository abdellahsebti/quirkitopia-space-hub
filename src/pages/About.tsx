
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Quirkitopia Space! | About Us";
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              What is Quirkitopia? 🎩💡
            </h1>
          </div>
        </div>

        <SectionWrapper
          title="Our Story"
          bgColor="bg-light dark:bg-dark"
        >
          <div className="max-w-3xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Quirkitopia is a team made by NHSAST students. It's a creative space where being different means being special. We promote content in religious, scientific, technological, and health fields to grow great minds. We believe every idea brings magic — and we want yours too!
              </p>
              
              <div className="bg-creative/10 border-l-4 border-creative p-6 my-8 rounded-r-lg">
                <h3 className="text-xl font-serif font-bold mb-3">What it means to be a Quirkitopier</h3>
                <p className="italic">
                  "Being a Quirkitopier means embracing your unique perspective, celebrating creativity, and sharing knowledge that can spark imagination and growth in others. We don't just consume content - we thoughtfully engage with it and allow it to transform our thinking."
                </p>
              </div>
              
              <h3 className="text-2xl font-serif font-bold mt-8 mb-4">Our Values</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-dark/80 p-6 rounded-xl shadow-md">
                  <div className="text-3xl mb-3">🌈</div>
                  <h4 className="font-serif font-bold text-lg mb-2">Creativity</h4>
                  <p>We value thinking outside the box and approaching problems from unique angles.</p>
                </div>
                
                <div className="bg-white dark:bg-dark/80 p-6 rounded-xl shadow-md">
                  <div className="text-3xl mb-3">🧠</div>
                  <h4 className="font-serif font-bold text-lg mb-2">Knowledge</h4>
                  <p>We believe in continuous learning across various disciplines.</p>
                </div>
                
                <div className="bg-white dark:bg-dark/80 p-6 rounded-xl shadow-md">
                  <div className="text-3xl mb-3">🤝</div>
                  <h4 className="font-serif font-bold text-lg mb-2">Community</h4>
                  <p>We grow together by sharing ideas and supporting each other.</p>
                </div>
                
                <div className="bg-white dark:bg-dark/80 p-6 rounded-xl shadow-md">
                  <div className="text-3xl mb-3">💫</div>
                  <h4 className="font-serif font-bold text-lg mb-2">Wonder</h4>
                  <p>We maintain a sense of curiosity and awe about the world around us.</p>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <Button 
                  onClick={() => navigate('/idea-form')} 
                  className="bg-accent text-dark hover:bg-accent/80 font-bold px-8 py-6 rounded-xl transition-all hover:scale-105"
                >
                  💡 Propose Your Idea
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
};

export default About;
