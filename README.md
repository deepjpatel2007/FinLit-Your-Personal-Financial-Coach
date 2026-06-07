# Finlit 🇨🇦 - Financial Literacy for Teens & First-Jobbers

Learn it. Budget it. Own it. **Finlit** is a gamified, mobile-friendly financial education web application that acts like a hybrid of Duolingo, a budgeting tool, and a friendly AI financial coach. It is designed to teach teenagers and young adults how to navigate their first jobs, understand North American financial terms (such as TFSAs, RESPs, T4 forms, etc.), and build healthy money habits.

> [!WARNING]
> **Educational Disclaimer**: Finlit is for financial education purposes only. The tools, simulators, and AI coach do not provide professional financial, investment, legal, or tax advice. For serious financial decisions, always consult a trusted adult or qualified professional.

---

## 🚀 Features

1. **Personalized Money Quiz**: An 8-step profiling quiz that assesses your goals, knowledge, and situation, matching you with one of 5 money profiles (e.g., *Money Newbie*, *Future Investor*) and recommending custom lessons.
2. **Interactive Lessons (Duolingo style)**: 6 bite-sized modules covering Budgeting, Credit Cards, Investing, Banking, Goal Setting, and Taxes. Includes real-life examples, glossary terms, and interactive quizzes that award XP.
3. **Gamification Engine**: Tracking XP, user levels (from *Newbie* to *Money Master*), a calendar-based consecutive daily streak, and today's financial tip.
4. **Interactive Simulators & Tools**:
   - **Budget Builder**: Live 50/30/20 breakdown with interactive charts.
   - **What-If Compound growth calculator**: Interactive sliders and growth projection line charts.
   - **Credit Score Simulator**: Gauge and toggle controls to simulate score adjustments based on financial habits.
5. **Real Talk Choose-Your-Own-Path Scenarios**: 6 story cards placing you in real-life cash and credit decisions, explaining the consequences and rewards.
6. **Ask Finlit AI**: A chat interface powered securely by the Claude API (`claude-sonnet-4-20250514`) with custom teen-friendly jargon-free directives. Works with simulated fallbacks if an API key is not configured.
7. **Default Dark Mode**: Premium, dark-themed styling tailored for maximum readability, featuring smooth transitions and a manual light mode toggle.

---

## 🛠️ Tech Stack

- **Frontend**: React (Functional hooks), React Router (HashRouter for clean routing on GitHub Pages/Vercel)
- **Charts**: Recharts (Dynamic Responsive SVG Charts)
- **Icons**: Lucide React
- **Backend Proxy**: Express, CORS, Dotenv, and `@anthropic-ai/sdk` (Node.js)
- **Storage**: Browser `localStorage` (persisting XP, streak, lessons, and quiz results)

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
The application includes a backend proxy to securely communicate with the Claude API.
1. Copy the `.env.example` file to create your own local `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your Anthropic API Key:
   ```env
   PORT=5000
   ANTHROPIC_API_KEY=sk-ant-api03-xxxxxx...
   ```
*Note: If no API key is set, the AI coach will run in a helpful educational simulation mode, letting you test out the app's features immediately!*

### 3. Run the App Locally
Start both the React frontend and the Express backend concurrently:
```bash
npm run dev
```
- Frontend will open at: [http://localhost:5173/](http://localhost:5173/)
- Backend API will run on: [http://localhost:5000/](http://localhost:5000/)

### 4. Build for Production
To generate a static client bundle (compatible with GitHub Pages, Vercel, Netlify):
```bash
npm run build
```

---

## 📸 Screenshots & Previews

*(Screenshots of the dark mode dashboard, simulators, lessons, and interactive quiz will go here)*
