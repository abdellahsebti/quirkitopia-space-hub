
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import SectionWrapper from '@/components/SectionWrapper';
import CategoryCard from '@/components/CategoryCard';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  useEffect(() => {
    document.title = "Quirkitopia Space! | Home";
  }, []);

  const categories = [
    {
      title: "Books",
      emoji: "📚",
      description: "Discover quirky books that expand your mind and imagination.",
      color: "bg-creative/20",
      link: "/categories#books",
    },
    {
      title: "YouTube Channels",
      emoji: "🎥",
      description: "Explore amazing YouTube channels that educate and entertain.",
      color: "bg-accent/20",
      link: "/categories#youtube",
    },
    {
      title: "Podcasts",
      emoji: "🎙️",
      description: "Listen to thought-provoking podcasts from various fields.",
      color: "bg-primary/20",
      link: "/categories#podcasts",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />

        <SectionWrapper
          title="Explore Categories"
          subtitle="Discover amazing content curated by our community"
          centered
          bgColor="bg-light dark:bg-dark"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                emoji={category.emoji}
                description={category.description}
                color={category.color}
                link={category.link}
              />
            ))}
          </div>
        </SectionWrapper>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
