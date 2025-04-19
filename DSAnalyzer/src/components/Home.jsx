import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/editor');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="gradient-text-accent">DSAnalyzer</h1>
        <p className="subtitle">Your Intelligent Code Analysis Companion</p>
        <div className="features">
          <div className="feature-card">
            <h3 className="gradient-text-primary">Code Analysis</h3>
            <p>Get detailed analysis of your code's time and space complexity</p>
          </div>
          <div className="feature-card">
            <h3 className="gradient-text-primary">Multiple Languages</h3>
            <p>Support for JavaScript, Python, Java, and C++</p>
          </div>
          <div className="feature-card">
            <h3 className="gradient-text-primary">Real-time Feedback</h3>
            <p>Instant suggestions and improvements for your code</p>
          </div>
        </div>
        <button 
          className="get-started-button"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home; 