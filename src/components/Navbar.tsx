
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleRouteChange = () => {
      setActiveLink(window.location.pathname);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleRouteChange);
    
    // Set initial active link
    setActiveLink(window.location.pathname);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [scrolled]);

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glassmorphism py-2'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-serif font-bold text-white text-shadow">
            Quirkitopia <span className="text-accent">Space!</span>
          </span>
        </Link>

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
            className="ml-2 text-white hover:text-accent"
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
            className="text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="glassmorphism md:hidden py-4 px-4 mt-2 mx-4 rounded-xl">
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
