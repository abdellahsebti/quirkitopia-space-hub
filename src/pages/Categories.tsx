
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';

// Sample data - in a real app, this would come from an API
const categoriesData = {
  books: [
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", description: "Explores the two systems that drive the way we think", tags: ["Psychology", "Behavioral Economics"] },
    { title: "Sapiens", author: "Yuval Noah Harari", description: "A brief history of humankind", tags: ["History", "Anthropology"] },
    { title: "The Design of Everyday Things", author: "Don Norman", description: "How design serves as the communication between object and user", tags: ["Design", "Psychology"] },
  ],
  youtube: [
    { title: "Kurzgesagt", description: "Animated educational videos covering science topics", tags: ["Science", "Animation"] },
    { title: "Veritasium", description: "Science and engineering videos answering questions about life", tags: ["Physics", "Engineering"] },
    { title: "TED-Ed", description: "Animated lessons on all subjects", tags: ["Education", "Animation"] },
  ],
  podcasts: [
    { title: "Radiolab", description: "Investigates a strange world through science and philosophy", tags: ["Science", "Storytelling"] },
    { title: "Freakonomics Radio", description: "Explores the hidden side of everything", tags: ["Economics", "Society"] },
    { title: "99% Invisible", description: "About all the thought that goes into the things we don't think about", tags: ["Design", "Architecture"] },
  ]
};

const CategoryItem = ({ item, type }: { item: any; type: string }) => {
  return (
    <div className="bg-white dark:bg-dark/80 rounded-xl p-6 shadow-md hover-card">
      <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
      {type === 'books' && <p className="text-secondary mb-2">by {item.author}</p>}
      <p className="mb-4">{item.description}</p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag: string, i: number) => (
          <span 
            key={i} 
            className="inline-block bg-accent/20 text-dark dark:text-accent px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Categories = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('books');
  
  useEffect(() => {
    document.title = "Quirkitopia Space! | Categories";
    
    // Check for hash in URL to set active tab
    if (location.hash) {
      const hash = location.hash.substring(1);
      if (['books', 'youtube', 'podcasts'].includes(hash)) {
        setActiveTab(hash);
        
        // Scroll to section
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    }
  }, [location]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Scroll to section
    const element = document.getElementById(tab);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="bg-primary text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Explore Categories
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover amazing content curated by our community across different categories.
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-light dark:bg-dark sticky top-16 z-40 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto py-4 space-x-4">
              {['books', 'youtube', 'podcasts'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`flex items-center px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-accent text-dark font-bold'
                      : 'bg-white/50 dark:bg-dark/50 hover:bg-accent/30'
                  }`}
                >
                  <span className="mr-2">
                    {tab === 'books' ? '📚' : tab === 'youtube' ? '🎥' : '🎙️'}
                  </span>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Section */}
        <SectionWrapper
          id="books"
          title="📚 Books"
          subtitle="Expand your mind with these thoughtfully selected books"
          bgColor="bg-light dark:bg-dark"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.books.map((book, index) => (
              <CategoryItem key={index} item={book} type="books" />
            ))}
          </div>
        </SectionWrapper>

        {/* YouTube Section */}
        <SectionWrapper
          id="youtube"
          title="🎥 YouTube Channels"
          subtitle="Educational and entertaining YouTube channels to follow"
          bgColor="bg-white dark:bg-black/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.youtube.map((channel, index) => (
              <CategoryItem key={index} item={channel} type="youtube" />
            ))}
          </div>
        </SectionWrapper>

        {/* Podcasts Section */}
        <SectionWrapper
          id="podcasts"
          title="🎙️ Podcasts"
          subtitle="Listen to these thought-provoking podcasts"
          bgColor="bg-light dark:bg-dark"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.podcasts.map((podcast, index) => (
              <CategoryItem key={index} item={podcast} type="podcasts" />
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
};

export default Categories;
