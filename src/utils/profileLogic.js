export const PROFILES = {
  MONEY_NEWBIE: {
    key: "MONEY_NEWBIE",
    name: "Money Newbie",
    description: "You are just getting started on your money journey! Everything feels a bit new, but you are eager to learn the ropes. The best way forward is to build a solid foundation.",
    recommendedPath: "first_job",
    suggestedDailyHabit: "Track at least one expense per day",
    suggestedFirstGoal: "Save your first $50 in a savings account",
    bestTools: ["50/30/20 Budget Builder", "Emergency Fund Calculator"],
    aiCoachStarter: "I am a Money Newbie. Explain how standard savings accounts work and how I should set up my first goals."
  },
  BUDGET_STARTER: {
    key: "BUDGET_STARTER",
    name: "Budget Starter",
    description: "You have some cash flowing in, but you aren't sure where it all goes. You want to take control of your spending and start putting cash aside for what matters.",
    recommendedPath: "budget_boss",
    suggestedDailyHabit: "Log every expense immediately",
    suggestedFirstGoal: "Create a monthly budget and stick to it for 14 days",
    bestTools: ["50/30/20 Budget Builder", "Subscription Audit Tool"],
    aiCoachStarter: "I am a Budget Starter. Help me build a simple daily budget to stop impulse spending on food and clothes."
  },
  GOAL_BUILDER: {
    key: "GOAL_BUILDER",
    name: "Goal Builder",
    description: "You have big purchases in mind (like a car, laptop, or college) and you're ready to plan, save, and hit major financial targets systematically.",
    recommendedPath: "budget_boss",
    suggestedDailyHabit: "Put aside $5 every time you think of buying a 'want'",
    suggestedFirstGoal: "Save $250 for your next major item",
    bestTools: ["50/30/20 Budget Builder", "Emergency Fund Calculator"],
    aiCoachStarter: "I am a Goal Builder. I want to save up for a big purchase. What is a realistic saving plan for me?"
  },
  CREDIT_CURIOUS: {
    key: "CREDIT_CURIOUS",
    name: "Credit Curious",
    description: "You've heard about credit scores, debt, and credit cards. You want to know how to build a stellar score without falling into high-interest debt traps.",
    recommendedPath: "credit_ready",
    suggestedDailyHabit: "Check out credit simulator choices weekly",
    suggestedFirstGoal: "Read the Credit Cards module and explain APR to a parent or friend",
    bestTools: ["Credit Score Simulator", "Debt Payoff Planner"],
    aiCoachStarter: "I am Credit Curious. Explain credit scores like I'm 16 and how I can prepare to build credit safely."
  },
  FUTURE_INVESTOR: {
    key: "FUTURE_INVESTOR",
    name: "Future Investor",
    description: "You are curious about growing your wealth! You want to understand compound interest, the stock market, and tax-sheltered accounts (TFSAs/RESPs).",
    recommendedPath: "future_investor",
    suggestedDailyHabit: "Read one investment glossary term daily",
    suggestedFirstGoal: "Simulate a $50/month long-term investment plan",
    bestTools: ["What-If Growth Calculator", "Paycheque Simulator"],
    aiCoachStarter: "I am a Future Investor. Explain the difference between stocks and ETFs and how compound interest works."
  },
  PAYCHEQUE_PLANNER: {
    key: "PAYCHEQUE_PLANNER",
    name: "Paycheque Planner",
    description: "You earn regular money from a job or side hustle. You want to understand tax deductions, gross vs. net pay, and how to allocate your earnings.",
    recommendedPath: "first_job",
    suggestedDailyHabit: "Allocate 20% of each paycheque to savings immediately",
    suggestedFirstGoal: "Set up automatic savings from your next paycheque",
    bestTools: ["Paycheque Simulator", "50/30/20 Budget Builder"],
    aiCoachStarter: "I am a Paycheque Planner. Teach me how to split my first job earnings and what taxes are deducted from my pay."
  },
  SMART_SAVER: {
    key: "SMART_SAVER",
    name: "Smart Saver",
    description: "You're already in the habit of saving some money, but you want to optimize your savings, set up an emergency fund, and plan for bigger financial milestones.",
    recommendedPath: "budget_boss",
    suggestedDailyHabit: "Check your savings progress weekly",
    suggestedFirstGoal: "Build a full 3-month emergency fund",
    bestTools: ["Emergency Fund Calculator", "Subscription Audit Tool"],
    aiCoachStarter: "I am a Smart Saver. Help me calculate my emergency fund target and suggest ways to optimize my subscriptions."
  },
  MONEY_MASTER: {
    key: "MONEY_MASTER",
    name: "Money Master in Training",
    description: "You're already doing great with tracking, budgeting, and saving. You are confident and ready to master advanced concepts like ETFs, taxes, and financial independence.",
    recommendedPath: "future_investor",
    suggestedDailyHabit: "Review your net cash flow monthly",
    suggestedFirstGoal: "Create a roadmap to hit your first $2,000 net worth",
    bestTools: ["What-If Growth Calculator", "Debt Payoff Planner"],
    aiCoachStarter: "I am a Money Master in Training. Let's discuss advanced strategies like the FIRE movement and optimizing tax-free accounts."
  }
};

