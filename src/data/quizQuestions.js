export const quizQuestions = [
  // Section A: Current Situation
  {
    id: 1,
    section: "Current Situation",
    question: "What best describes your current status?",
    options: [
      "High school student",
      "College or university student",
      "Working part-time",
      "Working full-time",
      "Not working yet"
    ],
    canSkip: false
  },
  {
    id: 2,
    section: "Current Situation",
    question: "Do you currently earn or receive money?",
    options: [
      "Yes, from a part-time/full-time job",
      "Yes, from an allowance",
      "Yes, from gig work (babysitting, grass cutting, side-hustles)",
      "Sometimes / Occasionally",
      "Not yet"
    ],
    canSkip: false
  },
  {
    id: 3,
    section: "Current Situation",
    question: "How often do you get paid or receive money?",
    options: [
      "Weekly",
      "Bi-weekly",
      "Monthly",
      "Randomly / Irregularly",
      "I do not get paid yet"
    ],
    canSkip: true
  },
  {
    id: 4,
    section: "Current Situation",
    question: "Do you currently have a bank account?",
    options: [
      "Chequing Account only",
      "Savings Account only",
      "Both Chequing and Savings Accounts",
      "No bank account yet",
      "I am not sure"
    ],
    canSkip: false
  },
  {
    id: 5,
    section: "Current Situation",
    question: "Do you currently track your spending?",
    options: [
      "Always, I log every purchase",
      "Sometimes, when I remember",
      "Rarely, only for major items",
      "Never"
    ],
    canSkip: false
  },

  // Section B: Goals
  {
    id: 6,
    section: "Goals",
    question: "What is your biggest financial goal right now?",
    options: [
      "Save for a car",
      "Save for school / tuition",
      "Build emergency savings",
      "Start investing for the long-term",
      "Pay off personal debt (family, student loans)",
      "Travel or save for a trip",
      "Buy something big (laptop, phone, console)",
      "Just learn the basic concepts"
    ],
    canSkip: false
  },
  {
    id: 7,
    section: "Goals",
    question: "How soon do you want to reach your main financial goal?",
    options: [
      "1–3 months",
      "3–6 months",
      "6–12 months",
      "1–2 years",
      "I am not sure"
    ],
    canSkip: true
  },
  {
    id: 8,
    section: "Goals",
    question: "What motivates you most when thinking about money?",
    options: [
      "Freedom: Being able to choose what I do",
      "Security: Knowing I have a safety net",
      "Fun: Having experiences and buying cool things",
      "Helping: Supporting my family or community",
      "Wealth: Growing major long-term funds",
      "Peace of mind: Avoiding money anxiety"
    ],
    canSkip: true
  },
  {
    id: 9,
    section: "Goals",
    question: "How confident do you feel about managing money?",
    options: [
      "Not confident at all",
      "A little confident",
      "Somewhat confident",
      "Very confident"
    ],
    canSkip: false
  },
  {
    id: 10,
    section: "Goals",
    question: "What worries you the most when it comes to finance?",
    options: [
      "Overspending / Impulse buying",
      "Falling into debt traps",
      "Not saving enough for the future",
      "Investing risk / Losing money",
      "Taxes & filing papers",
      "Not understanding where my money goes"
    ],
    canSkip: false
  },

  // Section C: Habits
  {
    id: 11,
    section: "Habits",
    question: "When you get cash or get paid, what usually happens?",
    options: [
      "I spend most of it within the first few days",
      "I spend first and save whatever is left over",
      "I save a set percentage first, then spend the rest",
      "I have no specific pattern",
      "It depends on the week"
    ],
    canSkip: false
  },
  {
    id: 12,
    section: "Habits",
    question: "Which category does most of your spending go toward?",
    options: [
      "Food (takeout, bubble tea, restaurants)",
      "Clothing / Shoes",
      "Gaming, subscriptions, or digital items",
      "Transportation (gas, bus passes, Uber)",
      "Social events / Hanging out with friends",
      "School supplies or textbooks",
      "I do not know where most of it goes"
    ],
    canSkip: true
  },
  {
    id: 13,
    section: "Habits",
    question: "Do you have a monthly savings target?",
    options: [
      "Yes, a specific dollar amount or percentage",
      "No specific target",
      "Sometimes, for short periods",
      "I do not know what a savings target is"
    ],
    canSkip: false
  },
  {
    id: 14,
    section: "Habits",
    question: "Have you ever created a monthly budget?",
    options: [
      "Yes, and I currently use it regularly",
      "Yes, but I stopped using it",
      "I tried once but it was too hard",
      "No, never made a budget"
    ],
    canSkip: false
  },
  {
    id: 15,
    section: "Habits",
    question: "How do you usually pay for purchases?",
    options: [
      "Debit Card",
      "Credit Card",
      "Physical Cash",
      "Apple Pay / Google Pay on phone",
      "My parents or someone else pays",
      "A mix of payment methods"
    ],
    canSkip: false
  },

  // Section D: Knowledge
  {
    id: 16,
    section: "Knowledge",
    question: "Which financial topic is most confusing to you?",
    options: [
      "Budgeting & saving",
      "Credit cards & debt traps",
      "Investing, stocks, and compound growth",
      "Taxes, paycheques, and T4 slips",
      "Banking products (HISA, chequing)",
      "Student loans, mortgages, and debt",
      "All of it - I want to start from absolute zero"
    ],
    canSkip: false
  },
  {
    id: 17,
    section: "Knowledge",
    question: "Do you know what a credit score is and how it works?",
    options: [
      "Yes, I understand it and know how to build it",
      "Yes, I know what it is but not how it works",
      "Vaguely, I have heard of it",
      "No, never heard of it"
    ],
    canSkip: false
  },
  {
    id: 18,
    section: "Knowledge",
    question: "Are you familiar with TFSA, RESP, or RRSP accounts?",
    options: [
      "Yes, I understand all three",
      "I know some of them (e.g. TFSA or RESP)",
      "No, they all sound like alphabet soup",
      "I am not sure"
    ],
    canSkip: false
  },
  {
    id: 19,
    section: "Knowledge",
    question: "What best describes your investing knowledge level?",
    options: [
      "I know nothing / Complete beginner",
      "I understand basic stock market concepts",
      "I understand ETFs, diversification, and compound interest",
      "I understand advanced asset allocation and market risks"
    ],
    canSkip: false
  },
  {
    id: 20,
    section: "Knowledge",
    question: "What style of learning do you prefer the most?",
    options: [
      "Bite-sized written lessons",
      "Interactive quizzes and games",
      "Real-life stories & scenario choices",
      "Playable math calculators and sliders",
      "Conversational chatting with the AI Coach",
      "Visual charts and progress dashboards"
    ],
    canSkip: true
  }
];
