import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Leaf, Flame, Award, Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ 
  xp, 
  streak, 
  theme, 
  toggleTheme, 
  onStartQuiz, 
  profile, 
  activeTab, 
  setActiveTab 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  const handleNavClick = (tabId) => {
    setIsOpen(false);
    setActiveTab(tabId);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutClick = () => {
    setIsOpen(false);
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container nav-container">
        {/* Logo */}
        <button 
          onClick={() => handleNavClick('dashboard')} 
          className="logo"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <div className="logo-icon">
            <Leaf size={18} fill="#FFF" />
          </div>
          <span style={{ fontSize: '1.35rem', fontWeight: 700 }}>Finlit</span>
        </button>

        {/* Desktop Links - Dynamic based on quiz completion */}
        <ul className="nav-links">
          {profile ? (
            <>
              <li>
                <button 
                  onClick={() => handleNavClick('dashboard')} 
                  className={`nav-link ${activeTab === 'dashboard' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('learn')} 
                  className={`nav-link ${activeTab === 'learn' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Learn
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('tools')} 
                  className={`nav-link ${activeTab === 'tools' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('spending')} 
                  className={`nav-link ${activeTab === 'spending' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Spending
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('goals')} 
                  className={`nav-link ${activeTab === 'goals' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Goals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('progress')} 
                  className={`nav-link ${activeTab === 'progress' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Progress
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAboutClick} 
                  className={`nav-link ${isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  About
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button 
                  onClick={() => handleNavClick('learn')} 
                  className={`nav-link ${activeTab === 'learn' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Learn
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('tools')} 
                  className={`nav-link ${activeTab === 'tools' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  Tools
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('progress')} 
                  className={`nav-link ${activeTab === 'progress' && !isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  My Progress
                </button>
              </li>
              <li>
                <button 
                  onClick={handleAboutClick} 
                  className={`nav-link ${isAboutPage ? 'active' : ''}`}
                  style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: 500 }}
                >
                  About
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Right Actions */}
        <div className="nav-right">
          {/* XP & Streak Pills */}
          <div className="badge badge-brand" style={{ gap: '6px', cursor: 'pointer' }} onClick={() => handleNavClick('progress')}>
            <Flame size={16} fill="currentColor" />
            <span className="hide-mobile">{streak} Day Streak</span>
            <span className="show-mobile-only">{streak}d</span>
          </div>

          <div className="badge badge-brand" style={{ gap: '6px', cursor: 'pointer' }} onClick={() => handleNavClick('progress')}>
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

          {/* Quiz CTA */}
          <button 
            className="btn btn-primary btn-sm" 
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
            onClick={onStartQuiz}
          >
            {profile ? 'Retake Quiz' : 'Take Quiz'}
          </button>

          {profile && (
            <button 
              className="btn btn-secondary btn-sm hide-mobile" 
              style={{ borderRadius: '50%', width: '36px', height: '36px', padding: 0 }}
              onClick={() => handleNavClick('settings')}
              title="Settings"
            >
              ⚙️
            </button>
          )}

          {/* Hamburger Menu Toggle (Mobile Drawer) */}
          <button className="burger-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} style={{ top: '70px', padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
        {profile ? (
          <>
            <button onClick={() => handleNavClick('dashboard')} className={`btn ${activeTab === 'dashboard' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              🏠 Dashboard
            </button>
            <button onClick={() => handleNavClick('learn')} className={`btn ${activeTab === 'learn' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              📚 Learn Lessons
            </button>
            <button onClick={() => handleNavClick('tools')} className={`btn ${activeTab === 'tools' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              🛠️ Calculators
            </button>
            <button onClick={() => handleNavClick('spending')} className={`btn ${activeTab === 'spending' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              💸 Spending Tracker
            </button>
            <button onClick={() => handleNavClick('goals')} className={`btn ${activeTab === 'goals' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              🎯 Savings Goals
            </button>
            <button onClick={() => handleNavClick('progress')} className={`btn ${activeTab === 'progress' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              🏆 Achievements
            </button>
            <button onClick={handleAboutClick} className={`btn ${isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              ℹ️ About Finlit
            </button>
            <button onClick={() => handleNavClick('settings')} className={`btn ${activeTab === 'settings' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              ⚙️ Settings & Reset
            </button>
          </>
        ) : (
          <>
            <button onClick={() => handleNavClick('learn')} className={`btn ${activeTab === 'learn' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              📚 Learn
            </button>
            <button onClick={() => handleNavClick('tools')} className={`btn ${activeTab === 'tools' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              🛠️ Tools
            </button>
            <button onClick={() => handleNavClick('progress')} className={`btn ${activeTab === 'progress' && !isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              🏆 My Progress
            </button>
            <button onClick={handleAboutClick} className={`btn ${isAboutPage ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'flex-start', width: '100%' }}>
              ℹ️ About Finlit
            </button>
          </>
        )}
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '8px' }}
          onClick={() => {
            setIsOpen(false);
            onStartQuiz();
          }}
        >
          🚀 Start Money Quiz
        </button>
      </div>
    </nav>
  );
}
