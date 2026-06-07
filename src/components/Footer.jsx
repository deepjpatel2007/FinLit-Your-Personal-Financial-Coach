import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-layout">
          {/* Brand Column */}
          <div className="footer-left">
            <div className="logo" style={{ fontSize: '1.15rem' }}>
              <div className="logo-icon" style={{ width: '28px', height: '28px' }}>
                <Leaf size={14} fill="#FFF" />
              </div>
              <span>Finlit</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '4px' }}>
              Learn it. Budget it. Own it.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <ul className="footer-links" style={{ listStyle: 'none' }}>
              <li>
                <a href="#/" className="nav-link" style={{ fontSize: '0.85rem' }}>About</a>
              </li>
              <li>
                <a href="#/" className="nav-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="nav-link" 
                  style={{ fontSize: '0.85rem' }}
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Localized Flag Column */}
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              Made for teens 🇨🇦
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              &copy; {currentYear} Finlit. All rights reserved.
            </div>
          </div>
        </div>

        {/* Disclaimer row */}
        <div className="footer-disclaimer">
          <strong>Educational Disclaimer:</strong> Finlit is a financial education platform only. None of the content, tools, calculator outcomes, or AI responses constitute professional financial, tax, or investment advice. Always talk to a trusted parent, guardian, or registered professional before making major financial decisions.
        </div>
      </div>
    </footer>
  );
}
