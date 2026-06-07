export const scenarios = [
  {
    id: "first-paycheque",
    title: "Your First Paycheque",
    time: "2 min",
    difficulty: "Easy",
    intro: "You just got your first paycheque from your new job: $400! You've been eyeing a new set of headphones that costs $350. What do you do first?",
    choices: [
      {
        text: "Buy the headphones immediately. You earned it!",
        consequence: "You buy the headphones! You feel great for a day, but then you realize your monthly phone bill ($55) is due tomorrow and you only have $50 left in your account. You have to ask your parents for a loan, which feels awkward.",
        lesson: "Always pay yourself first (save at least 10-20%) and cover your fixed needs (bills, transit) before spending on big wants.",
        xpReward: 10
      },
      {
        text: "Set aside $80 (20%) for savings, pay your $55 phone bill, and put the remaining $265 toward a headphones fund.",
        consequence: "You pay your bill, put $80 in your savings vault, and see that you are already 75% of the way to buying the headphones in cash next month. You feel in control and stress-free!",
        lesson: "Using the 'Pay Yourself First' model protects you from cash crunches and helps you buy what you want guilt-free.",
        xpReward: 25
      },
      {
        text: "Put the entire $400 into savings. No fun allowed!",
        consequence: "Your savings account looks healthy, but you feel extremely deprived and frustrated. Two weeks later, you get fed up and go on an impulsive $300 shopping spree, wiping out most of your effort.",
        lesson: "Extreme budgeting usually backfires. It's important to leave room for fun (the 30% wants category) so your savings plan is sustainable.",
        xpReward: 15
      }
    ]
  },
  {
    id: "store-credit-card",
    title: "Store Card Temptation",
    time: "3 min",
    difficulty: "Medium",
    intro: "You are checking out at a clothing store and the cashier says: 'Sign up for our store credit card today and get 15% off your $200 purchase right now!' The card has a 29% APR. What do you do?",
    choices: [
      {
        text: "Sign up, get the 15% discount, and plan to carry the balance.",
        consequence: "You save $30 today. But you forget to pay off the card immediately. Because of the astronomical 29% APR, within 6 months, interest fees have added $45 to your debt. You've lost all your savings and more!",
        lesson: "Store credit cards are notorious for very high interest rates (29%+). Carrying a balance on them is a major debt trap.",
        xpReward: 10
      },
      {
        text: "Politely decline. A card with a 29% APR is too risky.",
        consequence: "You pay full price ($200) today, but you sleep easily knowing you haven't opened a high-interest credit account that could hurt your credit score or trap you in debt.",
        lesson: "While passing on a discount hurts, avoiding store credit cards with 29% interest rates is generally the safest financial move.",
        xpReward: 20
      },
      {
        text: "Sign up, get the 15% off, and immediately pay off the entire $170 balance in full from your phone banking app.",
        consequence: "You successfully save $30! Since you paid the balance in full before the grace period ended, you pay $0 in interest, and you've started building a positive credit history.",
        lesson: "A credit card can be used to your advantage, but ONLY if you pay the balance in full every single month to avoid high-interest charges.",
        xpReward: 30
      }
    ]
  },
  {
    id: "split-dinner",
    title: "The $80 Split Dinner",
    time: "2 min",
    difficulty: "Easy",
    intro: "Your friends invite you to a premium restaurant. You order a $15 burger. At the end of the night, one friend says: 'Let's just split the bill equally! It's $80 each.' You only budgeted $30 for tonight. What do you do?",
    choices: [
      {
        text: "Go along with it and pay the $80, even if it wipes out your transit money for next week.",
        consequence: "You pay the $80 to avoid social awkwardness. Next week, you can't afford bus fare and have to walk 45 minutes to your job in the rain.",
        lesson: "Peer pressure can easily derail your budget. Staying quiet is costly. True friends will understand if you speak up.",
        xpReward: 10
      },
      {
        text: "Speak up politely: 'Hey guys, I only got a burger and a water, so I'd prefer to just pay for my own share ($15 + tip).' ",
        consequence: "Your friends say, 'Oh, totally, no worries!' You put down $20 (including tip). You stay within your budget, and you still have a fun night out with your friends.",
        lesson: "Speaking up about money can feel uncomfortable, but doing so respectfully is essential to protect your financial boundaries.",
        xpReward: 25
      }
    ]
  },
  {
    id: "investment-app",
    title: "The $500 Investment App",
    time: "3 min",
    difficulty: "Hard",
    intro: "You see a TikTok influencer hyping up a new, unregulated app where you deposit $500 and 'guarantee' a 50% return in one week. You have $600 in total savings. What do you do?",
    choices: [
      {
        text: "Deposit $500. You want to make money fast!",
        consequence: "You deposit the cash. A week later, the app is shut down by regulators, and your $500 is gone forever. You realize it was a classic Ponzi scheme.",
        lesson: "There is no such thing as a guaranteed high return. If an investment sounds too good to be true, it is almost certainly a scam.",
        xpReward: 5
      },
      {
        text: "Ignore the app and put your money into a low-cost, diversified index fund/ETF inside a TFSA.",
        consequence: "Your money doesn't double in a week, but it grows steadily at an average of 7-9% a year. Over time, thanks to compound interest, it turns into a significant fund tax-free.",
        lesson: "Wealth is built slowly. Patient investing in broad, regulated market funds (like ETFs) is the safest way to grow money over time.",
        xpReward: 25
      },
      {
        text: "Keep the cash in your chequing account because investing is too scary.",
        consequence: "Your $500 is safe from market drops, but inflation slowly eats away at it. Over the years, your $500 buys fewer and fewer groceries.",
        lesson: "Keeping cash in a non-interest chequing account is safe in the short term, but it loses buying power over time due to inflation. To grow wealth, you need to invest or use high-yield accounts.",
        xpReward: 15
      }
    ]
  },
  {
    id: "concert-tickets",
    title: "Concert vs. Transit",
    time: "2 min",
    difficulty: "Medium",
    intro: "Your favourite artist announces a surprise show! Tickets are $150. Your monthly rent share ($200) and bus pass ($80) are due in 3 days, and you only have $220 in your account. What do you do?",
    choices: [
      {
        text: "Buy the ticket now. Concerts are once-in-a-lifetime experiences!",
        consequence: "You buy the ticket. You have $70 left. You can't pay your full rent, which upsets your roommate, and you can't afford your transit pass. You end up having to walk and pay late fees.",
        lesson: "Needs (rent, transit) must always take priority over wants (concerts). Failing to pay essential bills leads to penalties and damages your relationships.",
        xpReward: 10
      },
      {
        text: "Skip the concert. Pay your rent and bus pass.",
        consequence: "You feel sad about missing the show, but you pay your rent and transit on time. You stay on good terms with your roommate, can commute to work, and decide to start a 'concert sinking fund' so you are ready next time.",
        lesson: "Delayed gratification is hard but necessary. Setting up a dedicated savings bucket ('sinking fund') for future events prevents budget crises.",
        xpReward: 25
      }
    ]
  },
  {
    id: "cash-income",
    title: "Under-the-Table Cash",
    time: "2 min",
    difficulty: "Easy",
    intro: "You spend the weekend helping your neighbor paint their fence and they hand you $150 in paper bills. Since it's physical cash and not in your bank account, how do you handle it?",
    choices: [
      {
        text: "Keep it in your pocket. Cash doesn't count, so you spend it on takeout and snacks over the next week.",
        consequence: "The $150 disappears in small purchases that you don't even remember. You have nothing to show for your hard work painting that fence.",
        lesson: "Physical cash is the easiest money to waste because it feels invisible. If you don't track it, it vanishes.",
        xpReward: 10
      },
      {
        text: "Deposit the cash at your bank's ATM, log it in your budgeting app, and put 20% into your savings goal.",
        consequence: "Your cash is safely digitised, tracked, and $30 is added to your computer fund. You feel the satisfaction of seeing your hard work translate into actual savings goals.",
        lesson: "Treat cash income exactly like a digital paycheque. Deposit it, track it, and save a portion of it.",
        xpReward: 25
      }
    ]
  }
];
