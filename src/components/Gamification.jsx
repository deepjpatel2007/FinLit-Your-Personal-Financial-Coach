import React from 'react';
import { Flame, Award, Lightbulb } from 'lucide-react';
import { getLevelInfo } from '../utils/xp';
import { tips } from '../data/tips';

export default function Gamification({ xp, streak }) {
  const levelInfo = getLevelInfo(xp);
  
  // Select a tip based on day of month (or index of tips)
  const today = new Date();
  const tipIndex = (today.getDate() + today.getMonth()) % tips.length;
  const todayTip = tips[tipIndex];

  return (
    <section className="gamification-strip" id="gamification">
      <div className="grid-3">
        {/* Card 1: Daily Streak */}
        <div className="card gamify-card">
          <div className="gamify-icon" style={{ color: 'var(--c-red)', backgroundColor: 'var(--c-red-muted)' }}>
            <Flame size={20} fill="currentColor" />
          </div>
          <div className="gamify-details">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-sub)' }}>DAILY STREAK</span>
            <div className="gamify-value">{streak} Days</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              {streak > 0 
                ? "Awesome! Come back tomorrow to keep your streak burning." 
                : "Start logging in daily to build your learning streak!"}
            </p>
          </div>
        </div>

        {/* Card 2: Your Level */}
        <div className="card gamify-card">
          <div className="gamify-icon">
            <Award size={20} />
          </div>
          <div className="gamify-details">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-sub)' }}>YOUR LEVEL</span>
            <div className="gamify-value">{levelInfo.name}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
              <span>{xp} XP</span>
              {levelInfo.xpRemaining > 0 ? (
                <span>{levelInfo.xpRemaining} XP to {levelInfo.nextLevelName}</span>
              ) : (
                <span>Max level reached!</span>
              )}
            </div>
            {levelInfo.xpRemaining > 0 && (
              <div className="progress-bar-container" style={{ height: '6px', marginTop: '4px' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${levelInfo.progressPercentage}%`, backgroundColor: 'var(--primary)' }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Today's Tip */}
        <div className="card gamify-card">
          <div className="gamify-icon" style={{ color: 'var(--c-amber)', backgroundColor: 'var(--c-amber-muted)' }}>
            <Lightbulb size={20} />
          </div>
          <div className="gamify-details">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-sub)' }}>TODAY'S TIP</span>
            <div className="gamify-value" style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.4' }}>
              Financial Power Tip
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
              "{todayTip}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
