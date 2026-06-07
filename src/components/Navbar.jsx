import React, { useState } from 'react';
import { Leaf, Flame, Award, Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ xp, streak, levelName, theme, toggleTheme, onStartQuiz }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    setIsOpen(false);
    // If not on home page, change location first, but since it's a HashRouter, we can just hash
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '/';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Logo */}
        <a href="#/" className="logo" onClick={() => handleScroll('hero')}>
          <div className="logo-icon">
            <Leaf size={18} fill="#FFF" />
          </div>
          <span>Finlit</span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <button onClick={() => handleScroll('learn')} className="nav-link btn-secondary" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              Learn
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll('tools')} className="nav-link btn-secondary" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              Tools
            </button>
          </li>
          <li>
            <button onClick={() => handleScroll('progress')} className="nav-link btn-secondary" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              My Progress
            </button>
          </li>
        </ul>

        {/* Right Actions */}
        <div className="nav-right">
          {/* XP & Streak Pills */}
          <div className="badge badge-brand" style={{ gap: '6px', cursor: 'pointer' }} onClick={() => handleScroll('progress')}>
            <Flame size={16} fill="currentColor" />
            <span>{streak} Day Streak</span>
          </div>

          <div className="badge badge-brand" style={{ gap: '6px', cursor: 'pointer' }} onClick={() => handleScroll('progress')}>
            <Award size={16} />
            <span>{xp} XP</span>
          </div>

          {/* Theme Toggle */}
          <button className="btn btn-secondary btn-sm" onClick={toggleTheme} title="Toggle Theme" style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* CTA Button */}
          <button className="btn btn-primary btn-sm" onClick={onStartQuiz}>
            Take Quiz
          </button>

          {/* Hamburger Menu Toggle */}
          <button className="burger-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button onClick={() => handleScroll('learn')} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
          Learn
        </button>
        <button onClick={() => handleScroll('tools')} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
          Tools
        </button>
        <button onClick={() => handleScroll('progress')} className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
          My Progress
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setIsOpen(false);
            onStartQuiz();
          }}
        >
          Take Quiz
        </button>
      </div>
    </nav>
  );
}
