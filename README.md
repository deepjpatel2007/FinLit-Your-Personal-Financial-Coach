# Finlit 🇨🇦 - Premium Personal Finance & Financial Literacy Coach

Learn it. Budget it. Own it. **Finlit** is a gamified, startup-quality money management and financial literacy web application for teenagers and young adults. It functions as a personal dashboard: part educational hub, part daily spending tracker, part savings goals manager, and part personalized AI money coach.

Designed specifically to navigate North American financial terms (TFSAs, RESPs, RRSPs, credit scores, paycheques, and tax filings) without standard academic jargon, Finlit makes money management visual, simple, and action-oriented.

> [!WARNING]
> **Educational Disclaimer**: Finlit is for financial education purposes only. The tools, simulators, and AI coach do not provide professional financial, investment, legal, or tax advice. For serious financial decisions, always consult a trusted adult or qualified professional.

---

## 🚀 Key Features

1. **Personalized Onboarding Quiz & Archetypes**:
   - A 20-question quiz divided into Situation, Goals, Habits, and Knowledge.
   - Computes a personalized money archetype out of 8 potential personas (e.g. *Money Newbie*, *Future Investor*, *Paycheque Planner*, *Smart Saver*).
   - Generates confidence metrics, risk factor analysis, recommended paths, daily habits, first goals, and coach starter prompts.
2. **Master Control Dashboard**:
   - Circular Financial Health Score meter out of 100.
   - Weekly challenges checkboxes with custom XP values.
   - Spending snapshots (monthly cash flows) and high spending warnings.
   - Priority savings goal status and reminders.
3. **Daily Spending Ledger**:
   - Inflow/outflow transaction logs (date, method, category, notes).
   - Recharts category donut chart rendering.
   - High spending alert prompts.
4. **Savings Goals Manager**:
   - Advanced tracker allowing target dates, priority levels, monthly contributions, and checkoffs.
   - Calculates days remaining and suggested monthly savings rates.
5. **Interactive Simulators (7 calculators)**:
   - *50/30/20 Budget Builder*: Ideal allocations slider.
   - *What-If Growth Calculator*: Compound interest projections graph.
   - *Credit Score Simulator*: Interactive score gauges and habit toggles.
   - *First Paycheque Simulator*: Canadian provincial deductions calculator (ON, QC, BC, AB, etc. plus CPP/EI).
   - *Subscription Audit*: Underutilized subscription tracker that links cancel savings to goals.
   - *Emergency Fund Calculator*: Buffer target milestone calculator.
   - *Debt Payoff Planner*: Avalanche vs snowball comparison simulator.
6. **Gamified Lessons**:
   - 12 modules covering Budgeting, Credit, Taxes, Student Money, and Scams.
   - Case studies, glossaries, and quizzes that award XP.
7. **Ask Finlit AI Coach**:
   - Context-aware chatbot powered securely by Claude API (`claude-sonnet-4-20250514`) or fallback offline personalized logic.
8. **Data settings & Export**:
   - Export browser progress as JSON.
   - Target resets for specific categories.

---

## 🛠️ Tech Stack

- **Frontend**: React (Functional hooks), React Router (HashRouter)
- **Charts**: Recharts (Dynamic Responsive SVG Charts)
- **Icons**: Lucide React
- **Backend Proxy**: Node.js, Express, CORS, Dotenv, and `@anthropic-ai/sdk`
- **Storage**: Browser `localStorage` (persisting XP, streak, lessons, goals, transactions)

---

## 💻 Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (Node 18+ is recommended).

### 1. Install Dependencies
Run the install command in the project root:
```bash
npm install
```

### 2. Configure Claude AI API Key
1. Copy the `.env.example` file to create your own local `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your Anthropic API Key:
   ```env
   PORT=5000
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxx...
   ```
*Security Note: Never commit your `.env` file containing actual API keys to Git. The `.gitignore` is pre-configured to block it. If running offline, the built-in local AI coach will mock personalized advice automatically.*

### 3. Run App Locally
Start both React frontend and Express backend concurrently:
```bash
npm run dev
```
- Frontend will open at: [http://localhost:5173/](http://localhost:5173/)
- Backend API will run on: [http://localhost:5000/](http://localhost:5000/)

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
FinLit/
├── server.js               # Express proxy backend server
├── vite.config.js          # Client bundle configurations & API proxy
├── public/                 # Favicon and static assets
└── src/
    ├── App.jsx             # State coordinator and route selector
    ├── main.jsx            # React root bootstrap
    ├── index.css           # Styling system & utility classes
    ├── components/
    │   ├── Navbar.jsx      # Top header navbar & mobile bottom nav
    │   ├── Dashboard.jsx   # Control panel with health score, challenges
    │   ├── SpendingTracker # Income/expense transaction ledgers
    │   ├── GoalsTracker.jsx# Savings goal coordinator
    │   ├── Tools.jsx       # Tabbed calculators wrapper
    │   ├── tools/
    │   │   ├── PaychequeSimulator.jsx
    │   │   ├── SubscriptionAudit.jsx
    │   │   ├── EmergencyFundCalc.jsx
    │   │   └── DebtPayoffPlanner.jsx
    │   └── AskFinlitAI.jsx # Claude AI Chat & offline fallback
    ├── data/
    │   ├── modules.js      # 12 learning curriculum modules
    │   ├── quizQuestions.js# 20 onboarding questions
    │   └── learningPaths.js# Module path maps
    └── utils/
        ├── healthScore.js  # Calculates health metric out of 100
        ├── profileLogic.js # Money Archetypes parser
        ├── storage.js      # LocalStorage helpers
        └── badges.js       # Unlocks conditions for 16 achievements
```

---

## 🗺️ Product Roadmap

- [x] Expand Onboarding Quiz to 20 Questions
- [x] Upgrade Dashboard UI & Financial Health Score calculation
- [x] Integrate Spending Donut & Cash Flow ledger
- [x] Implement Canadian Paycheque & Subscription Audit tools
- [x] Structure 16 achievement badges & weekly challenges
- [ ] Add Multiplayer Leaderboards & Friend XP compare
- [ ] Implement live banking API connections (mock PLAID integrations)
- [ ] Build offline-first service worker sync

---

## 📸 Screenshots & Previews

*(Screenshots of the dark mode dashboard, trackers, simulators, lessons, and interactive quiz will go here)*

---

## 👥 Authors & License
Created for financial literacy education. Distributed under MIT License.
