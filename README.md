# Finlit 🇨🇦 — Your Personal Financial Coach

**Learn it. Budget it. Own it.**

Finlit is a modern financial literacy and money management web app built for teenagers, students, and young adults navigating their first jobs, first paycheques, and first real financial decisions.

It combines interactive lessons, personalized learning paths, budgeting tools, savings goals, spending tracking, financial simulators, gamification, and an AI-powered money coach into one clean daily-use dashboard.

🌐 **Live Demo:** https://fin-lit-your-personal-financial-coa.vercel.app/

---

## ✨ Project Overview

Many young people start earning money before they fully understand how to manage it. Finlit was built to make financial literacy feel practical, visual, and engaging instead of overwhelming or textbook-like.

The app helps users learn how to:

- Budget their income
- Track spending
- Save toward goals
- Understand their first paycheque
- Learn credit card basics
- Build financial confidence
- Explore investing concepts safely
- Understand Canadian/North American financial terms like TFSA, RESP, RRSP, T4, CPP, and EI

Finlit is designed to feel like a mix of:

- Duolingo-style learning
- A budgeting dashboard
- A savings goal tracker
- A financial simulator
- A friendly AI money coach

> [!WARNING]
> **Educational Disclaimer:** Finlit is for financial education purposes only. It does not provide professional financial, investment, legal, or tax advice. For serious financial decisions, users should speak with a trusted adult or qualified professional.

---

## 🚀 Key Features

### 🎯 Personalized Money Profile Quiz

Finlit includes a detailed 20-question onboarding quiz covering the user’s current situation, income, goals, habits, confidence level, and financial knowledge.

The quiz generates a personalized money profile such as:

- Money Newbie
- Budget Starter
- Goal Builder
- Credit Curious
- Future Investor
- Paycheque Planner
- Smart Saver
- Money Master in Training

Each profile includes recommended learning paths, first goals, risk areas, daily habits, and personalized AI coach prompts.

---

### 📊 Daily Financial Dashboard

The dashboard gives users a quick snapshot of their financial progress, including:

- Money profile
- Financial Health Score
- XP and level
- Daily streak
- Priority savings goal
- Monthly cash flow summary
- Recent transactions
- Recommended next lesson
- Reminders and weekly challenges

---

### 📚 Interactive Learning Modules

Finlit includes 12 teen-friendly learning modules written in plain English:

1. Budgeting Basics
2. Saving & Emergency Funds
3. Credit Cards
4. Credit Scores
5. Banking 101
6. First Paycheque & Taxes
7. Investing Basics
8. ETFs, Stocks & Risk
9. Student Money
10. Loans & Debt
11. Avoiding Scams
12. Financial Independence Basics

Each module includes short lessons, real-life examples, glossary terms, quizzes, XP rewards, progress tracking, and difficulty levels.

---

### 💰 Budgeting & Spending Tools

Finlit helps users manage money day to day with:

- 50/30/20 Budget Builder
- Spending tracker
- Income and expense logs
- Category breakdown charts
- Monthly cash flow summaries
- High-spending alerts
- Recent transaction history

---

### 🎯 Savings Goals Manager

Users can create and track savings goals with:

- Goal name
- Target amount
- Current saved amount
- Target date
- Priority level
- Category
- Monthly savings recommendation
- Progress percentage
- Completion status

Example goals include saving for a car, school, emergency fund, travel, technology, investing, or personal purchases.

---

### 🧮 Financial Simulators

Finlit includes several interactive tools that make finance easier to understand:

- **Budget Builder** — shows a live 50/30/20 income breakdown
- **What-If Growth Calculator** — projects compound growth over time
- **Credit Score Simulator** — shows how actions can affect credit score
- **First Paycheque Simulator** — estimates gross pay, deductions, CPP, EI, and take-home pay
- **Subscription Audit** — shows how recurring costs add up
- **Emergency Fund Calculator** — builds a savings target for essentials
- **Debt Payoff Planner** — compares payoff strategies and extra payments

All calculations are educational estimates.

---

### 🤖 Ask Finlit AI

Finlit includes an AI financial literacy coach powered through a secure Express backend proxy using Anthropic Claude.

The assistant is designed to:

- Explain money topics simply
- Avoid jargon
- Give short and practical answers
- Use teen-friendly examples
- Reference the user’s goals and progress when available
- Avoid professional financial advice

If no API key is configured, the app can still run with a helpful fallback mode for demo purposes.

---

### 🏆 Gamification System

To make learning feel rewarding, Finlit includes:

- XP points
- Levels
- Daily streaks
- Achievement badges
- Weekly challenges
- Lesson completion rewards
- Scenario rewards
- Progress tracking

