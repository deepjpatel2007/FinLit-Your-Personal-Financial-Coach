import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Gamification from '../components/Gamification';
import ModuleCard from '../components/ModuleCard';
import ScenarioCard from '../components/ScenarioCard';
import Tools from '../components/Tools';
import AskFinlitAI from '../components/AskFinlitAI';
import Dashboard from '../components/Dashboard';
import SpendingTracker from '../components/SpendingTracker';
import GoalsTracker from '../components/GoalsTracker';

import { modules } from '../data/modules';
import { learningPaths } from '../data/learningPaths';
import { BADGES } from '../utils/badges';
import { storage } from '../utils/storage';
import { getLevelInfo } from '../utils/xp';
import { calculateHealthScore } from '../utils/healthScore';
import { Target, Trash2, Plus, CheckCircle2, Download, AlertTriangle, Sparkles, BookOpen, User, Settings, Award } from 'lucide-react';

export default function Home({
  xp,
  streak,
  setXp,
  onAwardXp,
  onStartQuiz,
  profile,
  setProfile,
  activeTab,
  setActiveTab,
  goals,
  transactions,
  unlockedBadges,
  weeklyChallenges,
  onToggleChallenge,
  onActionTriggered
}) {
  const [moduleProgress, setModuleProgress] = useState(storage.getModuleProgress());
  
  // Settings confirmation modal state
  const [confirmResetType, setConfirmResetType] = useState(null); // null, 'all', 'quiz', 'transactions', 'goals', 'subscriptions'

  useEffect(() => {
    setModuleProgress(storage.getModuleProgress());
  }, [xp]);

  // Determine recommended path module progress
  const getPathProgress = (pathKey) => {
    const path = learningPaths[pathKey];
    if (!path) return 0;
    const recommended = path.recommendedModules;
    const completedCount = recommended.filter(mId => (moduleProgress[mId] || 0) === 100).length;
    return Math.round((completedCount / recommended.length) * 100);
  };

  const nextLesson = () => {
    if (profile && profile.recommendedPath) {
      const path = learningPaths[profile.recommendedPath];
      if (path) {
        const incomplete = path.recommendedModules.find(mId => (moduleProgress[mId] || 0) < 100);
        if (incomplete) return modules.find(m => m.id === incomplete);
      }
    }
    const firstIncomplete = modules.find(m => (moduleProgress[m.id] || 0) < 100);
    return firstIncomplete || null;
  };

  const levelInfo = getLevelInfo(xp);

  // Dynamic Reminders
  const getDynamicReminders = () => {
    const reminders = [];
    const todayStr = new Date().toISOString().split('T')[0];
    const trackedToday = transactions.some(t => t.date === todayStr);

    if (!trackedToday) {
      reminders.push({
        text: "You haven't tracked your spending today. Log a purchase in the Tracker to build your habit!",
        actionKey: "spending"
      });
    }

    const priorityGoal = goals.find(g => g.priority === 'High' && g.currentAmount < g.targetAmount);
    if (priorityGoal && priorityGoal.targetDate) {
      const today = new Date();
      const target = new Date(priorityGoal.targetDate);
      const diffTime = target - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        const amountLeft = priorityGoal.targetAmount - priorityGoal.currentAmount;
        const diffWeeks = diffDays / 7;
        if (diffWeeks > 0 && amountLeft > 0) {
          const weeklyNeeded = Math.round(amountLeft / diffWeeks);
          if (weeklyNeeded > 0) {
            reminders.push({
              text: `Your goal "${priorityGoal.name}" needs about $${weeklyNeeded} this week to stay on track.`,
              actionKey: "goals"
            });
          }
        }
      }
    }

    const completedCount = storage.getCompletedLessons().length;
    if (completedCount === 0) {
      reminders.push({
        text: "Complete your first lesson module to kick off your financial literacy learning!",
        actionKey: "learn"
      });
    }

    const subs = storage.getSubscriptions();
    if (subs.length === 0) {
      reminders.push({
        text: "Audit your active subscriptions to find underutilized plans and leakages.",
        actionKey: "tools"
      });
    }

    return reminders;
  };

  // Resets & Exporter
  const handleExportData = () => {
    const data = {
      profile,
      quizAnswers: storage.getQuizAnswers(),
      xp,
      streak,
      goals,
      transactions,
      subscriptions: storage.getSubscriptions(),
      completedLessons: storage.getCompletedLessons(),
      scenarioCompletions: storage.getScenarioCompletions(),
      unlockedBadges
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "finlit_my_financial_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = (type) => {
    if (type === 'all') {
      storage.resetAll();
      window.location.reload();
    } else if (type === 'quiz') {
      storage.resetQuiz();
      setProfile(null);
      setActiveTab('learn');
      setConfirmResetType(null);
    } else if (type === 'transactions') {
      storage.resetTransactions();
      onActionTriggered('add_transaction');
      setConfirmResetType(null);
    } else if (type === 'goals') {
      storage.resetGoals();
      onActionTriggered('add_goal');
      setConfirmResetType(null);
    } else if (type === 'subscriptions') {
      storage.resetSubscriptions();
      onActionTriggered('audit_subs');
      setConfirmResetType(null);
    }
  };

  const handleStartQuizFromHero = () => {
    onStartQuiz();
  };

  const renderActiveSection = () => {
    // 1. If profile is NOT complete and user lands, show public Landing page (Hero)
    if (!profile) {
      return (
        <div className="animate-fade-in">
          {/* Hero */}
          <Hero 
            onStartQuiz={handleStartQuizFromHero} 
            onBrowseModules={() => setActiveTab('learn')}
            xp={xp}
            streak={streak}
          />
          
          {/* Gamification Strip */}
          <Gamification xp={xp} streak={streak} />

          {/* Quick learning browse */}
          <section style={{ marginBottom: '60px' }}>
            <div className="section-title-wrap">
              <div>
                <h2>Learning Modules</h2>
                <p className="section-subtitle">Earn 100 XP per lesson by completing short readings and mini-quizzes.</p>
              </div>
            </div>
            <div className="grid-3">
              {modules.slice(0, 6).map((mod) => (
                <ModuleCard 
                  key={mod.id} 
                  module={mod} 
                  progress={moduleProgress[mod.id] || 0}
                />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button className="btn btn-outline" onClick={() => onStartQuiz()}>
                Take Onboarding Quiz to unlock all 12 modules & daily dashboard
              </button>
            </div>
          </section>

          {/* Choose Your Path Scenarios */}
          <ScenarioCard xp={xp} setXp={setXp} onAwardXp={onAwardXp} onActionTriggered={() => onActionTriggered('complete_scenario')} />
        </div>
      );
    }

    // 2. Active Tab Router once logged in
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            profile={profile}
            xp={xp}
            streak={streak}
            goals={goals}
            transactions={transactions}
            completedLessons={storage.getCompletedLessons()}
            challenges={weeklyChallenges}
            onToggleChallenge={onToggleChallenge}
            onNavigate={setActiveTab}
            notifications={getDynamicReminders()}
          />
        );

      case 'learn':
        const recommendedPath = profile.recommendedPath ? learningPaths[profile.recommendedPath] : null;
        const pathProgress = recommendedPath ? getPathProgress(profile.recommendedPath) : 0;
        const nextModule = nextLesson();

        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Learning Path Progress Banner */}
            {recommendedPath && (
              <div className="card" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', borderLeft: '4px solid var(--primary)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px' }}>YOUR RECOMMENDED PATH</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '2px' }}>{recommendedPath.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '4px', lineHeight: '1.4' }}>
                    {recommendedPath.whyChosen}
                  </p>
                  
                  {nextModule && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                      <a href={`#/lesson/${nextModule.id}`} className="btn btn-primary btn-sm" onClick={() => onActionTriggered('complete_lesson')}>
                        Next Lesson: {nextModule.title}
                      </a>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justify: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-sub)' }}>Path Completion</span>
                    <span style={{ fontWeight: 700 }}>{pathProgress}%</span>
                  </div>
                  <div className="progress-bar-container" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${pathProgress}%`, backgroundColor: 'var(--primary)' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Modules Grid (All 12 modules) */}
            <section id="learn-grid">
              <div className="section-title-wrap">
                <div>
                  <h2>All Learning Modules</h2>
                  <p className="section-subtitle">Earn 100 XP per lesson by completing short readings and quizzes.</p>
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
          </div>
        );

      case 'tools':
        return <Tools onActionTriggered={() => onActionTriggered('audit_subs')} />;

      case 'spending':
        return <SpendingTracker onActionTriggered={() => onActionTriggered('add_transaction')} />;

      case 'goals':
        return <GoalsTracker onActionTriggered={() => onActionTriggered('add_goal')} />;

      case 'scenarios':
        return <ScenarioCard xp={xp} setXp={setXp} onAwardXp={onAwardXp} onActionTriggered={() => onActionTriggered('complete_scenario')} />;

      case 'progress':
        const healthScore = calculateHealthScore({
          quizAnswers: storage.getQuizAnswers(),
          goals,
          transactions,
          completedLessons: storage.getCompletedLessons(),
          streak
        });

        const completedCount = storage.getCompletedLessons().length;

        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Title */}
            <div className="section-title-wrap">
              <div>
                <h2>My Progress & Achievements</h2>
                <p className="section-subtitle">Track your rank levels, check off unlocked badges, and review active progress numbers.</p>
              </div>
            </div>

            {/* Overview grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '16px' }} className="grid-4">
              
              {/* Level progress */}
              <div className="card">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontWeight: 600 }}>XP LEVEL & RANK</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '4px', color: 'var(--primary)' }}>Lv. {levelInfo.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '12px', marginBottom: '4px' }}>
                  <span>{xp} XP</span>
                  <span style={{ color: 'var(--text-muted)' }}>{levelInfo.xpRemaining > 0 ? `${levelInfo.xpRemaining} XP to next rank` : 'Max Rank'}</span>
                </div>
                <div className="progress-bar-container" style={{ height: '6px' }}>
                  <div className="progress-bar-fill" style={{ width: `${levelInfo.progressPercentage}%`, backgroundColor: 'var(--primary)' }}></div>
                </div>
              </div>

              {/* Health Score */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', justify: 'center', align: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontWeight: 600 }}>HEALTH SCORE</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>{healthScore}</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>out of 100</span>
              </div>

              {/* Completed Lessons */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', justify: 'center', align: 'center', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontWeight: 600 }}>LESSONS DONE</span>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0' }}>{completedCount}</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>out of 12 modules</span>
              </div>

              {/* Logged stats */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontWeight: 600 }}>ACTIVITY STATS</span>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Goals Completed:</span>
                  <span style={{ fontWeight: 700 }}>{goals.filter(g => g.completed).length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Transactions Logged:</span>
                  <span style={{ fontWeight: 700 }}>{transactions.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Scenarios Completed:</span>
                  <span style={{ fontWeight: 700 }}>{storage.getScenarioCompletions().length}</span>
                </div>
              </div>
            </div>

            {/* Badges Grid (16 achievement badges) */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>Unlocked Achievements & Badges</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Complete actions in the app to unlock premium achievement badges. Unlocking a badge awards **+20 XP**!
              </p>

              <div className="badge-grid">
                {BADGES.map(badge => {
                  const unlocked = unlockedBadges.some(b => b.id === badge.id);
                  const userBadge = unlockedBadges.find(b => b.id === badge.id);

                  return (
                    <div key={badge.id} className={`badge-item ${unlocked ? '' : 'locked'}`} title={badge.condition}>
                      <span className="badge-item-icon">{badge.icon}</span>
                      <span className="badge-item-name">{badge.name}</span>
                      <span className="badge-item-desc">{badge.desc}</span>
                      {unlocked && userBadge && (
                        <span style={{ fontSize: '0.6rem', color: 'var(--primary)', marginTop: '2px', fontWeight: 600 }}>
                          Unlocked {userBadge.dateUnlocked}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.25rem', borderBottom: 'var(--border-width) solid var(--border-color)', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={18} /> Settings & Data Management
            </h3>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>Export Data</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '2px', marginBottom: '10px' }}>
                Download all your progress, goals, transactions, and badges as a JSON file.
              </p>
              <button className="btn btn-primary" onClick={handleExportData} style={{ fontSize: '0.85rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Download size={14} /> Export Data
              </button>
            </div>

            <div style={{ borderTop: '0.5px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--c-red)' }}>Reset Actions</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                These actions will delete data stored locally in your browser. Choose carefully!
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="grid-2-col">
                <button className="btn btn-secondary" onClick={() => setConfirmResetType('quiz')} style={{ color: 'var(--c-amber)', border: '1px solid var(--c-amber-muted)', fontSize: '0.8rem', padding: '8px 10px' }}>
                  Reset Quiz & Archetype
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmResetType('transactions')} style={{ color: 'var(--c-amber)', border: '1px solid var(--c-amber-muted)', fontSize: '0.8rem', padding: '8px 10px' }}>
                  Reset Spending Transactions
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmResetType('goals')} style={{ color: 'var(--c-amber)', border: '1px solid var(--c-amber-muted)', fontSize: '0.8rem', padding: '8px 10px' }}>
                  Reset Savings Goals
                </button>
                <button className="btn btn-secondary" onClick={() => setConfirmResetType('subscriptions')} style={{ color: 'var(--c-amber)', border: '1px solid var(--c-amber-muted)', fontSize: '0.8rem', padding: '8px 10px' }}>
                  Reset Audited Subscriptions
                </button>
              </div>

              <div style={{ borderTop: '0.5px solid var(--border-color)', marginTop: '8px', paddingTop: '12px' }}>
                <button className="btn btn-secondary" onClick={() => setConfirmResetType('all')} style={{ width: '100%', color: 'var(--c-red)', border: '1px solid var(--c-red-muted)', backgroundColor: 'var(--c-red-muted)', fontSize: '0.85rem' }}>
                  ⚠️ Factory Reset All Data
                </button>
              </div>
            </div>

            {/* Reset confirmation modal overlay */}
            {confirmResetType && (
              <div className="modal-overlay" style={{ zIndex: 10002 }}>
                <div className="modal-content animate-pop" style={{ maxWidth: '400px', textAlign: 'center' }}>
                  <AlertTriangle size={36} color="var(--c-red)" style={{ margin: '0 auto 12px' }} />
                  <h4 style={{ fontWeight: 700, fontSize: '1.1rem' }}>Are you absolutely sure?</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '6px', marginBottom: '20px' }}>
                    {confirmResetType === 'all' 
                      ? "This will delete all lessons completed, streak count, XP points, profile quiz answers, transactions, and badges. This cannot be undone."
                      : `This will permanently delete your ${confirmResetType} data. This cannot be undone.`}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button className="btn btn-secondary" onClick={() => setConfirmResetType(null)} style={{ border: 'none' }}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={() => handleResetData(confirmResetType)} style={{ backgroundColor: 'var(--c-red)', color: 'white' }}>
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
      
      {/* Dynamic Main Body Content */}
      <div className="main-content-section" style={{ minHeight: '60vh' }}>
        {renderActiveSection()}
      </div>

      {/* AI Coach Floating/Bottom Row: Show only if profile is complete and tab is not active coach tab or settings, or render globally at bottom of pages */}
      {profile && activeTab !== 'settings' && (
        <div style={{ marginTop: '40px', borderTop: '0.5px solid var(--border-color)', paddingTop: '40px' }}>
          <AskFinlitAI onAwardXp={onAwardXp} onActionTriggered={() => onActionTriggered('ask_ai')} />
        </div>
      )}
    </div>
  );
}
