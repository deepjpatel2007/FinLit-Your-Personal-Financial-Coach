// Money Profile Determination Rules for Finlit

export const PROFILES = {
  MONEY_NEWBIE: {
    name: "Money Newbie",
    description: "You are just getting started on your money journey! Everything feels a bit new, but you are eager to learn the ropes. The best way forward is to build a solid foundation.",
    recommendedModules: ["banking", "budgeting", "goals"],
    suggestedGoal: "Open a zero-fee student savings account and save your first $50."
  },
  BUDGET_STARTER: {
    name: "Budget Starter",
    description: "You have some income or allowance, but you're not quite sure where it all goes. You want to take control of your spending and start putting cash aside for what matters.",
    recommendedModules: ["budgeting", "goals", "banking"],
    suggestedGoal: "Track all your spending for 7 days using the 50/30/20 rule."
  },
  CREDIT_CURIOUS: {
    name: "Credit Curious",
    description: "You've heard about credit scores, debt, and credit cards, and you want to know how to build a stellar score without falling into high-interest debt traps.",
    recommendedModules: ["credit-cards", "budgeting", "taxes"],
    suggestedGoal: "Complete the Credit Cards module and explain 'Credit Utilization' to a friend."
  },
  FUTURE_INVESTOR: {
    name: "Future Investor",
    description: "You are curious about growing your wealth! You want to understand compound interest, the stock market, and tax-free accounts like TFSAs to make your money work for you.",
    recommendedModules: ["investing", "goals", "banking"],
    suggestedGoal: "Read the compound interest lesson and simulate a $50/month savings plan."
  },
  GOAL_BUILDER: {
    name: "Goal Builder",
    description: "You have a big purchase in mind or want to establish a strong safety net. You're ready to learn how to plan, save, and hit major financial targets systematically.",
    recommendedModules: ["goals", "budgeting", "credit-cards"],
    suggestedGoal: "Create a SMART savings goal for a major item (car, computer, or college) and save your first $100."
  }
};

/**
 * Determines the user's Money Profile based on their quiz answers.
 * @param {Array} answers - Array of 8 integers corresponding to the chosen option index for each question.
 * @returns {object} The profile object containing name, description, recommendedModules, and suggestedGoal.
 */
export const calculateProfile = (answers) => {
  if (!answers || answers.length < 8) {
    return PROFILES.MONEY_NEWBIE;
  }

  // Answer indices:
  // Q1 (Job): [0: Part-time, 1: Allowance, 2: Gig work, 3: No income yet]
  // Q2 (Goal): [0: Save big, 1: Get out of debt, 2: Start investing, 3: Build emergency fund]
  // Q3 (Handling): [0: Spend all, 1: Save little, 2: No idea, 3: Pretty well]
  // Q4 (Bank): [0: Yes, 1: No, 2: Not sure]
  // Q5 (Credit): [0: Yes, 1: No, 2: Vaguely]
  // Q6 (Income): [0: Yes, 1: No]
  // Q7 (Confused): [0: Budgeting, 1: Credit, 2: Investing, 3: Taxes, 4: All]
  // Q8 (Age): [0: 13-15, 1: 16-18, 2: 19-22, 3: 22+]

  const goalChoice = answers[1];
  const confusedChoice = answers[6];
  const ageChoice = answers[7];

  // 1. Prioritize Investing / Wealth accumulation
  if (goalChoice === 2 || confusedChoice === 2) {
    return PROFILES.FUTURE_INVESTOR;
  }

  // 2. Prioritize Credit and Debt Management
  if (goalChoice === 1 || confusedChoice === 1) {
    return PROFILES.CREDIT_CURIOUS;
  }

  // 3. Prioritize emergency fund or goal setting
  if (goalChoice === 3) {
    return PROFILES.GOAL_BUILDER;
  }

  // 4. Prioritize Budgeting
  if (confusedChoice === 0 || goalChoice === 0) {
    return PROFILES.BUDGET_STARTER;
  }

  // 5. Default Newbie if they are young and confused about all, or have no bank/job
  if (confusedChoice === 4 || ageChoice === 0 || answers[3] === 1) {
    return PROFILES.MONEY_NEWBIE;
  }

  // General fallback
  return PROFILES.BUDGET_STARTER;
};
