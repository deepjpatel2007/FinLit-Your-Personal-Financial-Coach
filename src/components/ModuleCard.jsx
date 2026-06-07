import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

export default function ModuleCard({ module, progress = 0 }) {
  // Dynamically resolve icon from lucide-react
  const IconComponent = Icons[module.icon] || Icons.BookOpen;

  const getIconColor = (color) => {
    switch (color) {
      case 'green': return { bg: 'var(--c-green-muted)', fg: 'var(--c-green)' };
      case 'purple': return { bg: 'var(--c-purple-muted)', fg: 'var(--c-purple)' };
      case 'blue': return { bg: 'var(--c-blue-muted)', fg: 'var(--c-blue)' };
      case 'amber': return { bg: 'var(--c-amber-muted)', fg: 'var(--c-amber)' };
      case 'red': return { bg: 'var(--c-red-muted)', fg: 'var(--c-red)' };
      case 'gray': return { bg: 'var(--c-gray-muted)', fg: 'var(--c-gray)' };
      default: return { bg: 'var(--primary-muted)', fg: 'var(--primary)' };
    }
  };

  const colors = getIconColor(module.color);
  const isCompleted = progress === 100;

  return (
    <div className="card module-card card-hover">
      <div>
        <div className="module-header">
          <div className="module-icon-wrap" style={{ backgroundColor: colors.bg, color: colors.fg }}>
            <IconComponent size={22} />
          </div>
          {isCompleted && (
            <span className="badge" style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)', fontSize: '0.7rem' }}>
              Completed
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
          {module.title}
        </h3>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
          {module.description}
        </p>
      </div>

      <div className="module-meta">
        <div className="module-meta-row">
          <span>Progress</span>
          <span style={{ fontWeight: 600 }}>{progress}%</span>
        </div>
        
        <div className="progress-bar-container" style={{ height: '6px' }}>
          <div 
            className="progress-bar-fill" 
            style={{ 
              width: `${progress}%`, 
              backgroundColor: isCompleted ? 'var(--c-green)' : 'var(--primary)' 
            }}
          ></div>
        </div>

        <Link to={`/lesson/${module.id}`} className="btn btn-secondary btn-sm" style={{ marginTop: '16px', justifyContent: 'center' }}>
          {progress > 0 ? 'Continue Lesson' : 'Start Lesson'}
        </Link>
      </div>
    </div>
  );
}
