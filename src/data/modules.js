export const modules = [
  {
    id: "budgeting",
    title: "Budgeting Basics",
    icon: "PieChart",
    color: "green",
    description: "Master the 50/30/20 rule, track spending, and learn needs vs. wants.",
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
    id: "goals",
    title: "Saving & Emergency Funds",
    icon: "Target",
    color: "red",
    description: "Learn how to build an emergency fund, sinking funds, and set SMART savings goals.",
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
    id: "credit-cards",
    title: "Credit Cards",
    icon: "CreditCard",
    color: "purple",
    description: "Understand APR, credit card mechanics, billing cycles, and how to avoid traps.",
    sections: [
      {
        title: "What is a Credit Card?",
        content: "A credit card is a tool that allows you to borrow money from a bank up to a certain limit to make purchases. It is NOT free money. It is a loan that must be repaid. If you pay off your balance in full by the monthly due date, you pay $0 in interest. If you carry a balance, you get charged very high interest."
      },
      {
        title: "Understanding APR & Interest",
        content: "Most credit cards carry an interest rate (APR) between 19.99% and 29.99%. Interest is calculated daily on the unpaid balance. If you only pay the minimum payment on your statement, you are trapped paying interest for years on purchases you made today."
      },
      {
        title: "The Grace Period & Billing Cycle",
        content: "A billing cycle lasts about 30 days. At the end, you receive a statement showing all purchases. You are given a Grace Period (usually 21 days) to pay the balance. If you pay the full amount before the grace period ends, you pay absolutely no interest."
      }
    ],
    realLifeExample: {
      title: "Leo's Credit Mistake",
      text: "Leo bought a $500 gaming console on his credit card. He only paid the 'minimum payment' of $15 each month. Because of the 20% interest rate, it took him over 4 years to pay off the console, and he ended up paying over $250 extra in interest! The console cost him $750 in total."
    },
    glossary: [
      { term: "APR", definition: "Annual Percentage Rate. The yearly cost of borrowing money, expressed as a percentage." },
      { term: "Grace Period", definition: "A period (usually 21 days) after a billing cycle ends where no interest is charged if the statement balance is paid in full." },
      { term: "Minimum Payment", definition: "The smallest amount you must pay by the due date to avoid late fees, though interest still accumulates on the remaining balance." }
    ],
    quiz: [
      {
        question: "How can you avoid paying interest on a credit card?",
        options: [
          "Pay only the minimum payment each month",
          "Pay the full statement balance on or before the due date",
          "Use the card only for groceries",
          "Report the card as lost every month"
        ],
        correctAnswerIndex: 1,
        explanation: "Paying the full statement balance before the grace period ends clears your balance, meaning no interest charges are applied."
      },
      {
        question: "What is a typical APR on standard credit cards?",
        options: ["1% to 2%", "5% to 8%", "19.99% to 29.99%", "50% to 75%"],
        correctAnswerIndex: 2,
        explanation: "Most credit cards carry a high APR, typically around 19.99% to 29.99%."
      },
      {
        question: "If you carry a balance from month to month:",
        options: [
          "Interest is charged only on the new purchases",
          "You are charged daily interest on the unpaid balance",
          "The bank waves your interest if you are under 21",
          "Your credit score automatically goes up"
        ],
        correctAnswerIndex: 1,
        explanation: "Carrying a balance means the grace period is lost, and interest is calculated daily on the outstanding amount."
      }
    ]
  },
  {
    id: "credit-scores",
    title: "Credit Scores",
    icon: "Award",
    color: "pink",
    description: "Learn what affects credit scores, how they are calculated, and how to build one.",
    sections: [
      {
        title: "What is a Credit Score?",
        content: "A credit score is a number between 300 and 900 that represents your financial reliability. Lenders look at this score to decide if they should lend you money, approve you for an apartment, or give you a cell phone plan. Higher scores mean you are trustworthy, which unlocks lower interest rates."
      },
      {
        title: "How is it Calculated?",
        content: "Your credit score is calculated using five key factors:\n\n• **Payment History (35%)**: Do you pay your bills on time? Even one missed payment drops your score.\n• **Credit Utilization (30%)**: How much of your credit limit do you use? Keep this under 30%.\n• **Length of Credit History (15%)**: How long have your accounts been open?\n• **New Credit (10%)**: Have you applied for many loans recently?\n• **Credit Mix (10%)**: Do you have different types of credit (loans, cards)?"
      },
      {
        title: "How to Build a Credit Score",
        content: "As a teenager or young adult, you can start building credit by getting a secured credit card or student credit card when you turn 18. Pay your phone bill on time, buy small things, and pay the statement in full every month. Never let a bill go to collections!"
      }
    ],
    realLifeExample: {
      title: "Jordan's Apartment Application",
      text: "Jordan (19) and Sam (19) both applied for the same rental apartment. Jordan paid their cell phone bill and student credit card on time, achieving a credit score of 760. Sam frequently paid bills late, resulting in a score of 580. The landlord chose Jordan immediately because Jordan's score proved they were financially responsible."
    },
    glossary: [
      { term: "Credit Bureau", definition: "An agency (like Equifax or TransUnion in Canada) that tracks credit histories and calculates scores." },
      { term: "Credit Utilization Ratio", definition: "Your outstanding credit balance divided by your total credit limit, expressed as a percentage." },
      { term: "Secured Credit Card", definition: "A credit card that requires a security deposit, which acts as your credit limit. Great for beginners with no credit history." }
    ],
    quiz: [
      {
        question: "Which factor has the largest impact on your credit score?",
        options: [
          "The number of bank accounts you have",
          "Your income level",
          "Your payment history (paying bills on time)",
          "The types of stores you shop at"
        ],
        correctAnswerIndex: 2,
        explanation: "Payment history accounts for 35% of your total credit score. Paying bills on time is the single most important habit."
      },
      {
        question: "What is the recommended limit for credit card utilization?",
        options: ["Under 10% only", "Under 30%", "Under 75%", "Always use 100%"],
        correctAnswerIndex: 1,
        explanation: "Lenders look favorably on utilizing less than 30% of your total credit limit. Higher utilization suggests financial stress."
      },
      {
        question: "Which of the following can damage your credit score?",
        options: [
          "Checking your own credit score",
          "Paying a bill 3 days before it is due",
          "Letting an unpaid phone bill go to a collection agency",
          "Keeping a credit card open without using it"
        ],
        correctAnswerIndex: 2,
        explanation: "Unpaid accounts sent to collections are severe negative flags that stay on your credit report for 6 years, heavily lowering your score."
      }
    ]
  },
  {
    id: "banking",
    title: "Banking 101",
    icon: "Building",
    color: "amber",
    description: "Learn about chequing vs. savings accounts, HISA, debit, fees, and e-Transfers.",
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
        explanation: "Out-of-network ATMs usually charge an operator fee, and your own bank may charge a convenience fee, eating into your cash."
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
    id: "taxes",
    title: "First Paycheque & Taxes",
    icon: "Receipt",
    color: "gray",
    description: "Demystify paycheques, deductions, T4 forms, gross vs. net pay, and tax filing.",
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
      { term: "T4 Slip", definition: "A Canadian tax document issued by employers showing employment income and deductions for the calendar year." }
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
  },
  {
    id: "investing",
    title: "Investing Basics",
    icon: "TrendingUp",
    color: "blue",
    description: "Learn about stocks, bonds, inflation, compound interest, and TFSAs/RESPs.",
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
      text: "Sarah starts investing $100/month at age 18. By age 58, at an 8% average annual return, she has contributed $48,000 but her account has grown to over $310,000! Ben starts investing the same $100/month but waits until age 30. By age 58, he has contributed $33,600, but his account has only grown to $135,000. Sarah's 12-year head start more than doubled her wealth!"
    },
    glossary: [
      { term: "Stock", definition: "A tiny piece of ownership in a company. If the company does well, the stock value goes up." },
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
    id: "etfs-stocks",
    title: "ETFs, Stocks & Risk",
    icon: "BarChart2",
    color: "teal",
    description: "Deep dive into stocks vs. ETFs, asset diversification, and managing market risk.",
    sections: [
      {
        title: "Stocks: Ownership in a Single Company",
        content: "When you buy a stock (or share) in a company like Apple or Tesla, you literally own a tiny piece of that business. If the company grows and makes profit, your stock value goes up. If the company fails, your stock value can go to zero. Stocks have high return potential but carry high individual risk."
      },
      {
        title: "ETFs: Instant Diversification",
        content: "An Exchange-Traded Fund (ETF) is like a shopping basket filled with hundreds of different stocks. Instead of buying just Apple stock, you can buy an index ETF (like one tracking the S&P 500) which contains Apple, Microsoft, Amazon, and 497 other companies. If one company in the basket fails, your overall investment barely feels it."
      },
      {
        title: "Understanding Investment Risk & Reward",
        content: "In finance, risk and reward go hand-in-hand. Savings accounts are low-risk but offer low returns. Stocks are high-risk but offer higher returns over time. **Diversification** (not putting all your eggs in one basket) is the primary tool investors use to reduce risk while keeping good returns."
      }
    ],
    realLifeExample: {
      title: "Liam's Stock vs. Sophia's ETF",
      text: "Liam invested $1,000 entirely in a single trendy tech company stock. Sophia invested $1,000 in a broad market index ETF. Six months later, the tech company experienced a major scandal, and its stock crashed 60%, leaving Liam with only $400. Sophia's ETF dipped by only 2% because the other 499 companies in her basket performed steadily. Sophia learned that diversification protects your hard-earned cash."
    },
    glossary: [
      { term: "Diversification", definition: "Spreading your investments across various assets, industries, and regions to reduce overall risk." },
      { term: "S&P 500", definition: "A stock market index tracking the performance of 500 of the largest companies listed on stock exchanges in the United States." },
      { term: "Dividends", definition: "A portion of a company's earnings distributed directly to its shareholders, usually paid quarterly." }
    ],
    quiz: [
      {
        question: "What is the primary benefit of buying an ETF over a single stock?",
        options: [
          "ETFs have guaranteed returns",
          "ETFs provide instant diversification, reducing the risk of a single company crash",
          "ETFs are completely free to buy and hold",
          "ETFs pay off your credit card debt automatically"
        ],
        correctAnswerIndex: 1,
        explanation: "An ETF bundles hundreds of companies together. If one fails, the impact is minimal. It provides instant diversification."
      },
      {
        question: "If you have high risk tolerance and a long time horizon, which asset class is most suitable?",
        options: ["Physical cash under a mattress", "A standard chequing account", "A diversified portfolio of stocks/ETFs", "A 1-month term savings certificate"],
        correctAnswerIndex: 2,
        explanation: "Stocks and equity ETFs are volatile in the short term, but historically offer the highest returns over long periods (10+ years), making them suitable for long horizons."
      },
      {
        question: "What does 'putting all your eggs in one basket' refer to in investing?",
        options: [
          "Buying stocks from multiple sectors",
          "Filing taxes late",
          "Investing all your money in a single stock or company",
          "Opening both a chequing and savings account"
        ],
        correctAnswerIndex: 2,
        explanation: "This refers to a lack of diversification. If that single company goes bankrupt, you lose 100% of your investment."
      }
    ]
  },
  {
    id: "student-money",
    title: "Student Money",
    icon: "GraduationCap",
    color: "indigo",
    description: "Navigate RESPs, tuition, scholarships, grants, and smart campus budgeting.",
    sections: [
      {
        title: "Budgeting on Campus",
        content: "For many, college or university is the first time living independently. Student budgeting is unique because income often comes in large lump sums (loans, grants, or parent support) at the start of a semester. The secret is dividing this lump sum by the number of months in the semester to find your monthly spending limit."
      },
      {
        title: "Free Money: Scholarships and Grants",
        content: "Before taking student loans, search for free money:\n\n• **Scholarships**: Awarded based on grades, community service, sports, or unique backgrounds. You don't have to be a straight-A student; thousands of niche scholarships go unapplied for!\n• **Grants/Bursaries**: Awarded by governments or schools based on financial need. This is free cash you never have to pay back."
      },
      {
        title: "Student Loans & Student Credit",
        content: "If you must borrow, government student loans (like OSAP in Ontario) are much better than bank loans because they have low or 0% interest while you study, and flexible repayment terms. Beware of student credit card offers on campus—always pay them off in full!"
      }
    ],
    realLifeExample: {
      title: "Emily's Grant Discovery",
      text: "Emily needed $8,000 for her tuition. She assumed she had to take a private bank loan. Her school advisor suggested she file a financial aid application. Because of her family's income status, she qualified for a $3,500 government grant and a $4,500 interest-free student loan. She saved thousands in bank interest rates simply by applying for financial aid."
    },
    glossary: [
      { term: "Grant", definition: "A sum of money given by a government or organization for a specific purpose (like study) that does not need to be repaid." },
      { term: "Bursary", definition: "A monetary award given to a student based primarily on financial need rather than academic merit." },
      { term: "Grace Period (Student)", definition: "A period (usually 6 months after graduation) before you must start making principal payments on student loans." }
    ],
    quiz: [
      {
        question: "What is the main advantage of government student loans over private bank loans?",
        options: [
          "Private bank loans are interest-free",
          "Government loans often charge no interest while you are studying and offer flexible income-based repayment plans",
          "Government loans do not need to be repaid",
          "Private loans give you free retail points"
        ],
        correctAnswerIndex: 1,
        explanation: "Government loans are heavily subsidized, charging 0% interest during studies, and offer repayment relief if you have low income after graduation."
      },
      {
        question: "Which of the following is considered 'free money' for education?",
        options: ["A student line of credit", "A student credit card", "Government grants and scholarships", "A peer-to-peer bank loan"],
        correctAnswerIndex: 2,
        explanation: "Grants and scholarships are financial awards that do not require repayment. Private and government loans must be paid back."
      },
      {
        question: "How should a student budget a semester lump-sum grant?",
        options: [
          "Spend it all in the first week on textbooks and tech",
          "Keep it in a checking account and spend until it runs out",
          "Divide the total amount by the number of months in the semester to set a monthly allowance",
          "Invest it in high-risk stocks immediately"
        ],
        correctAnswerIndex: 2,
        explanation: "Pacing your lump-sum funds monthly prevents you from running out of cash for food or rent in the final weeks of the school term."
      }
    ]
  },
  {
    id: "loans-debt",
    title: "Loans & Debt",
    icon: "DollarSign",
    color: "red",
    description: "Understand interest rates, debt snowball vs. avalanche, and how to pay off debt.",
    sections: [
      {
        title: "How Loans Work",
        content: "A loan is money you borrow that you must pay back over time, plus interest. The **Principal** is the amount you borrowed; the **Interest** is the fee the lender charges you. Borrowing is essentially spending your future income today, which means you will have less money to spend tomorrow."
      },
      {
        title: "The Good, the Bad, and the Ugly Debt",
        content: "Not all debt is equal:\n\n• **Good Debt**: Low-interest loans that help increase your future value, like a student loan or a mortgage for a house.\n• **Bad Debt**: High-interest loans for things that lose value quickly, like a car loan or retail financing.\n• **Ugly Debt**: High-interest credit card balances or payday loans (with 300%+ APR) that drain your cash flow."
      },
      {
        title: "Strategies for Paying Off Debt",
        content: "If you have multiple debts, two popular repayment methods are:\n\n• **Debt Snowball**: Pay off the smallest balance first. This builds psychological momentum as you check off accounts.\n• **Debt Avalanche**: Pay off the debt with the highest interest rate first. This mathematically saves you the most money in interest."
      }
    ],
    realLifeExample: {
      title: "Tyler's Avalanche Win",
      text: "Tyler had $2,000 on a credit card at 20% interest and a $3,000 student loan at 4% interest. He had $200 extra per month to pay them off. By using the Debt Avalanche method, he focused all extra payments on the 20% credit card first while paying the minimum on the student loan. He paid off the credit card in 11 months, saving over $400 in interest!"
    },
    glossary: [
      { term: "Principal", definition: "The original sum of money lent or invested, separate from interest." },
      { term: "Amortization", definition: "The process of spreading out a loan into a series of equal monthly payments over a set time." },
      { term: "Payday Loan", definition: "A short-term, high-interest loan (often 300-500% APR) designed to be repaid on the borrower's next payday. A major debt trap." }
    ],
    quiz: [
      {
        question: "What is the difference between the Debt Snowball and Debt Avalanche methods?",
        options: [
          "Snowball focuses on highest interest; Avalanche focuses on smallest balance",
          "Snowball focuses on smallest balance; Avalanche focuses on highest interest rate",
          "Snowball is for government loans; Avalanche is for credit cards",
          "There is no difference"
        ],
        correctAnswerIndex: 1,
        explanation: "Snowball builds momentum by targeting the smallest balance first. Avalanche minimizes cost by targeting the highest interest rate first."
      },
      {
        question: "Which of the following is generally considered 'bad' or 'ugly' debt?",
        options: [
          "A low-interest government student loan",
          "A mortgage to buy a family home",
          "A 22% interest store credit card balance",
          "An interest-free business startup loan"
        ],
        correctAnswerIndex: 2,
        explanation: "Credit card debt at 22% is extremely expensive and drains your monthly cash flow, making it bad/ugly debt."
      },
      {
        question: "What is a loan's 'Principal'?",
        options: [
          "The interest rate fee charged by the bank",
          "The duration of the repayment timeline",
          "The original amount of money borrowed before interest is added",
          "The bank manager who signs the loan"
        ],
        correctAnswerIndex: 2,
        explanation: "The principal is the starting amount of debt you borrow. Interest is added on top of this principal."
      }
    ]
  },
  {
    id: "scams",
    title: "Avoiding Scams",
    icon: "ShieldAlert",
    color: "red",
    description: "Identify phishing, job scams, Ponzi schemes, crypto fraud, and protect your identity.",
    sections: [
      {
        title: "If It Sounds Too Good to Be True...",
        content: "Scammers target teenagers because they are new to managing money and want to make cash quickly. The golden rule of personal finance is: **There is no such thing as guaranteed high returns with zero risk.** If an app, influencer, or friend promises you can double your money in a week, it is a scam."
      },
      {
        title: "Common Financial Scams",
        content: "Watch out for these common traps:\n\n• **Fake Job Scams**: A company hires you online and sends you a cheque. They tell you to deposit it and transfer a portion to a supplier. A week later, the check bounces (proves fake), and you are out thousands of dollars of your own money!\n• **Phishing**: Fake emails or text messages pretending to be your bank or the CRA, telling you to click a link and input your password or Social Insurance Number (SIN).\n• **Crypto/Forex Scams**: Influencers hyping up unregulated coins or trading bots that yield 'guaranteed' returns."
      },
      {
        title: "Protecting Your Personal Data",
        content: "Your Social Insurance Number (SIN) and bank passwords are keys to your financial identity. Never share your SIN on job applications before you are hired, never text photos of your ID, and always use two-factor authentication (2FA) on your bank and email accounts."
      }
    ],
    realLifeExample: {
      title: "Olivia's Fake Job Trap",
      text: "Olivia was 'hired' as a remote personal assistant. Her boss sent her a digital cheque for $2,000 and asked her to deposit it, buy $1,500 in Apple gift cards, and email the codes to a client, keeping $500 as her pay. She did. Three days later, her bank notified her the cheque was counterfeit, took $2,000 out of her account, and froze her debit card. She lost $1,500 of her own savings."
    },
    glossary: [
      { term: "Counterfeit Cheque Scam", definition: "A scam where a victim is given a fake cheque, asked to cash it, and send a portion of the funds elsewhere before the bank discovers the cheque is fake." },
      { term: "Phishing", definition: "The fraudulent practice of sending emails or text messages purporting to be from reputable companies to induce individuals to reveal personal information." },
      { term: "SIN", definition: "Social Insurance Number. A confidential 9-digit number in Canada used for government programs and employment. Protect it carefully." }
    ],
    quiz: [
      {
        question: "A company hires you online and sends you a $1,000 cheque, asking you to transfer $800 to a vendor. What should you do?",
        options: [
          "Deposit it immediately and transfer the money to get it over with",
          "Wait 1 day and then send the money",
          "Do not deposit it, report it as a scam. Valid employers never send cheques and ask you to transfer funds",
          "Send the money first from your savings, then deposit the cheque"
        ],
        correctAnswerIndex: 2,
        explanation: "This is a classic fake cheque scam. Real employers pay you for work; they never send you money and ask you to distribute it to third parties."
      },
      {
        question: "An SMS text message says your bank account is locked and includes a link to log in. What should you do?",
        options: [
          "Click the link and enter your bank password to unlock it",
          "Ignore and delete the text. Banks never send links via text to log into your account",
          "Call the number that texted you and give them your debit card PIN",
          "Forward the text to all your friends"
        ],
        correctAnswerIndex: 1,
        explanation: "This is a phishing attempt. Always access your bank by typing the official website address directly or using their official mobile app."
      },
      {
        question: "Who should you share your Social Insurance Number (SIN) with?",
        options: [
          "An online job recruiter before you have had an interview",
          "A friend who wants to help you file taxes",
          "A verified employer after you have officially accepted a job offer",
          "Anyone who requests it via email"
        ],
        correctAnswerIndex: 2,
        explanation: "Your SIN is confidential. Only share it with verified employers after you are officially hired, your bank, or government agencies (like the CRA)."
      }
    ]
  },
  {
    id: "financial-independence",
    title: "Financial Independence Basics",
    icon: "Unlock",
    color: "green",
    description: "Understand the FIRE concept, inflation, side-hustles, and building long-term wealth.",
    sections: [
      {
        title: "What is Financial Independence?",
        content: "Financial Independence means having enough personal wealth that you do not need to work a job to pay for your living expenses. Your investments generate enough income (through interest, dividends, or growth) to cover your lifestyle. This gives you ultimate freedom over your time."
      },
      {
        title: "The FIRE Movement",
        content: "FIRE stands for **Financial Independence, Retire Early**. The concept is simple: live below your means, save a high percentage of your income (30-50%), and invest it in low-cost diversified funds. Once your investment portfolio reaches **25 times your annual expenses**, you hit your 'financial independence number' and can theoretically retire!"
      },
      {
        title: "The Power of Side Hustles",
        content: "For young adults, a side hustle is a powerful way to accelerate financial independence. It uses your unique skills (coding, editing, tutoring, baking, selling crafts) to generate extra cash flows. If you invest 100% of your side hustle income, you allow compound interest to multiply your wealth exponentially."
      }
    ],
    realLifeExample: {
      title: "Derek's Early FI Journey",
      text: "Derek (20) decided to start a side-hustle building local websites, earning $500 extra a month. Instead of spending it on clothes, he invested all $500 monthly into an index ETF. By age 30, at a 7% average return, his side hustle investments had grown to over $85,000! By starting early, he bought himself massive freedom in his twenties."
    },
    glossary: [
      { term: "FIRE", definition: "Financial Independence, Retire Early. A lifestyle movement focused on extreme savings and investing to retire decades early." },
      { term: "FI Number", definition: "The total portfolio value needed to be financially independent, historically calculated as 25 times your annual expenses." },
      { term: "Passive Income", definition: "Money earned regularly with little to no active effort, such as investment dividends, rental income, or interest." }
    ],
    quiz: [
      {
        question: "What does 'Financial Independence' mean?",
        options: [
          "Having a high-paying job that you love",
          "Your investments generate enough income to cover your living expenses so you don't have to work",
          "Being able to spend whatever you want on credit cards",
          "Having a bank account with no monthly fees"
        ],
        correctAnswerIndex: 1,
        explanation: "Financial independence is when your assets/investments generate enough cash flow to cover your expenses, making active work optional."
      },
      {
        question: "How is your 'Financial Independence Number' (FI Number) traditionally calculated?",
        options: [
          "10 times your monthly gross pay",
          "25 times your annual living expenses",
          "A flat $10,000,000 target",
          "Your credit score multiplied by 100"
        ],
        correctAnswerIndex: 1,
        explanation: "Based on the 4% rule, if you accumulate 25 times your yearly expenses in investments, you can safely withdraw 4% annually to live off your portfolio."
      },
      {
        question: "What is 'Passive Income'?",
        options: [
          "Income you earn from working overtime",
          "Money you receive from selling old clothes",
          "Money earned regularly with minimal active effort (such as dividends or interest)",
          "An allowance from your parents"
        ],
        correctAnswerIndex: 2,
        explanation: "Passive income is cash flow generated by assets you own (investments, intellectual property) that pays you regularly without requiring active hourly work."
      }
    ]
  }
];
