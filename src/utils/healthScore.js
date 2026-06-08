/**
 * Calculates a Financial Health Score out of 100 based on user's profile and app usage.
 * 
 * Formula factors:
 * 1. Onboarding & Quiz Confidence: 15%
 *    - Based on Quiz Q9 (Confidence): Not confident (25 pts), A little (50 pts), Somewhat (75 pts), Very (100 pts)
 * 2. Budget Tracking: 20%
 *    - Having at least some transactions tracked (10%)
 *    - If income & expense are logged and Cash Flow is positive (10%)
 * 3. Savings Goal Progress: 20%
 *    - Having at least one goal (10%)
 *    - Average progress percentage across all goals (10%)
 * 4. Learning Progress: 20%
 *    - Percent of the 12 modules completed (or lessons completed)
 * 5. Credit Knowledge: 15%
 *    - Based on credit quiz answers or credit score simulation settings
 * 6. Streak Consistency: 10%
 *    - Based on the daily streak (e.g., 2% per streak day, max 10%)
 */
export function calculateHealthScore({
  quizAnswers,
  goals = [],
  transactions = [],
  completedLessons = [],
  streak = 0
}) {
  let score = 0;

  // 1. Quiz Confidence (Max 15 pts)
  // Q9 in quizQuestions is 1-indexed as 9 (index 8 in zero-indexed array if stored that way)
  // Options: "Not confident at all" (0), "A little confident" (1), "Somewhat confident" (2), "Very confident" (3)
  let confidencePts = 5; // Baseline
  if (quizAnswers && Array.isArray(quizAnswers)) {
    const q9Answer = quizAnswers[8]; // Index 8 corresponds to Q9
    if (q9Answer === 3) confidencePts = 15;
    else if (q9Answer === 2) confidencePts = 12;
    else if (q9Answer === 1) confidencePts = 8;
    else if (q9Answer === 0) confidencePts = 4;
  }
  score += confidencePts;

  // 2. Budget Tracking (Max 20 pts)
  let budgetPts = 0;
  if (transactions.length > 0) {
    budgetPts += 10; // Logged transactions
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
    if (income > 0 && expenses <= income) {
      budgetPts += 10; // Positive or balanced cash flow
    } else if (income > 0 && expenses > income) {
      budgetPts += 5; // Checked budget but negative cash flow
    }
  }
  score += budgetPts;

  // 3. Savings Goal Progress (Max 20 pts)
  let goalPts = 0;
  if (goals.length > 0) {
    goalPts += 10; // Created at least one goal
    const totalProgress = goals.reduce((sum, g) => {
      const target = Number(g.targetAmount) || 1;
      const current = Number(g.currentAmount) || 0;
      return sum + Math.min(100, (current / target) * 100);
    }, 0);
    const avgProgress = totalProgress / goals.length;
    goalPts += Math.round((avgProgress / 100) * 10);
  }
  score += goalPts;

  // 4. Learning Progress (Max 20 pts)
  // There are 12 modules in total. If we track by modules, let's say:
  // Each completed module is worth 20 / 12 ~ 1.67 pts, up to 20.
  let learningPts = 0;
  if (completedLessons && Array.isArray(completedLessons)) {
    // Unique modules completed.
    // Let's assume completedLessons stores module IDs or we check unique entries.
    const uniqueModules = [...new Set(completedLessons)];
    learningPts = Math.min(20, Math.round((uniqueModules.length / 12) * 20));
  }
  score += learningPts;

  // 5. Credit Knowledge (Max 15 pts)
  // Let's base this on the quiz answers for Q17 (Credit Score) or Q18 (TFSA/RESP/RRSP).
  let creditPts = 5; // Default baseline
  if (quizAnswers && Array.isArray(quizAnswers)) {
    const q17Answer = quizAnswers[16]; // Q17: credit score
    const q18Answer = quizAnswers[17]; // Q18: TFSA/RESP/RRSP
    if (q17Answer === 0) creditPts += 5; // "Yes and understand"
    else if (q17Answer === 1) creditPts += 3;
    
    if (q18Answer === 0) creditPts += 5; // "Yes"
    else if (q18Answer === 1) creditPts += 3;
  }
  score += creditPts;

  // 6. Streak Consistency (Max 10 pts)
  // 2 points per streak day, capped at 10 (5-day streak is max points)
  let streakPts = Math.min(10, streak * 2);
  score += streakPts;

  return Math.min(100, Math.max(0, score));
}
