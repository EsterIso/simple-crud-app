import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import './Nav.styles.css';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ({ menuItems, logo = "TaskTrack" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleNavClick = (href) => {
    if (href === '/task' && !isSignedIn) {
      // Let SignInButton handle the click
      return;
    }
    navigate(href);
  };

  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-content">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <div className="logo-icon" />
              <span className={`logo-text ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
                {logo}
              </span>
            </Link>
          </div>

          <div className="desktop-menu">
            {menuItems.map((item) => (
              item.href === '/task' && !isSignedIn ? (
                <SignInButton key={item.name} mode="modal">
                  <Link
                    to={item.href}
                    className={`nav-link ${isScrolled ? 'scrolled' : 'not-scrolled'}`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.name}
                  </Link>
                </SignInButton>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${isScrolled ? 'scrolled' : 'not-scrolled'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>

          <div className='clerk-container'> 
            <SignedOut>
              <SignInButton className={`sign-in-btn ${isScrolled ? 'scrolled' : 'not-scrolled'}`}/>
            </SignedOut>
            <SignedIn>
              <div className={`user-btn ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>

          <div className="mobile-menu-button">
            <div className='mobile-clerk-container'> 
              <SignedOut>
                <SignInButton className={`sign-in-btn ${isScrolled ? 'scrolled' : 'not-scrolled'}`}/>
              </SignedOut>
              <SignedIn>
                <div className={`user-btn ${isScrolled ? 'scrolled' : 'not-scrolled'}`}>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`menu-button ${isScrolled ? 'scrolled' : 'not-scrolled'}`}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-links">
            {menuItems.map((item) => (
              item.href === '/task' && !isSignedIn ? (
                <SignInButton key={item.name} mode="modal">
                  <Link
                    to={item.href}
                    className="mobile-menu-item"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.name}
                  </Link>
                </SignInButton>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="mobile-menu-item"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {item.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;