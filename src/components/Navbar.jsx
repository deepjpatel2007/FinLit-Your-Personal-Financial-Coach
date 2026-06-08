import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Flame, Award, Sun, Moon, Menu } from 'lucide-react';

export default function Navbar({ 
  xp, 
  streak, 
  theme, 
  toggleTheme, 
  onStartQuiz, 
  profile, 
  setActiveTab,
  onToggleSidebar
}) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setActiveTab('dashboard');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProgressClick = () => {
    setActiveTab('progress');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container nav-container">
        
        {/* Left Side: Sidebar Toggle & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="navbar-sidebar-toggle" 
            onClick={onToggleSidebar} 
            aria-label="Toggle Sidebar"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--text-main)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
          >
            <Menu size={22} />
          </button>

          <button 
            onClick={handleLogoClick} 
            className="logo"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', padding: 0 }}
          >
            <div className="logo-icon">
              <Leaf size={18} fill="#FFF" />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: 700 }}>Finlit</span>
          </button>
        </div>

        {/* Right Side: Quick Stats, Theme, Quiz */}
        <div className="nav-right">
          {/* Streak Widget */}
          <div 
            className="badge badge-brand" 
            style={{ gap: '6px', cursor: 'pointer' }} 
            onClick={handleProgressClick}
            title="Your login streak"
          >
            <Flame size={16} fill="currentColor" />
            <span className="hide-mobile">{streak} Day Streak</span>
            <span className="show-mobile-only">{streak}d</span>
          </div>

          {/* XP Widget */}
          <div 
            className="badge badge-brand" 
            style={{ gap: '6px', cursor: 'pointer' }} 
            onClick={handleProgressClick}
            title="Earned experience points"
          >
            <Award size={16} />
            <span>{xp} XP</span>
          </div>

          {/* Theme Toggle */}
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={toggleTheme} 
            title="Toggle Theme" 
            style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Start Quiz (Only shown if user has no profile/quiz is incomplete) */}
          {!profile && (
            <button 
              className="btn btn-primary btn-sm animate-pop" 
              style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              onClick={onStartQuiz}
            >
              Take Quiz 🚀
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
