import React from 'react';
import { calculateHealthScore } from '../utils/healthScore';
import { getLevelInfo } from '../utils/xp';
import { Target, Award, ShieldAlert, Sparkles, CheckSquare, Zap, BookOpen, CreditCard, DollarSign } from 'lucide-react';

export default function Dashboard({
  profile,
  xp,
  streak,
  goals = [],
  transactions = [],
  completedLessons = [],
  challenges = {},
  onToggleChallenge,
  onNavigate,
  notifications = []
}) {
  const healthScore = calculateHealthScore({
    quizAnswers: profile ? profile.answers : null,
    goals,
    transactions,
    completedLessons,
    streak
  });

  const levelInfo = getLevelInfo(xp);

  // Find priority goal (highest priority, or first uncompleted goal)
  const priorityGoal = goals.find(g => g.priority === 'high' && g.currentAmount < g.targetAmount) || 
                       goals.find(g => g.currentAmount < g.targetAmount) || 
                       goals[0];

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netCashFlow = totalIncome - totalExpenses;

  // Next recommended lesson module
  const nextLessonId = profile?.recommendedPath 
    ? (profile.recommendedPath === 'future_investor' ? 'investing' : 'budgeting')
    : 'budgeting';

  // Format today's date nicely
  const todayDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  // Calculate remaining days for priority goal
  let daysRemainingText = "No date set";
  if (priorityGoal && priorityGoal.targetDate) {
    const today = new Date();
    const target = new Date(priorityGoal.targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysRemainingText = diffDays > 0 ? `${diffDays} days remaining` : "Target date reached";
  }

  return (
    <div className="dashboard-container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner: Greeting, Streak & XP */}
      <div className="card dashboard-hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderLeft: '4px solid var(--primary)' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>{todayDateStr}</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '4px' }}>
            Welcome back, {profile?.name ? `Master ${profile.name}` : 'Finlit Scholar'}!
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginTop: '4px' }}>
            Your Money Profile: <strong>{profile?.name || 'Money Newbie'}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {/* XP Display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--bg-input)', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
            <Award size={18} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>XP LEVEL</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Lv. {levelInfo.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{xp} XP total</div>
            </div>
          </div>

          {/* Streak Display */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--bg-input)', padding: '8px 12px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
            <Zap size={18} color="var(--c-amber)" />
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>DAILY STREAK</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{streak} Day{streak !== 1 ? 's' : ''}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Keep it burning!</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Health Score, Priority Goal, Spending snapshot */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr 1.5fr', gap: '16px' }} className="grid-3">
        
        {/* Card 1: Financial Health Score */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600, textTransform: 'uppercase' }}>Financial Health Score</span>
          
          <div style={{ position: 'relative', width: '110px', height: '110px', margin: '16px 0' }}>
            {/* SVG Ring Meter */}
            <svg width="100%" height="100%" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="2.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2.5"
                strokeDasharray={`${healthScore}, 100`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.8s ease-out' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>{healthScore}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ 100</div>
            </div>
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: healthScore >= 80 ? 'var(--c-green)' : healthScore >= 60 ? 'var(--c-blue)' : healthScore >= 40 ? 'var(--c-amber)' : 'var(--c-red)' }}>
            {healthScore >= 80 ? 'Excellent Health' : healthScore >= 60 ? 'Good Progress' : healthScore >= 40 ? 'Needs Attention' : 'Vulnerable'}
          </span>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Built from goals, budget logging, credit learning & quiz habits.
          </p>
        </div>

        {/* Card 2: Main Savings Goal Progress */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>PRIORITY SAVINGS GOAL</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{daysRemainingText}</span>
            </div>
            
            {priorityGoal ? (
              <div style={{ marginTop: '12px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{priorityGoal.name || priorityGoal.text}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Category: {priorityGoal.category || 'Savings'}</span>
                
                <div style={{ marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>${priorityGoal.currentAmount} saved</span>
                    <span style={{ color: 'var(--text-muted)' }}>of ${priorityGoal.targetAmount}</span>
                  </div>
                  <div className="progress-bar-container" style={{ height: '8px' }}>
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${Math.min(100, Math.round((priorityGoal.currentAmount / priorityGoal.targetAmount) * 100))}%`, 
                        backgroundColor: 'var(--primary)' 
                      }}
                    ></div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>
                    {Math.round((priorityGoal.currentAmount / priorityGoal.targetAmount) * 100)}% Complete
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                <Target size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.6 }} />
                <span style={{ fontSize: '0.8rem' }}>No active savings goals found.</span>
                <button 
                  className="btn btn-secondary" 
                  style={{ marginTop: '8px', fontSize: '0.75rem', padding: '4px 10px' }}
                  onClick={() => onNavigate('goals')}
                >
                  Create Your First Goal
                </button>
              </div>
            )}
          </div>

          {priorityGoal && (
            <div style={{ borderTop: '0.5px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Add to your savings goal:</span>
              <button 
                className="btn btn-primary" 
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                onClick={() => onNavigate('goals')}
              >
                Manage Goal
              </button>
            </div>
          )}
        </div>

        {/* Card 3: Spending & Cash Flow Snapshot */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: 600 }}>MONTHLY BUDGET OVERVIEW</span>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Income:</span>
                <span style={{ fontWeight: 600, color: 'var(--c-green)' }}>+${totalIncome.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Expenses:</span>
                <span style={{ fontWeight: 600, color: 'var(--c-red)' }}>-${totalExpenses.toFixed(2)}</span>
              </div>
              <div style={{ borderTop: '0.5px solid var(--border-color)', padding: '6px 0 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Net Flow:</span>
                <span style={{ fontWeight: 700, color: netCashFlow >= 0 ? 'var(--c-green)' : 'var(--c-red)' }}>
                  {netCashFlow >= 0 ? '+' : ''}${netCashFlow.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '0.5px solid var(--border-color)', paddingTop: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Recent Transactions: {transactions.length}</span>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              onClick={() => onNavigate('spending')}
            >
              Log Transaction
            </button>
          </div>
        </div>
      </div>

      {/* Row: In-App Notifications & Reminders & AI Suggested Next Step */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: '16px' }} className="grid-2-col">
        
        {/* Notifications & Reminders Panel */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={18} color="var(--primary)" />
            <span>Reminders & Notifications</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {notifications.length === 0 ? (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', italic: true }}>
                Looking good! No active notifications or items requiring attention today.
              </p>
            ) : (
              notifications.map((n, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '8px 12px', 
                    backgroundColor: 'var(--bg-input)', 
                    border: '0.5px solid var(--border-color)', 
                    borderRadius: '6px' 
                  }}
                >
                  <div style={{ fontSize: '1.1rem' }}>🔔</div>
                  <div style={{ flexGrow: 1, fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                    {n.text}
                  </div>
                  {n.actionKey && (
                    <button 
                      className="btn" 
                      style={{ 
                        fontSize: '0.7rem', 
                        padding: '3px 8px', 
                        backgroundColor: 'var(--primary-muted)', 
                        color: 'var(--primary)', 
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px'
                      }}
                      onClick={() => onNavigate(n.actionKey)}
                    >
                      Go
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Suggested Next Step & Learning Module */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} color="var(--primary)" />
              <span>Coach Suggested Next Step</span>
            </h3>
            
            <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px 12px', borderRadius: '6px', border: '0.5px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
              {profile ? (
                <span>
                  As a <strong>{profile.name}</strong>, your recommended starting point is the <strong>{profile.recommendedPath === 'first_job' ? 'First Job Path' : 'Budget Boss Path'}</strong>.
                  Let's focus on: <em>"{profile.suggestedDailyHabit}"</em>.
                </span>
              ) : (
                <span>
                  Welcome to Finlit! Complete the <strong>Money Profile Quiz</strong> to get a personalized daily action step suggested by your AI Coach.
                </span>
              )}
            </div>
          </div>

          <div style={{ borderTop: '0.5px solid var(--border-color)', paddingTop: '10px', display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button 
              className="btn btn-primary" 
              style={{ flexGrow: 1, padding: '6px 0', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              onClick={() => onNavigate('learn')}
            >
              <BookOpen size={14} /> Recommended Lesson
            </button>
            <button 
              className="btn btn-secondary" 
              style={{ flexGrow: 1, padding: '6px 0', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
              onClick={() => onNavigate('coach')}
            >
              💬 Ask AI Coach
            </button>
          </div>
        </div>
      </div>

      {/* Row: Weekly Challenge Checklist */}
      <div className="card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckSquare size={18} color="var(--primary)" />
          <span>Weekly Financial Challenges</span>
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
          Complete these habits this week to earn XP and build premium money skills. (Resets weekly)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="grid-2-col">
          {Object.keys(challenges).map(key => {
            const c = challenges[key];
            return (
              <div 
                key={key} 
                className={`toggle-card ${c.completed ? 'active' : ''}`}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  padding: '10px', 
                  backgroundColor: 'var(--bg-input)', 
                  border: '0.5px solid var(--border-color)', 
                  borderRadius: '8px', 
                  cursor: 'pointer' 
                }}
                onClick={() => onToggleChallenge(key)}
              >
                <div 
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '3px',
                    backgroundColor: c.completed ? 'var(--primary)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.65rem'
                  }}
                >
                  {c.completed ? '✓' : ''}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', textDecoration: c.completed ? 'line-through' : 'none', color: c.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                    {c.text}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>
                    +{c.xpReward} XP
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
