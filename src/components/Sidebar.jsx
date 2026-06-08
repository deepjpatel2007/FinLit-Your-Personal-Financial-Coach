import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calculator, 
  CreditCard, 
  Target, 
  Award, 
  Sparkles, 
  Info, 
  Settings, 
  X,
  Leaf
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({
  profile,
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Your money command center' },
    { id: 'learn', label: 'Learn Lessons', icon: BookOpen, desc: 'Interactive financial lessons' },
    { id: 'tools', label: 'Calculators', icon: Calculator, desc: 'Financial simulators & audit tools' },
    { id: 'spending', label: 'Spending Ledger', icon: CreditCard, desc: 'Monitor expenses and income' },
    { id: 'goals', label: 'Savings Goals', icon: Target, desc: 'Track your targets & milestones' },
    { id: 'progress', label: 'Achievements', icon: Award, desc: 'Unlocked badges & ranks progress' },
    { id: 'ai', label: 'Ask AI Coach', icon: Sparkles, desc: 'Personalized chatbot answers' },
    { id: 'about', label: 'About Finlit', icon: Info, desc: 'Mission, features, and vision' },
    { id: 'settings', label: 'Settings', icon: Settings, desc: 'Factory reset & data export' }
  ];

  // If no profile, restrict navigation tabs
  const filteredItems = profile ? menuItems : [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, desc: 'Back to landing page' },
    { id: 'learn', label: 'Learn Lessons', icon: BookOpen, desc: 'Browse lesson modules' },
    { id: 'tools', label: 'Calculators', icon: Calculator, desc: 'Try out interactive tools' },
    { id: 'progress', label: 'Achievements', icon: Award, desc: 'Check XP ranks & lock badges' },
    { id: 'about', label: 'About Finlit', icon: Info, desc: 'Mission, features, and vision' }
  ];

  // Handle closing drawer with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleItemClick = (item) => {
    setIsOpen(false); // Close sidebar drawer when item is clicked
    
    if (item.id === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab(item.id);
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Determine if a menu item is active
  const isItemActive = (itemId) => {
    if (itemId === 'about') return isAboutPage;
    return !isAboutPage && activeTab === itemId;
  };

  return (
    <>
      {/* Mobile & Desktop Backdrop Overlay - visible when drawer is open */}
      {isOpen && (
        <div 
          className="sidebar-mobile-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer Container */}
      <aside className={`sidebar-navigation ${isOpen ? 'mobile-open' : ''}`}>
        
        {/* Sidebar Header with Logo & Close button */}
        <div className="sidebar-logo-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-icon">
              <Leaf size={16} fill="#FFF" />
            </div>
            <span className="logo-text">Finlit</span>
          </div>

          <button 
            className="sidebar-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '6px',
              transition: 'all 0.2s'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="sidebar-menu">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`sidebar-menu-item ${active ? 'active' : ''}`}
              >
                <div className="sidebar-menu-item-icon">
                  <Icon size={20} />
                </div>
                
                <div className="sidebar-menu-item-content">
                  <span className="sidebar-menu-item-label">{item.label}</span>
                  <span className="sidebar-menu-item-desc">{item.desc}</span>
                </div>
              </button>
            );
          })}
        </nav>

      </aside>
    </>
  );
}
