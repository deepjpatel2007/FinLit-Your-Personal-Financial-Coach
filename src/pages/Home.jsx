import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Gamification from '../components/Gamification';
import ModuleCard from '../components/ModuleCard';
import ScenarioCard from '../components/ScenarioCard';
import Tools from '../components/Tools';
import AskFinlitAI from '../components/AskFinlitAI';
import { modules } from '../data/modules';
import { storage } from '../utils/storage';
import { getLevelInfo } from '../utils/xp';
import { Target, Trash2, Plus, CheckCircle2 } from 'lucide-react';

export default function Home({ xp, streak, setXp, onAwardXp, onStartQuiz, profile }) {
  const [moduleProgress, setModuleProgress] = useState(storage.getModuleProgress());
  const [goals, setGoals] = useState(storage.getSavedGoals());
  const [newGoalText, setNewGoalText] = useState('');

  // Reload progress on mount/update
  useEffect(() => {
    setModuleProgress(storage.getModuleProgress());
    setGoals(storage.getSavedGoals());
  }, [xp]);

  // Goal handlers
  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;

    const newGoal = {
      id: Date.now().toString(),
      text: newGoalText.trim(),
      completed: false
    };

    const updated = [...goals, newGoal];
    storage.setSavedGoals(updated);
    setGoals(updated);
    setNewGoalText('');
  };

  const handleToggleGoal = (id) => {
    const updated = goals.map(g => {
      if (g.id === id) {
        // Award 15 XP for completing a goal!
        if (!g.completed) {
          onAwardXp(15);
        }
        return { ...g, completed: !g.completed };
      }
      return g;
    });
    storage.setSavedGoals(updated);
    setGoals(updated);
  };

  const handleDeleteGoal = (id, e) => {
    e.stopPropagation();
    const updated = goals.filter(g => g.id !== id);
    storage.setSavedGoals(updated);
    setGoals(updated);
  };

  // Determine recommended next lesson
  const getNextRecommendedLesson = () => {
    if (profile && profile.recommendedModules) {
      const incomplete = profile.recommendedModules.find(mId => (moduleProgress[mId] || 0) < 100);
      if (incomplete) return modules.find(m => m.id === incomplete);
    }
    // Fallback to first incomplete module
    const firstIncomplete = modules.find(m => (moduleProgress[m.id] || 0) < 100);
    return firstIncomplete || null;
  };

  const nextLesson = getNextRecommendedLesson();
  const levelInfo = getLevelInfo(xp);

  const handleBrowseModules = () => {
    document.getElementById('learn')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* 1. Hero Section */}
      <Hero 
        onStartQuiz={onStartQuiz} 
        onBrowseModules={handleBrowseModules}
        xp={xp}
        streak={streak}
      />

      {/* 2. Gamification Strip */}
      <Gamification xp={xp} streak={streak} />

      {/* 3. Learning Modules Section */}
      <section id="learn" style={{ scrollMarginTop: '80px', marginBottom: '60px' }}>
        <div className="section-title-wrap">
          <div>
            <h2>Learning Modules</h2>
            <p className="section-subtitle">Earn 100 XP per lesson by completing short readings and mini-quizzes.</p>
          </div>
        </div>
        
        <div className="grid-3">
          {modules.map((mod) => (
            <ModuleCard 
              key={mod.id} 
              module={mod} 
              progress={moduleProgress[mod.id] || 0}
            />
          ))}
        </div>
      </section>

      {/* 4. Choose Your Path Scenarios */}
      <ScenarioCard xp={xp} setXp={setXp} onAwardXp={onAwardXp} />

      {/* 5. Interactive Calculators Grid */}
      <Tools />

      {/* 6. AI Coach Chat Interface */}
      <AskFinlitAI onAwardXp={onAwardXp} />

      {/* 7. My Progress Section */}
      <section id="progress" style={{ scrollMarginTop: '80px', marginTop: '60px' }}>
        <div className="section-title-wrap">
          <div>
            <h2>My Progress Dashboard</h2>
            <p className="section-subtitle">Review your achievements, check off goals, and see what's next.</p>
          </div>
        </div>

        <div className="grid-2">
          {/* Progress Overview Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', borderBottom: 'var(--border-width) solid var(--border-color)', paddingBottom: '12px' }}>
              Achievements Overview
            </h3>

            {/* Profile detail */}
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>MONEY ARCHETYPE</span>
              {profile ? (
                <div style={{ marginTop: '4px' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 700 }}>{profile.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '4px', lineHeight: '1.4' }}>{profile.description}</p>
                </div>
              ) : (
                <div style={{ marginTop: '4px' }}>
                  <h4 style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No Profile Set</h4>
                  <button className="btn btn-outline btn-sm" style={{ marginTop: '6px' }} onClick={onStartQuiz}>
                    Take Profile Quiz
                  </button>
                </div>
              )}
            </div>

            {/* Levels and XP */}
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>XP & RANK</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600, marginTop: '2px' }}>
                <span>Level: {levelInfo.name}</span>
                <span>{xp} XP</span>
              </div>
              <div className="progress-bar-container" style={{ height: '6px', marginTop: '4px' }}>
                <div className="progress-bar-fill" style={{ width: `${levelInfo.progressPercentage}%`, backgroundColor: 'var(--primary)' }}></div>
              </div>
              {levelInfo.xpRemaining > 0 ? (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                  Need {levelInfo.xpRemaining} XP to level up to <strong>{levelInfo.nextLevelName}</strong>.
                </p>
              ) : (
                <p style={{ fontSize: '0.75rem', color: 'var(--c-green)', marginTop: '4px', fontWeight: 600 }}>
                  You've reached the highest rank! You are a certified Money Master.
                </p>
              )}
            </div>

            {/* Recommended next step */}
            {nextLesson && (
              <div style={{ borderTop: '0.5px solid var(--border-color)', paddingTop: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  RECOMMENDED NEXT STEP:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px' }}>
                  <div>
                    <h5 style={{ fontWeight: 600, fontSize: '0.9rem' }}>{nextLesson.title}</h5>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>{nextLesson.description}</p>
                  </div>
                  <a href={`#/lesson/${nextLesson.id}`} className="btn btn-primary btn-sm">
                    Start
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Goal Management Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', borderBottom: 'var(--border-width) solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} /> My Savings Goals
            </h3>

            {/* Form to add a goal */}
            <form onSubmit={handleAddGoal} style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Add a new goal (e.g. Save $150 for concert)..."
                className="input-field"
                style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                aria-label="New savings goal text"
              />
              <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0 16px' }}>
                <Plus size={16} /> Add
              </button>
            </form>

            {/* Goals list */}
            <div className="goals-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
              {goals.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  No goals saved yet. Create a goal above or take the quiz to get started!
                </div>
              ) : (
                goals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className="goal-item" 
                    onClick={() => handleToggleGoal(goal.id)}
                    style={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                  >
                    <div className="goal-info">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        className="goal-checkbox"
                        readOnly
                        aria-label={`Mark goal "${goal.text}" as completed`}
                      />
                      <span className={`goal-text ${goal.completed ? 'completed' : ''}`} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                        {goal.text}
                      </span>
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      onClick={(e) => handleDeleteGoal(goal.id, e)}
                      style={{ border: 'none', background: 'none', padding: '4px', cursor: 'pointer', color: 'var(--text-muted)' }}
                      aria-label={`Delete goal "${goal.text}"`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              💡 Checking off a savings goal awards <strong>+15 XP</strong>!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
