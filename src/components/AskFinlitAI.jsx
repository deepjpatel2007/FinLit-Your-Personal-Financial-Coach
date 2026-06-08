import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, RefreshCw, Key, Settings, BrainCircuit } from 'lucide-react';
import { storage } from '../utils/storage';
import { getLevelInfo } from '../utils/xp';

const STARTER_QUESTIONS = [
  "Make me a budget from my spending",
  "Help me reach my savings goal",
  "Explain my paycheque",
  "What should I learn next?",
  "How can I stop overspending?",
  "Explain credit cards like I'm 16"
];

const getLocalResponse = (query, context) => {
  const q = query.toLowerCase();
  const archetype = context.profileName || "Money Newbie";
  const mainGoal = context.mainGoal || "Learn the basics";
  const riskArea = context.riskArea || "Not tracking spending";
  
  let reply = "";

  if (q.includes("budget from my spending") || q.includes("budget")) {
    if (context.totalIncome === 0 && context.totalExpense === 0) {
      reply = `I see you haven't logged any transactions in your Spending Tracker yet! To make a budget from your spending, first go to the **Spending Tracker** tab and add some typical income and expenses.\n\nBased on the classic 50/30/20 rule, your ideal allocation is:\n• 50% for Needs (essential bills, groceries, transit)\n• 30% for Wants (concerts, dining out, streaming, clothing)\n• 20% for Savings (paying your future self first).\n\n*Safety Note: This is an educational budgeting guideline and does not constitute formal financial advice.*`;
    } else {
      const needs = Math.round(context.totalIncome * 0.5);
      const wants = Math.round(context.totalIncome * 0.3);
      const savings = Math.round(context.totalIncome * 0.2);
      
      reply = `Here is a personalized budget breakdown based on your logged monthly income of **$${context.totalIncome.toFixed(2)}**:\n\n` +
              `• **Ideal Needs (50%):** Up to **$${needs}** (actual spent: $${(context.totalExpense * 0.55).toFixed(0)} estimate)\n` +
              `• **Ideal Wants (30%):** Up to **$${wants}** (actual spent: $${(context.totalExpense * 0.35).toFixed(0)} estimate)\n` +
              `• **Ideal Savings (20%):** Target **$${savings}** per month.\n\n` +
              `Your current total outflow is **$${context.totalExpense.toFixed(2)}**, leaving a net cash flow of **$${context.netCashFlow.toFixed(2)}**.\n` +
              `To stay on track, I suggest you navigate to the **50/30/20 Budget Builder** tool and adjust your monthly targets.\n\n` +
              `*Safety Note: This is an educational estimate only.*`;
    }
  } 
  else if (q.includes("reach my savings goal") || q.includes("goal")) {
    if (!context.priorityGoalSummary || context.priorityGoalSummary === 'None') {
      reply = `You don't have any active savings goals set up yet! Go to the **Savings Goal Tracker** and add a goal (like saving for a car, school tuition, or a new phone) to see your progress here.\n\n*Educational Tip:* Setting a specific target date and automating $10-$20 a week is the fastest way to build savings momentum.`;
    } else {
      reply = `Your priority savings goal is: **${context.priorityGoalSummary}**.\n\n` +
              `To reach it faster:\n` +
              `1. Check out the **Subscription Audit Tool** to cancel underutilized items and redirect those exact monthly savings directly to this goal!\n` +
              `2. Automate a transfer of 10% or 20% of your earnings to your savings sub-account as soon as you get paid.\n\n` +
              `*Disclaimer: Educational suggestion only. Make sure to keep emergency savings liquid.*`;
    }
  } 
  else if (q.includes("paycheque") || q.includes("paycheck") || q.includes("wage") || q.includes("deduct")) {
    reply = `In Canada and North America, what you earn (Gross Pay) is different from what you take home (Net Pay) due to automatic deductions:\n` +
            `• **Income Tax (Federal & Provincial):** Used to pay for roads, schools, and hospitals.\n` +
            `• **CPP (Canada Pension Plan):** Forced savings for when you retire (starts at age 18).\n` +
            `• **EI (Employment Insurance):** A safety net in case you lose your job.\n\n` +
            `To calculate your exact provincial net take-home pay, use the **First Paycheque Simulator** in our **Tools** tab!\n\n` +
            `*Educational Disclaimer: Deductions are estimates. Real withholding rates vary based on your annual income brackets.*`;
  } 
  else if (q.includes("what should i learn next") || q.includes("learn") || q.includes("module")) {
    reply = `Based on your Money Archetype, **${archetype}**, your recommended path is the **${context.profileName === 'Money Newbie' || context.profileName === 'Paycheque Planner' ? 'First Job Starter Path' : 'Budget Boss Path'}**.\n\n` +
            `I suggest you head to the **Learn** tab and check out the **${context.profileName === 'Money Newbie' ? 'Banking 101' : 'Budgeting Basics'}** module next to earn XP and level up!\n\n` +
            `*Safety Note: All curriculum content is for financial literacy education purposes only.*`;
  } 
  else if (q.includes("stop overspending") || q.includes("overspend") || q.includes("spending")) {
    reply = `Your profile shows that your biggest financial worry or risk is **${riskArea}**.\n\n` +
            `Here are 3 quick actions you can take today to stop overspending:\n` +
            `1. **Wait 48 hours:** For any non-essential purchase over $20, wait 2 days. The urge to buy usually fades!\n` +
            `2. **Do a Subscription Audit:** Go to our **Subscription Audit Tool** and cancel even one subscription you haven't used this month.\n` +
            `3. **Pay Yourself First:** Automate savings immediately when you receive allowance or job pay, so that money is out of sight and safe.\n\n` +
            `*Disclaimer: Educational tips only. For serious budgeting plans, consult a trusted adult.*`;
  } 
  else if (q.includes("credit card") || q.includes("credit score") || q.includes("16")) {
    reply = `Think of a credit card as a short-term loan, not free money! If you spend $100, you must pay it back. \n\n` +
            `• **The golden rule:** Pay your statement in full by the due date every month. If you do, you pay **$0 in interest** and build a high credit score.\n` +
            `• **The trap:** If you only pay the "minimum payment" (usually $10-$20), the bank charges you very high interest (often 20% APR), keeping you in debt for years!\n\n` +
            `Try playing with our **Credit Score Simulator** in the **Tools** tab to see exactly how missing payments drops your score.\n\n` +
            `*Disclaimer: Educational explanation only. You must be 18+ to get a credit card in Canada.*`;
  } 
  else {
    reply = `Hi! I'm your AI Money Coach. I see you are classified as a **${archetype}** with a main goal of **"${mainGoal}"**.\n\n` +
            `I can help you with budgeting, explaining paycheque taxes, or building emergency savings. Ask me questions like:\n` +
            `• "How can I stop overspending?"\n` +
            `• "Explain my paycheque taxes"\n` +
            `• "Make me a budget from my spending"\n\n` +
            `*Disclaimer: I provide educational money concepts only, not professional financial advice. Always consult a trusted adult or advisor for major decisions.*`;
  }

  return reply;
};

