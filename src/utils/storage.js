// LocalStorage Utility Helpers for Finlit

const KEYS = {
  QUIZ_ANSWERS: 'finlit_quiz_answers',
  MONEY_PROFILE: 'finlit_money_profile',
  MODULE_PROGRESS: 'finlit_module_progress',
  COMPLETED_LESSONS: 'finlit_completed_lessons',
  XP: 'finlit_xp',
  LEVEL: 'finlit_level',
  DAILY_STREAK: 'finlit_daily_streak',
  LAST_VISITED_DATE: 'finlit_last_visited_date',
  SCENARIO_COMPLETIONS: 'finlit_scenario_completions',
  SAVED_GOALS: 'finlit_saved_goals',
  TRANSACTIONS: 'finlit_transactions',
  SUBSCRIPTIONS: 'finlit_subscriptions',
  UNLOCKED_BADGES: 'finlit_unlocked_badges',
  WEEKLY_CHALLENGES: 'finlit_weekly_challenges',
  LAST_CHALLENGE_RESET: 'finlit_last_challenge_reset',
  THEME: 'finlit_theme' // 'light' or 'dark'
};

// Safe JSON parser/getter
const getItem = (key, defaultValue) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error(`Error reading key ${key} from localStorage`, e);
    return defaultValue;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key ${key} to localStorage`, e);
  }
};

export const storage = {
  // Theme
  getTheme: () => localStorage.getItem(KEYS.THEME) || 'dark',
  setTheme: (theme) => localStorage.setItem(KEYS.THEME, theme),

  // Quiz & Profile
  getQuizAnswers: () => getItem(KEYS.QUIZ_ANSWERS, null),
  setQuizAnswers: (answers) => setItem(KEYS.QUIZ_ANSWERS, answers),
  
  getMoneyProfile: () => getItem(KEYS.MONEY_PROFILE, null),
  setMoneyProfile: (profile) => setItem(KEYS.MONEY_PROFILE, profile),

  // Module & Lesson Progress
  getModuleProgress: () => getItem(KEYS.MODULE_PROGRESS, {}),
  setModuleProgress: (progress) => setItem(KEYS.MODULE_PROGRESS, progress),
  
  getCompletedLessons: () => getItem(KEYS.COMPLETED_LESSONS, []),
  setCompletedLessons: (completed) => setItem(KEYS.COMPLETED_LESSONS, completed),

  // Gamification (XP & Level)
  getXP: () => getItem(KEYS.XP, 0),
  setXP: (xp) => setItem(KEYS.XP, xp),
  
  getLevel: () => getItem(KEYS.LEVEL, 'Money Newbie'),
  setLevel: (level) => setItem(KEYS.LEVEL, level),

  // Scenario completions
  getScenarioCompletions: () => getItem(KEYS.SCENARIO_COMPLETIONS, []),
  setScenarioCompletions: (completions) => setItem(KEYS.SCENARIO_COMPLETIONS, completions),

  // Goals
  getSavedGoals: () => getItem(KEYS.SAVED_GOALS, []),
  setSavedGoals: (goals) => setItem(KEYS.SAVED_GOALS, goals),

  // Transactions
  getTransactions: () => getItem(KEYS.TRANSACTIONS, []),
  setTransactions: (transactions) => setItem(KEYS.TRANSACTIONS, transactions),

  // Subscriptions
  getSubscriptions: () => getItem(KEYS.SUBSCRIPTIONS, []),
  setSubscriptions: (subscriptions) => setItem(KEYS.SUBSCRIPTIONS, subscriptions),

  // Badges
  getUnlockedBadges: () => getItem(KEYS.UNLOCKED_BADGES, []),
  setUnlockedBadges: (badges) => setItem(KEYS.UNLOCKED_BADGES, badges),

  // Weekly Challenges
  getWeeklyChallenges: () => getItem(KEYS.WEEKLY_CHALLENGES, null),
  setWeeklyChallenges: (challenges) => setItem(KEYS.WEEKLY_CHALLENGES, challenges),

  getLastChallengeReset: () => getItem(KEYS.LAST_CHALLENGE_RESET, null),
  setLastChallengeReset: (timestamp) => setItem(KEYS.LAST_CHALLENGE_RESET, timestamp),

  // Streak logic (Consecutive-calendar-day)
  getStreak: () => {
    return getItem(KEYS.DAILY_STREAK, 0);
  },
  
  updateStreak: () => {
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastVisited = localStorage.getItem(KEYS.LAST_VISITED_DATE);
    let currentStreak = getItem(KEYS.DAILY_STREAK, 0);

    if (!lastVisited) {
      // First visit
      currentStreak = 1;
      localStorage.setItem(KEYS.LAST_VISITED_DATE, todayStr);
      setItem(KEYS.DAILY_STREAK, currentStreak);
      return { streak: currentStreak, updated: true };
    }

    if (lastVisited === todayStr) {
      // Already visited today, no change
      return { streak: currentStreak, updated: false };
    }

    // Check if yesterday
    const today = new Date(todayStr);
    const lastDate = new Date(lastVisited);
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day visit
      currentStreak += 1;
    } else {
      // Missed days, reset streak to 1
      currentStreak = 1;
    }

    localStorage.setItem(KEYS.LAST_VISITED_DATE, todayStr);
    setItem(KEYS.DAILY_STREAK, currentStreak);
    return { streak: currentStreak, updated: true };
  },

  // Reset specific parts of application
  resetQuiz: () => {
    localStorage.removeItem(KEYS.QUIZ_ANSWERS);
    localStorage.removeItem(KEYS.MONEY_PROFILE);
  },

  resetTransactions: () => {
    localStorage.removeItem(KEYS.TRANSACTIONS);
  },

  resetGoals: () => {
    localStorage.removeItem(KEYS.SAVED_GOALS);
  },

  resetSubscriptions: () => {
    localStorage.removeItem(KEYS.SUBSCRIPTIONS);
  },

  // Reset all data
  resetAll: () => {
    localStorage.removeItem(KEYS.QUIZ_ANSWERS);
    localStorage.removeItem(KEYS.MONEY_PROFILE);
    localStorage.removeItem(KEYS.MODULE_PROGRESS);
    localStorage.removeItem(KEYS.COMPLETED_LESSONS);
    localStorage.removeItem(KEYS.XP);
    localStorage.removeItem(KEYS.LEVEL);
    localStorage.removeItem(KEYS.DAILY_STREAK);
    localStorage.removeItem(KEYS.LAST_VISITED_DATE);
    localStorage.removeItem(KEYS.SCENARIO_COMPLETIONS);
    localStorage.removeItem(KEYS.SAVED_GOALS);
    localStorage.removeItem(KEYS.TRANSACTIONS);
    localStorage.removeItem(KEYS.SUBSCRIPTIONS);
    localStorage.removeItem(KEYS.UNLOCKED_BADGES);
    localStorage.removeItem(KEYS.WEEKLY_CHALLENGES);
    localStorage.removeItem(KEYS.LAST_CHALLENGE_RESET);
    // keep theme
  }
};