/**
 * Determines the user's Money Profile based on 20 quiz answers.
 * @param {Array} answers - Array of 20 numbers/null corresponding to chosen option index for each question.
 * @returns {object} The profile object containing detailed personalized data.
 */
export const calculateProfile = (answers) => {
  if (!answers || answers.length < 20) {
    return {
      ...PROFILES.MONEY_NEWBIE,
      confidenceScore: 50,
      mainGoal: "Learn the basics",
      riskArea: "Lack of financial education",
    };
  }

  // Extract key responses (accounting for potential nulls if skipped)
  const q1_status = answers[0]; // 0: HS, 1: College, 2: Part-time, 3: Full-time, 4: Not working
  const q2_earn = answers[1]; // 0: job, 1: allowance, 2: gig, 3: sometimes, 4: not yet
  const q5_track = answers[4]; // 0: always, 1: sometimes, 2: rarely, 3: never
  const q6_goal = answers[5]; // 0: car, 1: school, 2: emergency, 3: investing, 4: debt, 5: travel, 6: big item, 7: basics
  const q9_confidence = answers[8]; // 0: not, 1: little, 2: somewhat, 3: very
  const q10_worry = answers[9]; // 0: overspending, 1: debt, 2: saving, 3: investing, 4: taxes, 5: not understanding
  const q11_pattern = answers[10]; // 0: spend most, 1: spend first/save left, 2: save first, 3: no pattern, 4: depends
  const q13_target = answers[12]; // 0: yes, 1: no, 2: sometimes, 3: don't know
  const q14_budget = answers[13]; // 0: yes & use, 1: yes but stopped, 2: tried once, 3: no
  const q17_credit = answers[16]; // 0: yes & understand, 1: yes but don't, 2: vaguely, 3: no
  const q19_invest = answers[18]; // 0: nothing, 1: a little, 2: stocks, 3: ETFs & long-term

  // Calculate confidence score out of 100
  let confidenceScore = 50;
  if (q9_confidence === 0) confidenceScore = 25;
  else if (q9_confidence === 1) confidenceScore = 50;
  else if (q9_confidence === 2) confidenceScore = 75;
  else if (q9_confidence === 3) confidenceScore = 100;

  // Determine main goal display string
  const goalOptions = [
    "Save for a car",
    "Save for school / tuition",
    "Build emergency savings",
    "Start investing",
    "Pay off debt",
    "Travel",
    "Buy something big",
    "Learn the basics"
  ];
  const mainGoal = (q6_goal !== null && q6_goal >= 0 && q6_goal < goalOptions.length) 
    ? goalOptions[q6_goal] 
    : "Learn the basics";

  // Determine risk area display string
  const riskOptions = [
    "Overspending & impulse buying",
    "Falling into debt traps",
    "Not saving enough for the future",
    "Market risk & fear of investing",
    "Tax compliance & documentation",
    "Not understanding where money goes"
  ];
  let riskArea = "Not tracking spending";
  if (q10_worry !== null && q10_worry >= 0 && q10_worry < riskOptions.length) {
    riskArea = riskOptions[q10_worry];
  } else if (q11_pattern === 0) {
    riskArea = "Overspending / lack of saving habits";
  }

  // Determine profile archetype
  let archetype = PROFILES.MONEY_NEWBIE;

  if (q9_confidence === 3 && q5_track === 0 && q14_budget === 0 && q17_credit === 0 && q19_invest >= 2) {
    // Highly confident, tracks, budgets, credit/investing literate
    archetype = PROFILES.MONEY_MASTER;
  } else if (q6_goal === 3 || q19_invest === 3) {
    // Wants to invest or understands ETFs
    archetype = PROFILES.FUTURE_INVESTOR;
  } else if (q6_goal === 4 || q10_worry === 1) {
    // Goal is debt or worry is debt
    archetype = PROFILES.CREDIT_CURIOUS;
  } else if ((q1_status === 2 || q1_status === 3 || q2_earn === 0) && q10_worry === 4) {
    // Working and worried about taxes
    archetype = PROFILES.PAYCHEQUE_PLANNER;
  } else if (q11_pattern === 2 && q13_target === 0) {
    // Saves first, has target
    archetype = PROFILES.SMART_SAVER;
  } else if (q6_goal === 0 || q6_goal === 1 || q6_goal === 6) {
    // Specific purchase goals
    archetype = PROFILES.GOAL_BUILDER;
  } else if (q14_budget === 3 || q5_track === 3) {
    // No budget, never tracks
    archetype = PROFILES.BUDGET_STARTER;
  } else if (q2_earn === 4 || q1_status === 4) {
    // Not working/earning yet
    archetype = PROFILES.MONEY_NEWBIE;
  } else {
    // Default fallback based on general answers
    archetype = (confidenceScore <= 50) ? PROFILES.MONEY_NEWBIE : PROFILES.BUDGET_STARTER;
  }

  return {
    ...archetype,
    confidenceScore,
    mainGoal,
    riskArea,
  };
};
