
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IdeaFormComponent from '@/components/IdeaForm';

const IdeaFormPage = () => {
  useEffect(() => {
    document.title = "Quirkitopia Space! | Submit an Idea";
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              💡 Propose Your Idea
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Share your quirky and creative ideas with our community!
            </p>
          </div>
        </div>

        <section className="py-16 bg-light dark:bg-dark">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">What's Your Quirky Idea?</h2>
                <p className="text-lg text-secondary">
                  We believe every idea brings magic to our community. Fill out the form below to share yours!
                </p>
              </div>
              
              <IdeaFormComponent />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IdeaFormPage;
