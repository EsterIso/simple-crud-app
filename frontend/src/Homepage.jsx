import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, SignInButton } from "@clerk/clerk-react";
import Nav from './components/layout/Nav/Nav.jsx';
import './index.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tasks', href: '/task' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/task');
    }
  };

  return (
    <div className="app">
      <Nav menuItems={menuItems} logo="TaskTrack" />

      <div className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to TaskTrack
            </h1>
            <p className="hero-text">
              Stay organized, boost productivity, and accomplish more. TaskTrack helps you manage your tasks effortlessly with a simple, intuitive interface that keeps you focused on what matters most.
            </p>
            {isSignedIn ? (
              <button 
                className="hero-button"
                onClick={handleGetStarted}
              >
                Get Started
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="hero-button">
                  Get Started
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>

      <div className="features">
        <div className="features-grid">
          {[1, 2, 3].map((item) => (
            <div key={1} className="feature-card">
              <div className="feature-icon">
                <div className="feature-icon-inner">
                  {/* A plus or pencil icon would work well here */}
                </div>
              </div>
              <h2 className="feature-title">
                Quick Add Tasks
              </h2>
              <p className="feature-text">
                Add tasks with a single click. No complicated forms or endless options - just type and save to keep track of what needs to get done.
              </p>
            </div>,
            <div key={2} className="feature-card">
            <div className="feature-icon">
              <div className="feature-icon-inner">
                {/* A checkmark icon would be perfect */}
              </div>
            </div>
            <h2 className="feature-title">
              Mark Complete
            </h2>
            <p className="feature-text">
              Simply check off tasks as you complete them. Watch your to-do list shrink and feel satisfied as you make progress through your day.
            </p>
          </div>,
          <div key={3} className="feature-card">
          <div className="feature-icon">
            <div className="feature-icon-inner">
              {/* A list icon would work well */}
            </div>
          </div>
          <h2 className="feature-title">
            Clear Overview
          </h2>
          <p className="feature-text">
            See all your tasks in one clean, simple list. Focus on what matters without getting lost in complicated features or cluttered interfaces.
          </p>
        </div>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;