Level progression includes stages such as Money Newbie, Budget Boss, Credit Champ, Invest Pro, and Money Master.

---

### 🧠 Real Talk Scenarios

Finlit includes choose-your-own-path money scenarios based on realistic situations, such as:

- Getting a first paycheque
- Being offered a high-interest store credit card
- Splitting an expensive dinner
- Deciding whether to invest
- Managing wants versus responsibilities
- Tracking cash income

Each scenario teaches consequences through interactive choices.

---

### 🇨🇦 Canadian Financial Context

Finlit includes Canadian/North American financial topics such as:

- TFSA
- RESP
- RRSP
- T4 forms
- CPP
- EI
- Credit scores
- Debit and credit cards
- Paycheque deductions
- Student finances

---

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Frontend | React, Vite |
| Routing | React Router with HashRouter |
| Styling | Custom CSS, dark mode support |
| Charts | Recharts |
| Icons | Lucide React |
| Backend Proxy | Node.js, Express |
| AI Integration | Anthropic Claude API |
| Environment Variables | dotenv |
| Storage | Browser localStorage |
| Deployment | Vercel |

---

## 📸 Screenshots

Screenshots will be added here.

Suggested screenshots:

- Dashboard
- Money Profile Quiz
- Learning Modules
- Budget Builder
- Spending Tracker
- Savings Goals
- Ask Finlit AI
- About Page

---

## 🧩 Project Structure

```text
FinLit-Your-Personal-Financial-Coach/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── tools/
│   │   ├── AskFinlitAI.jsx
│   │   ├── Dashboard.jsx
│   │   ├── GoalsTracker.jsx
│   │   ├── Navbar.jsx
│   │   ├── SpendingTracker.jsx
│   │   └── Tools.jsx
│   ├── data/
│   │   ├── modules.js
│   │   ├── quizQuestions.js
│   │   ├── scenarios.js
│   │   └── tips.js
│   ├── pages/
│   ├── utils/
│   │   ├── badges.js
│   │   ├── healthScore.js
│   │   ├── profileLogic.js
│   │   ├── storage.js
│   │   └── xp.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── server.js
├── vite.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 💻 Installation & Setup

### Prerequisites

Install Node.js. Node 18 or newer is recommended.

### 1. Clone the repository

```bash
git clone https://github.com/deepjpatel2007/FinLit-Your-Personal-Financial-Coach.git
cd FinLit-Your-Personal-Financial-Coach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local `.env` file from the example file:

```bash
cp .env.example .env
```

Then add your Anthropic API key:

```env
PORT=5000
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

> [!IMPORTANT]
> Never commit your real `.env` file or API keys. The `.gitignore` file is configured to exclude `.env`.

### 4. Run the development server

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:5173/
```

The backend API proxy runs at:

```text
http://localhost:5000/
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview production build

```bash
npm run preview
```

---

## 🔐 Security Notes

- The Anthropic API key is never exposed directly in the frontend.
- API requests are routed through a lightweight Express proxy server.
- `.env` is ignored by Git.
- `.env.example` is included only as a template.
- User progress is stored locally in the browser through localStorage.

---

## 🗺️ Roadmap

Completed:

- [x] Personalized 20-question onboarding quiz
- [x] Money profile generation
- [x] Dashboard with financial health score
- [x] XP, levels, streaks, and badges
- [x] Spending tracker
- [x] Savings goals manager
- [x] Budget builder
- [x] Compound growth calculator
- [x] Credit score simulator
- [x] Paycheque simulator
- [x] Subscription audit tool
- [x] Emergency fund calculator
- [x] Debt payoff planner
- [x] AI money coach
- [x] About page
- [x] Dark mode support
- [x] Vercel deployment

Future improvements:

- [ ] User accounts and cloud sync
- [ ] Firebase or Supabase backend
- [ ] Bank API integration with mock/demo data
- [ ] More advanced analytics dashboard
- [ ] Mobile app version
- [ ] More real-world financial scenarios
- [ ] More accessibility testing
- [ ] Screenshots and demo video

---

## 🎯 What I Learned

This project helped me practice:

- Building a full React single-page application
- Creating reusable components
- Managing state with hooks and localStorage
- Designing a responsive dashboard UI
- Working with charts and financial calculations
- Building an Express API proxy
- Integrating an AI API safely
- Creating a gamified user experience
- Writing educational content for a specific audience
- Deploying a project with Vercel

---

## 👤 Author

Built by **Deep Patel**.

GitHub: [@deepjpatel2007](https://github.com/deepjpatel2007)

---

## 📄 License

This project is intended for educational and portfolio purposes.

If using or adapting this project, please keep the educational disclaimer visible.
