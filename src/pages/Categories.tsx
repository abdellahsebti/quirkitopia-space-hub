import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt: any;
}

interface YouTubeChannel {
  id: string;
  title: string;
  creator: string;
  description: string;
  channelUrl: string;
  thumbnailUrl: string;
  createdAt: any;
}

interface Podcast {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  createdAt: any;
}

const CategoryItem = ({ item, type }: { item: Book | YouTubeChannel | Podcast; type: string }) => {
  const contentUrl = type === 'youtube' ? (item as YouTubeChannel).channelUrl : item.link;

  return (
    <a 
      href={contentUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-dark/80 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      {item.imageUrl && (
        <img 
          src={type === 'youtube' ? (item as YouTubeChannel).thumbnailUrl : item.imageUrl} 
          alt={item.title} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="text-xl font-serif font-bold mb-2">{item.title}</h3>
      {'author' in item && <p className="text-secondary mb-2">by {item.author}</p>}
      {'creator' in item && <p className="text-secondary mb-2">by {(item as YouTubeChannel).creator}</p>}
      <p className="mb-4">{item.description}</p>
      <div className="inline-block bg-accent text-dark px-4 py-2 rounded-lg">
        Learn More
      </div>
    </a>
  );
};

const Categories = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState<Book[]>([]);
  const [youtubeChannels, setYouTubeChannels] = useState<YouTubeChannel[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  
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

    // Subscribe to books collection
    const booksQuery = query(collection(db, "books"), orderBy("createdAt", "desc"));
    const booksUnsubscribe = onSnapshot(booksQuery, (snapshot) => {
      const booksData: Book[] = [];
      snapshot.forEach((doc) => {
        booksData.push({ id: doc.id, ...doc.data() } as Book);
      });
      setBooks(booksData);
    });

    // Subscribe to youtube collection
    const youtubeQuery = query(collection(db, "youtube"), orderBy("createdAt", "desc"));
    const youtubeUnsubscribe = onSnapshot(youtubeQuery, (snapshot) => {
      const youtubeData: YouTubeChannel[] = [];
      snapshot.forEach((doc) => {
        youtubeData.push({ id: doc.id, ...doc.data() } as YouTubeChannel);
      });
      setYouTubeChannels(youtubeData);
    });

    // Subscribe to podcasts collection
    const podcastsQuery = query(collection(db, "podcasts"), orderBy("createdAt", "desc"));
    const podcastsUnsubscribe = onSnapshot(podcastsQuery, (snapshot) => {
      const podcastsData: Podcast[] = [];
      snapshot.forEach((doc) => {
        podcastsData.push({ id: doc.id, ...doc.data() } as Podcast);
      });
      setPodcasts(podcastsData);
      setLoading(false);
    });

    return () => {
      booksUnsubscribe();
      youtubeUnsubscribe();
      podcastsUnsubscribe();
    };
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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-lg">Loading content...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
            {books.map((book) => (
              <CategoryItem key={book.id} item={book} type="books" />
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
            {youtubeChannels.map((channel) => (
              <CategoryItem key={channel.id} item={channel} type="youtube" />
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
            {podcasts.map((podcast) => (
              <CategoryItem key={podcast.id} item={podcast} type="podcasts" />
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
};

export default Categories;
