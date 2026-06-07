import React from 'react';
import { Sparkles, Calendar, BookOpen, ChevronRight, Award, DollarSign } from 'lucide-react';

export default function Hero({ onStartQuiz, onBrowseModules, xp, streak }) {
  return (
    <section className="hero-sec" id="hero">
      <div className="container hero-layout">
        {/* Left Side: Copy & Actions */}
        <div className="hero-content">
          <div className="badge badge-brand animate-pop" style={{ gap: '6px' }}>
            <Sparkles size={14} />
            <span>For teens & first-jobbers</span>
          </div>

          <h1 className="hero-title">
            Learn it.<br />
            Budget it.<br />
            <span>Own it.</span>
          </h1>

          <p className="hero-subtitle">
            Finlit teaches you everything about money — budgeting, credit cards, investing, and taxes — in a way that actually makes sense. No textbook jargon, just real talk.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onStartQuiz}>
              Take the quiz <ChevronRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={onBrowseModules}>
              Browse modules
            </button>
          </div>
        </div>

        {/* Right Side: Dashboard Preview Card */}
        <div className="dashboard-preview animate-pop">
          <div className="dashboard-preview-header">
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>My Money Dashboard</h3>
            <span className="badge badge-brand" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>Preview</span>
          </div>

          {/* XP & Streak */}
          <div className="dashboard-item">
            <div className="dashboard-label">
              <Award size={16} />
              <span>Weekly XP Goal</span>
            </div>
            <span className="dashboard-value" style={{ color: 'var(--primary)' }}>{xp} / 500 XP</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${Math.min((xp / 500) * 100, 100)}%`, backgroundColor: 'var(--primary)' }}
            ></div>
          </div>

          {/* Weekly Spending */}
          <div style={{ marginTop: '4px' }}>
            <div className="dashboard-label" style={{ marginBottom: '8px' }}>
              <DollarSign size={16} />
              <span>Weekly Spending Breakdown</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                  <span>🍔 Food & Drinks</span>
                  <span style={{ fontWeight: 600 }}>$45.00</span>
                </div>
                <div className="progress-bar-container" style={{ height: '4px', marginTop: '2px' }}>
                  <div className="progress-bar-fill" style={{ width: '45%', backgroundColor: 'var(--c-amber)' }}></div>
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                  <span>🚌 Transit & Transport</span>
                  <span style={{ fontWeight: 600 }}>$30.00</span>
                </div>
                <div className="progress-bar-container" style={{ height: '4px', marginTop: '2px' }}>
                  <div className="progress-bar-fill" style={{ width: '30%', backgroundColor: 'var(--c-blue)' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal Progress */}
          <div style={{ marginTop: '4px' }}>
            <div className="dashboard-item">
              <div className="dashboard-label">
                <BookOpen size={16} />
                <span>Savings Goal (New Laptop)</span>
              </div>
              <span className="dashboard-value">$600 / $800</span>
            </div>
            <div className="progress-bar-container" style={{ height: '6px', marginTop: '6px' }}>
              <div className="progress-bar-fill" style={{ width: '75%', backgroundColor: 'var(--c-green)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
