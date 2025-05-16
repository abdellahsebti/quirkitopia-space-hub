import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavLinkProps = {
  to: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const NavLink = ({ to, label, isActive, onClick }: NavLinkProps) => (
  <Link
    to={to}
    className={`relative px-3 py-2 transition-colors duration-300 ${
      isActive
        ? 'text-white font-bold'
        : 'text-white hover:text-creative'
    } text-shadow`}
    onClick={onClick}
  >
    {label}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-creative rounded-full" />
    )}
  </Link>
);

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleRouteChange = () => {
      setActiveLink(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Set initial active link
    setActiveLink(window.location.pathname);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigation = (path: string) => {
    setActiveLink(path);
    setMobileMenuOpen(false);
    navigate(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 py-2 bg-primary shadow-lg"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-serif font-bold text-white text-shadow group-hover:scale-105 transition-transform">
              Quirkitopia <span className="text-accent animate-pulse">Space!</span>
            </span>
          </Link>
          <Link 
            to="/admin/login"
            className="text-sm text-white/80 hover:text-accent transition-colors flex items-center space-x-1"
          >
            <span className="hidden sm:inline">Admin</span>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/20 text-accent">
              👑
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink
            to="/"
            label="Home"
            isActive={activeLink === '/'}
            onClick={() => handleNavigation('/')}
          />
          <NavLink
            to="/categories"
            label="Categories"
            isActive={activeLink === '/categories'}
            onClick={() => handleNavigation('/categories')}
          />
          <NavLink
            to="/about"
            label="About Us"
            isActive={activeLink === '/about'}
            onClick={() => handleNavigation('/about')}
          />
          <NavLink
            to="/contact"
            label="Contact"
            isActive={activeLink === '/contact'}
            onClick={() => handleNavigation('/contact')}
          />
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 text-white hover:text-accent transition-all hover:scale-110"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="mr-2 text-white hover:text-accent"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white hover:bg-primary-dark"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="bg-primary md:hidden py-4 px-4 mt-2 mx-4 rounded-xl animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <NavLink
              to="/"
              label="Home"
              isActive={activeLink === '/'}
              onClick={() => handleNavigation('/')}
            />
            <NavLink
              to="/categories"
              label="Categories"
              isActive={activeLink === '/categories'}
              onClick={() => handleNavigation('/categories')}
            />
            <NavLink
              to="/about"
              label="About Us"
              isActive={activeLink === '/about'}
              onClick={() => handleNavigation('/about')}
            />
            <NavLink
              to="/contact"
              label="Contact"
              isActive={activeLink === '/contact'}
              onClick={() => handleNavigation('/contact')}
            />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
