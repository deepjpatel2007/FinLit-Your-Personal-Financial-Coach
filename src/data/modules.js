export const modules = [
  {
    id: "budgeting",
    title: "Budgeting Basics",
    icon: "PieChart",
    color: "green",
    description: "Master the 50/30/20 rule and understand needs vs. wants.",
    sections: [
      {
        title: "What is Budgeting?",
        content: "A budget is simply a plan for your money. Think of it as giving every dollar a job before you spend it. It's not about restriction; it's about freedom to spend on what actually matters to you without feeling guilty or stressed."
      },
      {
        title: "The 50/30/20 Rule",
        content: "A simple, popular way to budget is the 50/30/20 rule: \n\n• 50% for Needs: things you MUST pay to survive (rent, phone bill, transit, basic groceries).\n• 30% for Wants: fun things you enjoy but can live without (concert tickets, dining out, video games, stylish clothes).\n• 20% for Savings: paying your future self first (emergency fund, saving for a car, or investing)."
      },
      {
        title: "Needs vs. Wants",
        content: "Needs are essential (e.g., basic food, shelter, winter coat in Canada). Wants are choices that make life more comfortable or fun (e.g., brand-name shoes, premium streaming subscriptions). Before buying, ask yourself: 'Will I be okay in a week if I don't buy this right now?'"
      }
    ],
    realLifeExample: {
      title: "Meet Maya's Paycheque",
      text: "Maya got her first bi-weekly paycheque of $800 from her retail job. Using the 50/30/20 rule, she allocates $400 (50%) for her phone bill and bus pass, $240 (30%) for hanging out with friends, and immediately puts $160 (20%) into her savings account before spending anything else. By automated savings, she doesn't even feel tempted to spend it!"
    },
    glossary: [
      { term: "Fixed Expenses", definition: "Costs that stay the same every month, like your phone bill or rent." },
      { term: "Variable Expenses", definition: "Costs that change, like groceries, clothes, or eating out." },
      { term: "Pay Yourself First", definition: "Putting money into savings immediately when you get paid, instead of saving whatever is left over at the end." }
    ],
    quiz: [
      {
        question: "Under the 50/30/20 rule, which category does a ticket to a hockey game fall under?",
        options: ["Need (50%)", "Want (30%)", "Savings (20%)", "Fixed Expense"],
        correctAnswerIndex: 1,
        explanation: "A hockey game ticket is entertainment and fun, meaning it's a Want (30%). You do not need it to survive, even if you really love hockey!"
      },
      {
        question: "What does it mean to 'Pay Yourself First'?",
        options: [
          "Buy a gift for yourself as soon as you get paid",
          "Put money in savings as soon as you receive income, before spending any",
          "Pay off your credit card bills first",
          "Work extra hours to earn more money"
        ],
        correctAnswerIndex: 1,
        explanation: "Paying yourself first means automating or transferring a portion of your paycheck into savings immediately, making savings a non-negotiable priority."
      },
      {
        question: "Which of the following is a 'Need'?",
        options: ["A subscription to Spotify Premium", "Getting bubble tea after school", "A transit pass to get to work or school", "A brand new designer jacket"],
        correctAnswerIndex: 2,
        explanation: "A transit pass is a Need because it's required for you to commute to work or school, which allows you to keep earning money or get your education."
      }
    ]
  },
  {
    id: "credit-cards",
    title: "Credit & Debt Traps",
    icon: "CreditCard",
    color: "purple",
    description: "Understand APR, credit scores, and how to avoid high-interest debt.",
    sections: [
      {
        title: "What is Credit?",
        content: "Credit is borrowing money with the promise to pay it back later. A credit card is NOT free money. It is a high-interest loan. If you pay the full balance on time every month, you pay $0 in interest and build a good credit history. If you carry a balance, you enter a dangerous interest trap."
      },
      {
        title: "Understanding APR",
        content: "APR stands for Annual Percentage Rate (the interest rate). Most credit cards have an APR of 19.99% to 29.99%. That means if you borrow money and don't pay it back right away, it gets extremely expensive very quickly due to compound interest working against you."
      },
      {
        title: "The Credit Score",
        content: "A credit score is a number between 300 and 900 that tells lenders how trustworthy you are. A high credit score (750+) makes it easy to rent an apartment, get a cell phone plan, or buy a house at a low interest rate. You build it by paying bills on time and keeping your credit balance low."
      }
    ],
    realLifeExample: {
      title: "The $500 Credit Mistake",
      text: "Leo bought a $500 gaming console on his credit card. He only paid the 'minimum payment' of $15 each month. Because of the 20% interest rate, it took him over 4 years to pay off the console, and he ended up paying over $250 extra in interest! The console cost him $750 in total."
    },
    glossary: [
      { term: "APR", definition: "Annual Percentage Rate. The yearly cost of borrowing money, expressed as a percentage." },
      { term: "Credit Utilization", definition: "The percentage of your credit limit you actually use. Keeping this under 30% helps your credit score." },
      { term: "Minimum Payment", definition: "The smallest amount you must pay by the due date to avoid late fees, but interest still accumulates on the remaining balance." }
    ],
    quiz: [
      {
        question: "Is a credit card 'free money'?",
        options: [
          "Yes, the bank gives it to you for free",
          "No, it's a short-term loan you must pay back, and it charges high interest if you miss the deadline",
          "Yes, as long as you use it at approved stores",
          "No, because the government taxes every purchase by 50%"
        ],
        correctAnswerIndex: 1,
        explanation: "Credit cards are tools for borrowing. You must pay back the money, and if you don't pay in full by the due date, you will owe high interest."
      },
      {
        question: "What is a good guideline for Credit Utilization to maintain a high credit score?",
        options: [
          "Use 100% of your credit limit every month",
          "Keep your balance under 30% of your credit limit",
          "Never use the card at all",
          "Exceed your credit limit slightly every month"
        ],
        correctAnswerIndex: 1,
        explanation: "Using too much of your credit limit (over 30%) signals to lenders that you may be over-reliant on borrowed money. Keeping it under 30% is ideal."
      },
      {
        question: "If you pay only the 'Minimum Payment' on your credit card statement:",
        options: [
          "You pay no interest and your balance is clear",
          "You avoid late fees, but you will pay high interest on the remaining balance",
          "Your credit score immediately drops to 300",
          "The bank rewards you with free cash back"
        ],
        correctAnswerIndex: 2,
        explanation: "Paying the minimum prevents late fees and account defaults, but interest is charged on the leftover balance. Paying in full is the only way to avoid interest."
      }
    ]
  },
  {
    id: "investing",
    title: "Investing & Compound Interest",
    icon: "TrendingUp",
    color: "blue",
    description: "Learn about stocks, ETFs, compound interest, and accounts like TFSAs.",
    sections: [
      {
        title: "What is Investing?",
        content: "Investing is putting your money into assets (like stocks, bonds, or real estate) with the expectation that it will grow over time. Unlike saving, investing involves risk, but it also offers much higher potential returns to beat inflation."
      },
      {
        title: "Compound Interest: The Magic Multiplier",
        content: "Compound interest is earning interest on your interest. Over time, this creates a snowball effect where your money grows exponentially. Albert Einstein famously called compound interest the 'eighth wonder of the world.' The earlier you start, the more massive the snowball grows."
      },
      {
        title: "TFSAs and RESPs (Canadian Context)",
        content: "In Canada, the government offers special tax-free accounts to help you grow your money:\n\n• **TFSA (Tax-Free Savings Account)**: Available once you turn 18. Any investments (stocks, ETFs) inside this account grow 100% tax-free! You pay zero tax when you withdraw it.\n• **RESP (Registered Education Savings Plan)**: An account parents or students use to save for college/university. The government actually adds free money (CESG grant) matching 20% of your contributions, up to $500 per year!"
      }
    ],
    realLifeExample: {
      title: "The Tale of Two Savers",
      text: "Sarah starts investing $100/month at age 18. By age 58, at an 8% average annual return, she has contributed $48,000 but her account has grown to over $310,000! Ben starts investing the same $100/month but waits until age 30. By age 58, he has contributed $33,600, but his account has only grown to $135,000. Sarah's 12-year head start more than doubled her final wealth!"
    },
    glossary: [
      { term: "Stock", definition: "A tiny piece of ownership in a company. If the company does well, the stock value goes up." },
      { term: "ETF (Exchange-Traded Fund)", definition: "A basket of hundreds of different stocks bundled together. It is an easy way to diversify and reduce risk." },
      { term: "TFSA", definition: "Tax-Free Savings Account. A Canadian account where investments grow tax-free (available to Canadian residents 18+)." },
      { term: "Inflation", definition: "The general increase in prices over time, which reduces the purchasing power of your cash." }
    ],
    quiz: [
      {
        question: "Why is compound interest so powerful?",
        options: [
          "It forces the bank to pay you a flat cash bonus",
          "You earn interest on both your initial deposit AND the interest you've already earned",
          "It is guaranteed to never lose money",
          "It automatically pays off your student loans"
        ],
        correctAnswerIndex: 1,
        explanation: "Compound interest means your money multiplies because you earn returns on your previous returns. It creates exponential growth over time."
      },
      {
        question: "At what age can a Canadian resident open a Tax-Free Savings Account (TFSA)?",
        options: ["16 years old", "18 years old", "21 years old", "Any age"],
        correctAnswerIndex: 1,
        explanation: "You must be at least 18 years old (and have a valid Social Insurance Number) to open a TFSA in Canada."
      },
      {
        question: "What is an ETF (Exchange-Traded Fund)?",
        options: [
          "A risky, single stock in a startup company",
          "A basket of stocks or assets that allows you to buy many companies at once to diversify",
          "An online currency used for video games",
          "A high-interest credit card"
        ],
        correctAnswerIndex: 1,
        explanation: "An ETF bundles many stocks together, meaning you don't put all your eggs in one basket. It is a lower-risk way to invest in the stock market."
      }
    ]
  },
  {
    id: "banking",
    title: "Banking 101",
    icon: "Building",
    color: "amber",
    description: "Learn the difference between chequing and savings accounts, debit, and fees.",
    sections: [
      {
        title: "Chequing vs. Savings",
        content: "Most banks offer two main types of accounts: \n\n• **Chequing Account**: Your everyday account. Use it for paycheques, debit card purchases, and e-Transfers. It usually pays 0% interest.\n• **Savings Account**: Your storage vault. Use it to keep money you don't plan to spend immediately. It pays interest, though standard banks pay very low rates (0.05%), while High-Interest Savings Accounts (HISAs) pay 3-5%."
      },
      {
        title: "Debit Cards and Fees",
        content: "A debit card spends money directly from your chequing account. Unlike a credit card, you cannot spend money you don't have. However, watch out for fees! Some banks charge monthly fees (often waived for students), transaction limits, or ATM fees. Always look for a 'no-fee student banking' package."
      },
      {
        title: "Interac e-Transfer",
        content: "In Canada, Interac e-Transfer is the standard way to send money instantly to friends or businesses using just an email address or mobile number. Most student accounts offer free, unlimited e-Transfers."
      }
    ],
    realLifeExample: {
      title: "Beware of the ATM Fee Trap",
      text: "Noah used an ATM from a different bank to withdraw $20. He was charged a $3.00 fee by the ATM owner, plus a $2.00 fee by his own bank for using an out-of-network machine. That $20 withdrawal ended up costing him $5 in fees—a whopping 25% cost! Noah learned to stick to his own bank's ATMs or use cash-back options at grocery stores."
    },
    glossary: [
      { term: "Debit Card", definition: "A payment card that deducts money directly from a consumer's checking account when used." },
      { term: "HISA", definition: "High-Interest Savings Account. A savings account that pays a higher interest rate than a standard account, helping your money keep up with inflation." },
      { term: "Overdraft", definition: "A fee charged when you spend more money than you actually have in your chequing account." }
    ],
    quiz: [
      {
        question: "What is the main difference between a chequing account and a savings account?",
        options: [
          "Chequing is for saving; Savings is for spending",
          "Chequing is for everyday transactions (0% interest); Savings is for storing money (earns interest)",
          "Chequing accounts require you to be 18+; anyone can open a savings account",
          "Savings accounts come with a physical card; chequing accounts do not"
        ],
        correctAnswerIndex: 1,
        explanation: "Chequing accounts are transactional (no interest, debit card links), while savings accounts are meant to build interest and hold money for the future."
      },
      {
        question: "If you pull cash out of an out-of-network ATM, what usually happens?",
        options: [
          "You are rewarded with cashback",
          "Nothing, all ATMs are free",
          "You are charged transaction fees by both the ATM provider and your bank",
          "Your account is immediately frozen"
        ],
        correctAnswerIndex: 2,
        explanation: "Out-of-network ATMs usually charge an operator fee, and your own bank may charge an convenience fee, eating into your cash."
      },
      {
        question: "What is an overdraft fee?",
        options: [
          "A fee for keeping too much money in your account",
          "A penalty fee for spending more money than you have in your chequing account",
          "A tax on interest earned in a TFSA",
          "A monthly maintenance cost"
        ],
        correctAnswerIndex: 1,
        explanation: "Overdraft is a short-term bank loan when you spend below $0. Lenders charge steep flat fees (often $5 to $45) for going into overdraft."
      }
    ]
  },
  {
    id: "goals",
    title: "Goal Setting & Savings",
    icon: "Target",
    color: "red",
    description: "Learn how to build an emergency fund and set SMART savings goals.",
    sections: [
      {
        title: "Short-Term vs. Long-Term Goals",
        content: "Goals are the targets that guide your budgeting. \n\n• **Short-Term Goals (under 1 year)**: Buying a laptop, concert tickets, holiday gifts.\n• **Medium-Term Goals (1-5 years)**: Buying a used car, saving for college tuition.\n• **Long-Term Goals (5+ years)**: A down payment on a house, starting a business, or retirement."
      },
      {
        title: "The Emergency Fund",
        content: "Life happens. Your phone screen cracks, your car needs a repair, or you lose your part-time job. An emergency fund is 3 to 6 months of living expenses saved in a separate account. It prevents you from using high-interest credit cards in a crisis. For teens, starting with a $500 or $1,000 emergency fund is a huge win!"
      },
      {
        title: "SMART Savings Goals",
        content: "To actually reach your goals, make them SMART:\n\n• **S**pecific: What exactly are you saving for?\n• **M**easurable: How much does it cost?\n• **A**chievable: Is it realistic based on your income?\n• **R**elevant: Why does it matter to you?\n• **T**ime-bound: When do you need the money?"
      }
    ],
    realLifeExample: {
      title: "Chloe's Car Goal",
      text: "Chloe wants to buy a used car for $3,000 in 15 months. Instead of guessing, she makes it a SMART goal: Save $200 every month for 15 months. She sets up an automatic transfer of $100 from every bi-weekly paycheck to a dedicated savings sub-account. When the time comes, she buys the car in cash, avoiding expensive auto loans!"
    },
    glossary: [
      { term: "Emergency Fund", definition: "A cash reserve set aside specifically for unplanned expenses or financial emergencies." },
      { term: "SMART Goal", definition: "A goal that is Specific, Measurable, Achievable, Relevant, and Time-bound." },
      { term: "Sinking Fund", definition: "Saving a small amount over time for a specific future purchase (like a vacation or laptop) so you don't feel a big cash pinch all at once." }
    ],
    quiz: [
      {
        question: "What is the primary purpose of an Emergency Fund?",
        options: [
          "To save up for a new gaming console",
          "To have a cash safety net for unexpected expenses so you don't go into debt",
          "To invest in risky stocks",
          "To pay your monthly phone bill"
        ],
        correctAnswerIndex: 1,
        explanation: "Emergency funds are strictly for unplanned financial crises—like a car breakdown, medical cost, or job loss. It keeps you out of credit card debt."
      },
      {
        question: "Which of the following represents a SMART savings goal?",
        options: [
          "I want to save money for a car soon",
          "I will save $1,200 for a new laptop by putting aside $100 a month for the next 12 months",
          "I want to become a millionaire in three weeks",
          "I will save some cash under my mattress for college"
        ],
        correctAnswerIndex: 1,
        explanation: "Option 2 is Specific (laptop), Measurable ($1,200), Achievable ($100/mo), Relevant (needs laptop), and Time-bound (12 months). It follows the SMART formula."
      },
      {
        question: "For a teenager, what is a great initial target size for an emergency fund?",
        options: ["$50,000", "$0", "$500 to $1,000", "$10"],
        correctAnswerIndex: 2,
        explanation: "$500 to $1,000 is an excellent starting point for teens/students. It covers common emergencies like a broken phone, textbook costs, or basic car maintenance."
      }
    ]
  },
  {
    id: "taxes",
    title: "Taxes: Teen Edition",
    icon: "Receipt",
    color: "gray",
    description: "De-mystify paycheques, deductions, T4s, and filing taxes.",
    sections: [
      {
        title: "The Mystery of the Shrinking Paycheque",
        content: "If you get a job paying $15/hour and work 10 hours, you might expect a $150 paycheque. But when you receive it, it might only be $130. Where did the money go? Deductions! \n\nYour employer is legally required to subtract taxes (Income Tax, CPP/Canada Pension Plan, and EI/Employment Insurance) before paying you. Your **Gross Income** is what you earned; your **Net Income** is what you actually take home."
      },
      {
        title: "What is a T4 Slip? (Canada)",
        content: "In Canada, every February, your employer sends you a form called a **T4 slip**. This slip summarizes exactly how much money you made (Box 14) and how much tax was deducted during the year. You need this form to file your tax return."
      },
      {
        title: "Filing Taxes & Refunds",
        content: "Filing taxes is declaring your income to the government (CRA in Canada). Even as a teenager making a low income, you should file! Why? \n\n1. **Tax Refund**: If you earned less than the basic personal amount (around $15,000), you will get back ALL the income tax your employer deducted.\n2. **GST/HST Credit**: Once you turn 19, the government sends you free money quarterly to offset sales taxes.\n3. **RRSP Contribution Room**: Filing taxes builds space for tax-sheltered retirement savings later."
      }
    ],
    realLifeExample: {
      title: "Marcus Gets Money Back",
      text: "Marcus worked part-time at a grocery store and earned $8,000. His employer withheld $300 in income taxes throughout the year. In March, Marcus filed his taxes online (takes 15 minutes). Because he made under the tax limit, the CRA sent him a direct deposit of $300 (his tax refund)! Filing taxes literally paid him back."
    },
    glossary: [
      { term: "Gross Pay", definition: "The total amount of money you earn before any taxes or deductions are taken out." },
      { term: "Net Pay", definition: "Your actual 'take-home' pay after taxes, pension contributions, and insurance are deducted." },
      { term: "T4 Slip", definition: "A Canadian tax document issued by employers showing employment income and deductions for the calendar year." },
      { term: "CRA", definition: "Canada Revenue Agency. The government department responsible for collecting taxes." }
    ],
    quiz: [
      {
        question: "What is 'Gross Pay'?",
        options: [
          "The amount of cash you take home in your pocket",
          "The money you earn before taxes and deductions are taken out",
          "The taxes you pay when buying food",
          "A penalty fee for paying taxes late"
        ],
        correctAnswerIndex: 1,
        explanation: "Gross Pay is the raw total you earned based on hours worked, before deductions are subtracted. Net Pay is the actual amount written on your paycheck."
      },
      {
        question: "Why should a teenager file a tax return even if they earned a very low income?",
        options: [
          "They are guaranteed to be audited by the government",
          "To get back any income tax deducted by their employer (refund) and build future benefits",
          "To pay a mandatory fee to the bank",
          "Taxes are automatically filed, so teenagers don't need to do anything"
        ],
        correctAnswerIndex: 1,
        explanation: "Filing a tax return lets the government know you made a low income, meaning you get refunded any tax deductions and unlock future credits like the GST credit."
      },
      {
        question: "What is a T4 Slip?",
        options: [
          "A receipt from a grocery store",
          "An application for a credit card",
          "A Canadian tax form from your employer summarizing your yearly earnings and tax deductions",
          "A student transit card"
        ],
        correctAnswerIndex: 2,
        explanation: "A T4 is the official year-end summary of employment earnings and deductions. Employers send it in February, and you use it to fill out your tax return."
      }
    ]
  }
];
