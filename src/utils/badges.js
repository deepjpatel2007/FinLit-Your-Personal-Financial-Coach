export const BADGES = [
  { id: 'first_login', name: 'First Login', icon: '👋', desc: 'Welcome to Finlit! Logged in for the first time.', condition: 'Automatically unlocked' },
  { id: 'quiz_completed', name: 'Quiz Completed', icon: '📝', desc: 'Completed the 20-question Money Profile onboarding quiz.', condition: 'Onboarding quiz complete' },
  { id: 'first_lesson', name: 'First Lesson Complete', icon: '📖', desc: 'Finished your first financial learning module.', condition: 'Completed 1 module' },
  { id: 'budget_builder', name: 'Budget Builder Used', icon: '📊', desc: 'Interacted with the 50/30/20 Budget Builder tool.', condition: 'Adjusted income slider' },
  { id: 'first_goal', name: 'First Goal Created', icon: '🎯', desc: 'Created your first personal savings goal.', condition: 'Added 1 goal' },
  { id: 'first_tx', name: 'First Transaction Added', icon: '💸', desc: 'Tracked your first spending transaction.', condition: 'Added 1 transaction' },
  { id: 'streak_3', name: '3-Day Streak', icon: '🔥', desc: 'Visited Finlit for 3 consecutive days.', condition: 'Streak is 3+' },
  { id: 'streak_7', name: '7-Day Streak', icon: '⚡', desc: 'Visited Finlit for 7 consecutive days.', condition: 'Streak is 7+' },
  { id: 'budget_boss_badge', name: 'Budget Boss', icon: '👑', desc: 'Completed the Budgeting Basics learning module.', condition: 'Finish Budgeting module' },
  { id: 'credit_champ_badge', name: 'Credit Champ', icon: '💳', desc: 'Completed both Credit Cards and Credit Scores modules.', condition: 'Finish Credit modules' },
  { id: 'investing_rookie', name: 'Investing Rookie', icon: '🌱', desc: 'Completed the Investing Basics module.', condition: 'Finish Investing module' },
  { id: 'savings_starter', name: 'Savings Starter', icon: '💰', desc: 'Saved $100 or more across your savings goals.', condition: 'Goals total saved >= $100' },
  { id: 'emergency_fund_builder', name: 'Emergency Fund Builder', icon: '🛡️', desc: 'Created an emergency fund target goal.', condition: 'Created goal with category Emergency fund' },
  { id: 'scenario_explorer', name: 'Scenario Explorer', icon: '🗺️', desc: 'Completed at least one decision scenario.', condition: 'Completed 1 scenario' },
  { id: 'ai_asked', name: 'AI Asked', icon: '💬', desc: 'Asked the Finlit AI Coach a personalized question.', condition: 'Sent 1 message to coach' },
  { id: 'money_master_badge', name: 'Money Master', icon: '🏆', desc: 'Reached the highest XP level rank.', condition: 'Accumulate 1000+ XP' }
];

/**
 * Checks and returns newly unlocked badges based on user state.
 * @param {object} userState - { xp, streak, goals, transactions, completedLessons, scenarioCompletions, askedAi, hasCompletedQuiz, currentBadges }
 * @returns {Array} List of newly unlocked badges to trigger notifications for.
 */
export function checkBadges(userState) {
  const {
    xp = 0,
    streak = 0,
    goals = [],
    transactions = [],
    completedLessons = [],
    scenarioCompletions = [],
    askedAi = false,
    hasCompletedQuiz = false,
    currentBadges = []
  } = userState;

  const currentIds = new Set(currentBadges.map(b => b.id));
  const newUnlocks = [];

  const unlock = (id) => {
    if (!currentIds.has(id)) {
      const bObj = BADGES.find(b => b.id === id);
      if (bObj) {
        newUnlocks.push({
          ...bObj,
          dateUnlocked: new Date().toISOString().split('T')[0]
        });
      }
    }
  };

  // 1. First Login (Always unlocked)
  unlock('first_login');

  // 2. Quiz Completed
  if (hasCompletedQuiz) {
    unlock('quiz_completed');
  }

  // 3. First Lesson Complete
  // completedLessons stores unique completed module ids
  if (completedLessons.length > 0) {
    unlock('first_lesson');
  }

  // 4. First Goal Created
  if (goals.length > 0) {
    unlock('first_goal');
  }

  // 5. First Transaction Added
  if (transactions.length > 0) {
    unlock('first_tx');
  }

  // 6. Streak 3
  if (streak >= 3) {
    unlock('streak_3');
  }

  // 7. Streak 7
  if (streak >= 7) {
    unlock('streak_7');
  }

  // 8. Budget Boss Module Complete
  if (completedLessons.includes('budgeting')) {
    unlock('budget_boss_badge');
  }

  // 9. Credit Champ (Credit Cards & Credit Scores modules complete)
  if (completedLessons.includes('credit-cards') && completedLessons.includes('credit-scores')) {
    unlock('credit_champ_badge');
  }

  // 10. Investing Rookie Complete
  if (completedLessons.includes('investing')) {
    unlock('investing_rookie');
  }

  // 11. Savings Starter (Saved >= 100)
  const totalSaved = goals.reduce((sum, g) => sum + (Number(g.currentAmount) || 0), 0);
  if (totalSaved >= 100) {
    unlock('savings_starter');
  }

  // 12. Emergency Fund Builder
  if (goals.some(g => g.category === 'Emergency fund')) {
    unlock('emergency_fund_builder');
  }

  // 13. Scenario Explorer
  if (scenarioCompletions.length > 0) {
    unlock('scenario_explorer');
  }

  // 14. AI Asked
  if (askedAi) {
    unlock('ai_asked');
  }

  // 15. Money Master (XP >= 1000)
  if (xp >= 1000) {
    unlock('money_master_badge');
  }

  // 16. Budget Builder Used (This will be unlocked explicitly in the app action triggers)

  return newUnlocks;
}
