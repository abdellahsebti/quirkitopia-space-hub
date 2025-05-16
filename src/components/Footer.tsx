
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">
              Quirkitopia <span className="text-accent">Space!</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Where every moment is a celebration of uniqueness and creativity!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/quirki_topia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-creative transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://t.me/quirkitopia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-creative transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-creative transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-creative transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-creative transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-creative transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/idea-form" className="hover:text-creative transition-colors">
                  Submit an Idea
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categories#books" className="hover:text-creative transition-colors">
                  📚 Books
                </Link>
              </li>
              <li>
                <Link to="/categories#youtube" className="hover:text-creative transition-colors">
                  🎥 YouTube Channels
                </Link>
              </li>
              <li>
                <Link to="/categories#podcasts" className="hover:text-creative transition-colors">
                  🎙️ Podcasts
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Quirkitopia Space! | Created by NHSAST students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