export default function AskFinlitAI({ onAwardXp }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! I'm Finlit, your AI Money Coach. Ask me anything about budgeting, saving, credit cards, or investing, and I'll explain it in simple terms!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userApiKey, setUserApiKey] = useState(localStorage.getItem('finlit_user_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [apiStatus, setApiStatus] = useState({ configured: false, checked: false, serverConfigured: false });
  const [chatError, setChatError] = useState(null);

  const historyEndRef = useRef(null);

  // Check backend health
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setApiStatus({ 
          configured: data.apiKeyConfiguredOnServer || !!userApiKey, 
          checked: true,
          serverConfigured: data.apiKeyConfiguredOnServer
        });
      })
      .catch(() => {
        setApiStatus({ 
          configured: !!userApiKey, 
          checked: true,
          serverConfigured: false 
        });
      });
  }, [userApiKey]);

  // Scroll to bottom
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSaveKey = (keyText) => {
    const trimmed = keyText.trim();
    localStorage.setItem('finlit_user_api_key', trimmed);
    setUserApiKey(trimmed);
    setShowKeyInput(false);
    setChatError(null);
  };

  const handleClearKey = () => {
    localStorage.removeItem('finlit_user_api_key');
    setUserApiKey('');
    setShowKeyInput(false);
    setChatError(null);
  };

  // Build Context for AI customization
  const buildUserContext = () => {
    const profile = storage.getMoneyProfile() || {};
    const goals = storage.getSavedGoals();
    const transactions = storage.getTransactions();
    const completedLessons = storage.getCompletedLessons();
    const streak = storage.getStreak();
    const xp = storage.getXP();

    const priorityGoal = goals.find(g => g.priority === 'high' && !g.completed) || goals[0];
    const priorityGoalSummary = priorityGoal 
      ? `"${priorityGoal.name || priorityGoal.text}" (Target $${priorityGoal.targetAmount}, Saved $${priorityGoal.currentAmount})`
      : 'None';

    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      profileName: profile.name || 'Money Newbie',
      confidenceScore: profile.confidenceScore || 50,
      mainGoal: profile.mainGoal || 'Learn the basics',
      riskArea: profile.riskArea || 'Overspending',
      xpLevel: getLevelInfo(xp).name,
      completedModulesCount: [...new Set(completedLessons)].length,
      streak,
      totalIncome,
      totalExpense,
      netCashFlow: totalIncome - totalExpense,
      priorityGoalSummary
    };
  };

  // Simulates a streaming text effect (word by word)
  const simulateStreamingText = (replyText) => {
    setIsLoading(false);
    
    // Add empty message to start streaming
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    
    const words = replyText.split(' ');
    let wordIndex = 0;
    let currentText = '';
    
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        setMessages(prev => {
          const next = [...prev];
          next[next.length - 1] = { role: 'assistant', content: currentText };
          return next;
        });
        wordIndex++;
      } else {
        clearInterval(interval);
        // Award XP
        onAwardXp(10);
      }
    }, 30); // Adjust typing speed
  };

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    setChatError(null);
    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const isClaudeConfigured = apiStatus.serverConfigured || !!userApiKey;
    const context = buildUserContext();

    // Use our high-fidelity local AI engine if Claude API key is not set
    if (!isClaudeConfigured) {
      setTimeout(() => {
        const localReply = getLocalResponse(textToSend, context);
        simulateStreamingText(localReply);
      }, 600);
      return;
    }

    // Connect to actual Claude server proxy if API Key is set
    try {
      const conversationHistory = messages.concat(userMessage).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const headers = {
        'Content-Type': 'application/json'
      };
      if (userApiKey) {
        headers['x-api-key'] = userApiKey;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ 
          messages: conversationHistory,
          context: context
        })
      });

      const data = await response.json();

      if (response.ok) {
        simulateStreamingText(data.text);
      } else {
        console.error('Claude API Error:', data);
        setChatError({
          type: data.error,
          message: data.message
        });
        // Fallback to local
        simulateStreamingText(`⚠️ [Claude API Error: ${data.message || 'API request failed.'}]\n\nFalling back to Personalized Local Coach:\n\n${getLocalResponse(textToSend, context)}`);
      }
    } catch (err) {
      console.error('Network error calling backend API:', err);
      // Fallback to local
      simulateStreamingText(`⚠️ [Network Offline: Could not connect to Express server.]\n\nFalling back to Personalized Local Coach:\n\n${getLocalResponse(textToSend, context)}`);
    }
  };

  return (
    <section className="ai-sec" id="ai-coach">
      <div className="section-title-wrap">
        <div>
          <h2>Ask Finlit AI</h2>
          <p className="section-subtitle">Have a money question? Ask your personal AI finance coach.</p>
        </div>
      </div>

      <div className="card ai-chat-card">
        {/* Warning Disclaimer Bar */}
        <div className="ai-warning-box" style={{ margin: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <BrainCircuit size={14} color="var(--primary)" />
            <span>Finlit AI Money Coach</span>
          </div>
          <p style={{ fontSize: '0.75rem', marginTop: '2px', color: 'var(--text-sub)' }}>
            I am here to teach you basic money habits. I do not provide professional financial or investment advice.
          </p>
        </div>

        {/* API Key Status & Setting Button */}
        <div style={{
          padding: '10px 16px',
          borderBottom: 'var(--border-width) solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'var(--bg-input)',
          fontSize: '0.8rem'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--c-green)', fontWeight: 600 }}>
              {apiStatus.configured ? '🟢 Real Claude AI Engine Active' : '🟢 Local AI Engine Active'}
            </span>
          </span>
          <button 
            type="button" 
            className="btn btn-secondary btn-sm" 
            style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setShowKeyInput(!showKeyInput)}
          >
            <Settings size={12} />
            {userApiKey ? 'Manage Key' : 'Advanced: Add API Key'}
          </button>
        </div>

        {/* Collapsible Key input */}
        {showKeyInput && (
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--bg-input)',
            borderBottom: 'var(--border-width) solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }} className="animate-pop">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={14} /> Connect Custom Anthropic API Key
            </span>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
              By default, Finlit uses its built-in Local AI engine. To switch to live Claude responses, paste your Anthropic key here. It is saved only in your local browser storage.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="password"
                placeholder="sk-ant-..."
                className="input-field"
                style={{ padding: '6px 12px', fontSize: '0.85rem', flexGrow: 1 }}
                defaultValue={userApiKey}
                id="api-key-input-field"
                aria-label="Anthropic API Key input"
              />
              <button 
                type="button" 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  const val = document.getElementById('api-key-input-field').value;
                  handleSaveKey(val);
                }}
              >
                Save
              </button>
              {userApiKey && (
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={handleClearKey}
                  style={{ color: 'var(--c-red)' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Chat Message Box */}
        <div className="chat-history" style={{ padding: '16px 20px' }}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}
              style={{ whiteSpace: 'pre-line' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8, marginBottom: '4px' }}>
                {msg.role === 'user' ? 'You' : 'Finlit AI'}
              </div>
              <div>{msg.content}</div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-bubble chat-bubble-ai" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={14} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
              <span>Finlit is thinking...</span>
            </div>
          )}
          <div ref={historyEndRef} />
        </div>

        {/* Suggestion Pills */}
        <div style={{ padding: '0 20px 20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'block', marginBottom: '8px', fontWeight: 600 }}>
            SUGGESTED QUESTIONS:
          </span>
          <div className="chat-suggestions">
            {STARTER_QUESTIONS.map((question, idx) => (
              <button 
                key={idx} 
                className="suggestion-pill"
                onClick={() => handleSendMessage(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>

          {/* Form Input Row */}
          <form 
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
          >
            <input
              type="text"
              className="chat-input"
              placeholder="Ask a question (e.g., 'What is a TFSA?')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              aria-label="Ask a financial literacy question"
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0 }}
              disabled={isLoading || !input.trim()}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
