import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import Quiz from './components/Quiz';
import { storage } from './utils/storage';
import { checkBadges } from './utils/badges';

const DEFAULT_CHALLENGES = {
  track_expenses: { text: "Track 3 expenses in tracker", completed: false, xpReward: 20 },
  complete_lesson: { text: "Complete 1 learning lesson", completed: false, xpReward: 25 },
  add_goal: { text: "Add a new savings goal", completed: false, xpReward: 15 },
  use_budget: { text: "Use 50/30/20 Budget Builder", completed: false, xpReward: 15 },
  no_spend: { text: "Log a No-Spend day (manual check)", completed: false, xpReward: 30 },
  ask_ai: { text: "Ask Finlit AI Coach a question", completed: false, xpReward: 15 },
  audit_subs: { text: "Review active subscriptions", completed: false, xpReward: 20 }
};

export default function App() {
  const [xp, setXp] = useState(storage.getXP());
  const [streak, setStreak] = useState(storage.getStreak());
  const [profile, setProfile] = useState(storage.getMoneyProfile());
  const [theme, setTheme] = useState(storage.getTheme());
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState(storage.getMoneyProfile() ? 'dashboard' : 'learn');

  // Daily tracker collections
  const [goals, setGoals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [weeklyChallenges, setWeeklyChallenges] = useState(DEFAULT_CHALLENGES);
  
  // Badge unlock notification toast
  const [badgeToast, setBadgeToast] = useState(null);

  // Sync state on load
  useEffect(() => {
    setGoals(storage.getSavedGoals());
    setTransactions(storage.getTransactions());
    setSubscriptions(storage.getSubscriptions());
    setUnlockedBadges(storage.getUnlockedBadges());

    // Check weekly challenges reset
    let storedChallenges = storage.getWeeklyChallenges();
    const lastReset = storage.getLastChallengeReset();
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    if (!lastReset || !storedChallenges || (now - Number(lastReset)) > sevenDaysMs) {
      storage.setWeeklyChallenges(DEFAULT_CHALLENGES);
      storage.setLastChallengeReset(now);
      setWeeklyChallenges(DEFAULT_CHALLENGES);
    } else {
      setWeeklyChallenges(storedChallenges);
    }
  }, []);

  // Apply theme class on change
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    storage.setTheme(theme);
  }, [theme]);

  // Update streak on mount
  useEffect(() => {
    const { streak: newStreak } = storage.updateStreak();
    setStreak(newStreak);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Central XP and Action handler
  const handleAwardXp = (amount) => {
    const currentXp = storage.getXP();
    const updated = currentXp + amount;
    storage.setXP(updated);
    setXp(updated);
    
    // Check badges after XP increase (e.g. Money Master badge at 1000 XP)
    setTimeout(() => runBadgeCheck(updated, goals, transactions, storage.getCompletedLessons(), storage.getScenarioCompletions(), false), 100);
  };

  // Run achievement badges checks
  const runBadgeCheck = (
    currentXp = xp, 
    currentGoals = goals, 
    currentTxs = transactions, 
    currentLessons = storage.getCompletedLessons(), 
    currentScenarios = storage.getScenarioCompletions(),
    askedAi = false
  ) => {
    const newlyUnlocked = checkBadges({
      xp: currentXp,
      streak,
      goals: currentGoals,
      transactions: currentTxs,
      completedLessons: currentLessons,
      scenarioCompletions: currentScenarios,
      askedAi,
      hasCompletedQuiz: !!profile,
      currentBadges: unlockedBadges
    });

    if (newlyUnlocked.length > 0) {
      const updatedBadges = [...unlockedBadges, ...newlyUnlocked];
      storage.setUnlockedBadges(updatedBadges);
      setUnlockedBadges(updatedBadges);

      // Trigger XP award for unlocking badges (e.g. +20 XP per badge!)
      const badgeXpReward = newlyUnlocked.length * 20;
      handleAwardXp(badgeXpReward);

      // Display Toast notifications for the badges sequentially
      newlyUnlocked.forEach((badge, idx) => {
        setTimeout(() => {
          setBadgeToast(badge);
          setTimeout(() => setBadgeToast(null), 4000);
        }, idx * 4500);
      });
    }
  };

  // Challenge Trigger Checkers
  const completeChallenge = (challengeKey) => {
    if (weeklyChallenges[challengeKey] && !weeklyChallenges[challengeKey].completed) {
      const updated = {
        ...weeklyChallenges,
        [challengeKey]: { ...weeklyChallenges[challengeKey], completed: true }
      };
      storage.setWeeklyChallenges(updated);
      setWeeklyChallenges(updated);
      handleAwardXp(weeklyChallenges[challengeKey].xpReward);
    }
  };

  const handleActionTrigger = (actionKey) => {
    // Reload state parameters
    const loadedGoals = storage.getSavedGoals();
    const loadedTxs = storage.getTransactions();
    const loadedSubs = storage.getSubscriptions();
    const loadedLessons = storage.getCompletedLessons();
    const loadedScenarios = storage.getScenarioCompletions();

    setGoals(loadedGoals);
    setTransactions(loadedTxs);
    setSubscriptions(loadedSubs);

    // 1. Process automated challenges
    if (actionKey === 'add_transaction') {
      completeChallenge('track_expenses');
      runBadgeCheck(xp, loadedGoals, loadedTxs, loadedLessons, loadedScenarios, false);
    }
    else if (actionKey === 'add_goal') {
      completeChallenge('add_goal');
      runBadgeCheck(xp, loadedGoals, loadedTxs, loadedLessons, loadedScenarios, false);
    }
    else if (actionKey === 'use_budget') {
      completeChallenge('use_budget');
      // Unlock budget builder badge
      const currentBadgeIds = unlockedBadges.map(b => b.id);
      if (!currentBadgeIds.includes('budget_builder')) {
        const budgetBuilderBadge = {
          id: 'budget_builder',
          name: 'Budget Builder Used',
          icon: '📊',
          desc: 'Interacted with the 50/30/20 Budget Builder tool.',
          condition: 'Adjusted income slider',
          dateUnlocked: new Date().toISOString().split('T')[0]
        };
        const updated = [...unlockedBadges, budgetBuilderBadge];
        storage.setUnlockedBadges(updated);
        setUnlockedBadges(updated);
        setBadgeToast(budgetBuilderBadge);
        setTimeout(() => setBadgeToast(null), 4000);
        handleAwardXp(20);
      }
    }
    else if (actionKey === 'ask_ai') {
      completeChallenge('ask_ai');
      runBadgeCheck(xp, loadedGoals, loadedTxs, loadedLessons, loadedScenarios, true);
    }
    else if (actionKey === 'audit_subs') {
      completeChallenge('audit_subs');
    }
    else if (actionKey === 'complete_lesson') {
      completeChallenge('complete_lesson');
      runBadgeCheck(xp, loadedGoals, loadedTxs, loadedLessons, loadedScenarios, false);
    }
  };

  const handleToggleManualChallenge = (key) => {
    const updated = {
      ...weeklyChallenges,
      [key]: { ...weeklyChallenges[key], completed: !weeklyChallenges[key].completed }
    };
    storage.setWeeklyChallenges(updated);
    setWeeklyChallenges(updated);
    
    if (updated[key].completed) {
      handleAwardXp(weeklyChallenges[key].xpReward);
    } else {
      // Deduct XP if unchecked
      const currentXp = storage.getXP();
      const updatedXp = Math.max(0, currentXp - weeklyChallenges[key].xpReward);
      storage.setXP(updatedXp);
      setXp(updatedXp);
    }
  };

  const handleQuizComplete = (newProfile) => {
    setProfile(newProfile);
    // Refresh XP (Awards 100 XP)
    setXp(storage.getXP());
    setActiveTab('dashboard');
    
    // Check badges for quiz completion
    setTimeout(() => {
      runBadgeCheck(storage.getXP(), goals, transactions, storage.getCompletedLessons(), storage.getScenarioCompletions(), false);
    }, 200);
  };

  // Safe redirect helper for tabs switching
  const handleBottomNav = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header Navbar */}
      <Navbar 
        xp={xp} 
        streak={streak} 
        theme={theme}
        toggleTheme={toggleTheme}
        onStartQuiz={() => setShowQuiz(true)}
        profile={profile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Pages Content area */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                xp={xp} 
                streak={streak} 
                setXp={setXp}
                onAwardXp={handleAwardXp}
                onStartQuiz={() => setShowQuiz(true)}
                profile={profile}
                setProfile={setProfile}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                goals={goals}
                transactions={transactions}
                unlockedBadges={unlockedBadges}
                weeklyChallenges={weeklyChallenges}
                onToggleChallenge={handleToggleManualChallenge}
                onActionTriggered={handleActionTrigger}
              />
            } 
          />
          <Route 
            path="/lesson/:moduleId" 
            element={
              <LessonPage 
                onAwardXp={handleAwardXp} 
                onLessonComplete={() => handleActionTrigger('complete_lesson')}
              />
            } 
          />
        </Routes>
      </main>

      {/* In-app Toast notifications for unlocks */}
      {badgeToast && (
        <div className="badge-toast-notification">
          <span style={{ fontSize: '2rem' }}>{badgeToast.icon}</span>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>NEW BADGE UNLOCKED!</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{badgeToast.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>{badgeToast.desc}</div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Tab bar on mobile */}
      {profile && (
        <div className="mobile-bottom-nav">
          <button 
            onClick={() => handleBottomNav('dashboard')} 
            className={`mobile-bottom-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.2rem' }}>🏠</span>
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => handleBottomNav('learn')} 
            className={`mobile-bottom-nav-item ${activeTab === 'learn' ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.2rem' }}>📚</span>
            <span>Learn</span>
          </button>
          <button 
            onClick={() => handleBottomNav('tools')} 
            className={`mobile-bottom-nav-item ${activeTab === 'tools' ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.2rem' }}>🛠️</span>
            <span>Tools</span>
          </button>
          <button 
            onClick={() => handleBottomNav('spending')} 
            className={`mobile-bottom-nav-item ${activeTab === 'spending' ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.2rem' }}>💸</span>
            <span>Spending</span>
          </button>
          <button 
            onClick={() => handleBottomNav('goals')} 
            className={`mobile-bottom-nav-item ${activeTab === 'goals' ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1.2rem' }}>🎯</span>
            <span>Goals</span>
          </button>
        </div>
      )}

      {/* Quiz Modal overlay */}
      {showQuiz && (
        <Quiz 
          onClose={() => setShowQuiz(false)} 
          onQuizComplete={handleQuizComplete}
        />
      )}

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}
