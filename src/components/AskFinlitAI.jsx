import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
import { storage } from '../utils/storage';

const STARTER_QUESTIONS = [
  "How should I budget my first paycheque?",
  "What is a credit score?",
  "What is a TFSA?",
  "How do I save for a car?",
  "Should I start investing?"
];

// Offline fallback responses to keep the application interactive without key configuration
const OFFLINE_RESPONSES = {
  budget: "To budget your first paycheque, try the 50/30/20 rule: put 50% toward Needs (like bills, transit), 30% toward Wants (fun, hanging out), and immediately put 20% into Savings. Paying your future self first is the best habit you can build!",
  credit: "A credit score is a 300-900 number that tells lenders how trustworthy you are. To build a great score: pay all bills on time, keep credit card balances low (under 30% of your limit), and avoid opening too many accounts at once.",
  tfsa: "A TFSA (Tax-Free Savings Account) is a Canadian account available to residents aged 18+. Any investments you hold inside it (like stocks or ETFs) grow 100% tax-free. When you take the money out, you pay $0 in tax!",
  car: "Saving for a car is all about SMART goal setting. Calculate the total cost, pick a deadline, and divide it into monthly targets. Put that money in a separate savings account immediately when you get paid.",
  invest: "Yes, starting early is your secret weapon! Thanks to compound interest, even saving $50/month now grows much larger than starting with $200/month later in life. A diversified ETF is a great, low-risk way to start.",
  default: "I'd love to help you with that! Finlit AI is currently running in offline demo mode because no Anthropic API Key is configured. To enable live conversations with Claude, copy the .env.example file in the project folder to .env and paste your API key!"
};

const getOfflineResponse = (query) => {
  const q = query.toLowerCase();
  if (q.includes('budget') || q.includes('paycheque') || q.includes('paycheck')) return OFFLINE_RESPONSES.budget;
  if (q.includes('credit') || q.includes('score') || q.includes('borrow')) return OFFLINE_RESPONSES.credit;
  if (q.includes('tfsa') || q.includes('tax-free') || q.includes('canada')) return OFFLINE_RESPONSES.tfsa;
  if (q.includes('car') || q.includes('save') || q.includes('laptop')) return OFFLINE_RESPONSES.car;
  if (q.includes('invest') || q.includes('stock') || q.includes('compound')) return OFFLINE_RESPONSES.invest;
  return OFFLINE_RESPONSES.default;
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
  const [apiStatus, setApiStatus] = useState({ configured: null, checked: false });
  const [chatError, setChatError] = useState(null);

  const historyEndRef = useRef(null);

  // Check backend health on mount
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setApiStatus({ configured: data.apiKeyConfigured, checked: true });
      })
      .catch(() => {
        // Express backend is not running, run in simulated mode
        setApiStatus({ configured: false, checked: true });
      });
  }, []);

  // Scroll to bottom when message arrives
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    setChatError(null);
    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // If API is not configured or server check failed, do simulated response
    if (apiStatus.configured === false) {
      setTimeout(() => {
        const reply = getOfflineResponse(textToSend);
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        setIsLoading(false);
        // Award a tiny bit of XP for interacting
        const currentXp = storage.getXP();
        storage.setXP(currentXp + 5);
        onAwardXp(5);
      }, 800);
      return;
    }

    try {
      // Create request payload: we need only user and assistant messages
      const conversationHistory = messages.concat(userMessage).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: conversationHistory })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
        // Award XP
        const currentXp = storage.getXP();
        storage.setXP(currentXp + 10);
        onAwardXp(10);
      } else {
        // Backend returned error
        console.error('API Error:', data);
        setChatError({
          type: data.error,
          message: data.message,
          details: data.details
        });
        
        // Show error notice in messages
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `⚠️ [Error]: ${data.message || 'API request failed.'} ${data.details ? `\nDetails: ${data.details}` : ''}\n\nRunning in fallback mode instead: ${getOfflineResponse(textToSend)}`
        }]);
      }
    } catch (err) {
      console.error('Network error calling backend API:', err);
      setChatError({
        type: 'NETWORK_FAILURE',
        message: 'Could not connect to the backend server. Is the Express server running?'
      });
      // Fallback
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ [Connection Error]: Express backend server is offline. Running in fallback simulation mode instead:\n\n${getOfflineResponse(textToSend)}`
      }]);
    } finally {
      setIsLoading(false);
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
        <div className="ai-warning-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
            <AlertTriangle size={14} color="var(--c-amber)" />
            <span>Educational Coach Only</span>
          </div>
          <p style={{ fontSize: '0.75rem', marginTop: '2px', color: 'var(--text-sub)' }}>
            I am here to teach you basic money habits. I do not provide professional financial or investment advice.
          </p>
        </div>

        {/* Chat Message Box */}
        <div className="chat-history">
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
          
          {/* Explicit Error Display */}
          {chatError && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '0.5px solid var(--c-red)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-main)',
              margin: '8px 0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <AlertCircle size={16} style={{ color: 'var(--c-red)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block' }}>API Call Failed ({chatError.type})</strong>
                <span>{chatError.message}</span>
                {chatError.details && (
                  <pre style={{
                    marginTop: '6px',
                    padding: '6px',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    fontSize: '0.7rem'
                  }}>{chatError.details}</pre>
                )}
              </div>
            </div>
          )}
          <div ref={historyEndRef} />
        </div>

        {/* Suggestion Pills */}
        <div style={{ marginTop: '16px' }}>
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
              placeholder="Ask a question (e.g., 'What is gross pay?')..."
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
