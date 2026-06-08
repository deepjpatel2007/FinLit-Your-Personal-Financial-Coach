import React from 'react';
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
  ChevronLeft, 
  ChevronRight,
  Leaf
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({
  profile,
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
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

  const handleItemClick = (item) => {
    setIsOpen(false); // Close mobile menu drawer if open
    
    if (item.id === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab(item.id);
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem('sidebar-collapsed', String(nextState));
  };

  // Determine if a menu item is active
  const isItemActive = (itemId) => {
    if (itemId === 'about') return isAboutPage;
    return !isAboutPage && activeTab === itemId;
  };

  return (
    <>
      {/* Mobile Backdrop Overlay - visible when mobile drawer is open */}
      {isOpen && (
        <div 
          className="sidebar-mobile-overlay" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel Container */}
      <aside className={`sidebar-navigation ${isCollapsed ? 'collapsed' : 'expanded'} ${isOpen ? 'mobile-open' : ''}`}>
        
        {/* Sidebar Header with Logo - Desktop only */}
        <div className="sidebar-logo-container">
          <div className="logo-icon">
            <Leaf size={16} fill="#FFF" />
          </div>
          {!isCollapsed && <span className="logo-text">Finlit</span>}
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
                title={isCollapsed ? `${item.label} — ${item.desc}` : undefined}
              >
                <div className="sidebar-menu-item-icon">
                  <Icon size={20} />
                </div>
                
                {!isCollapsed && (
                  <div className="sidebar-menu-item-content">
                    <span className="sidebar-menu-item-label">{item.label}</span>
                    <span className="sidebar-menu-item-desc">{item.desc}</span>
                  </div>
                )}

                {/* Sub-description hover label for collapsed state (custom tooltip) */}
                {isCollapsed && (
                  <div className="sidebar-collapsed-tooltip">
                    <div style={{ fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.8, whiteSpace: 'nowrap' }}>{item.desc}</div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Collapse Toggle Button at Bottom - Desktop only */}
        <div className="sidebar-footer">
          <button 
            className="sidebar-collapse-toggle" 
            onClick={handleToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!isCollapsed && <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>Collapse Menu</span>}
          </button>
        </div>

      </aside>
    </>
  );
}
