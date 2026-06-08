import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { ArrowLeft, Sparkles, TrendingUp, ShieldAlert, Award, Star, CheckCircle, HelpCircle, ChevronRight } from 'lucide-react';
import './About.css';

export default function About() {
  const navigate = useNavigate();
  const [triggerStats, setTriggerStats] = useState(false);
  const [triggerMission, setTriggerMission] = useState(false);
  const [triggerAiChat, setTriggerAiChat] = useState(false);
  
  // Stats counters
  const [statTeens, setStatTeens] = useState(0);
  const [statTaxConfused, setStatTaxConfused] = useState(0);
  const [statCreditDebt, setStatCreditDebt] = useState(0);

  // AI Mock Chats
  const [visibleBubbles, setVisibleBubbles] = useState([]);
  const chatBubbles = [
    { role: 'user', text: "How do credit cards work like I'm 16?" },
    { role: 'coach', text: "Think of it as a short-term loan. If you pay the full statement balance every month, you pay $0 in interest and build a top credit score. If you carry a balance, you get trapped with 20%+ APR interest!" },
    { role: 'user', text: "What is a TFSA?" },
    { role: 'coach', text: "A Tax-Free Savings Account! Once you turn 18 in Canada, you can grow investments (like stocks or ETFs) inside this account 100% tax-free. You pay $0 in tax when you withdraw it." }
  ];

  // Particle Canvas hover state
  const [particles, setParticles] = useState([]);
  const [hoverCta, setHoverCta] = useState(false);

  // Scroll Reveal Observer
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.id === 'stats-section-grid') {
            setTriggerStats(true);
          }
          if (entry.target.id === 'mission-words') {
            setTriggerMission(true);
          }
          if (entry.target.id === 'ai-bubble-box') {
            setTriggerAiChat(true);
          }
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));

    return () => {
      reveals.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Stats counting intervals
  useEffect(() => {
    if (!triggerStats) return;

    const countUp = (max, setter, duration = 1200) => {
      let start = 0;
      const stepTime = Math.max(12, Math.floor(duration / max));
      const timer = setInterval(() => {
        start += 1;
        setter(start);
        if (start >= max) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    countUp(95, setStatTeens);
    countUp(78, setStatTaxConfused);
    countUp(64, setStatCreditDebt);
  }, [triggerStats]);

  // AI mock chats sequence timers
  useEffect(() => {
    if (!triggerAiChat) return;

    chatBubbles.forEach((bubble, idx) => {
      setTimeout(() => {
        setVisibleBubbles(prev => {
          // Avoid duplicate triggers
          if (prev.some(p => p.text === bubble.text)) return prev;
          return [...prev, bubble];
        });
      }, idx * 1200 + 400);
    });
  }, [triggerAiChat]);

  // Floating particles generator for final CTA hover
  useEffect(() => {
    if (!hoverCta) {
      setParticles([]);
      return;
    }

    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-15), // keep max 15 particles
        {
          id: Math.random(),
          x: Math.random() * 90 + 5, // random X position percentage
          size: Math.random() * 8 + 4,
          delay: Math.random() * 0.5,
          color: Math.random() > 0.5 ? 'var(--primary)' : 'var(--c-purple)'
        }
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, [hoverCta]);

  const missionText = "Our mission is to make financial literacy accessible, engaging, and practical for the next generation.";
  const missionWords = missionText.split(" ");

  const handleStartApp = () => {
    navigate('/');
    // Check if profile exists, otherwise trigger quiz
    const profile = storage.getMoneyProfile();
    if (!profile) {
      // Navigate and open quiz modal via parent hooks if triggered
      setTimeout(() => {
        const takeQuizBtn = document.querySelector('.logo');
        if (takeQuizBtn) takeQuizBtn.click();
      }, 100);
    }
  };

  return (
    <div className="about-page">
      
      {/* 1. Full-screen Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <span className="about-floating-el" style={{ top: '15%', left: '10%' }}>🪙</span>
          <span className="about-floating-el" style={{ top: '25%', right: '12%' }}>📈</span>
          <span className="about-floating-el" style={{ bottom: '20%', left: '15%' }}>🎯</span>
          <span className="about-floating-el" style={{ bottom: '30%', right: '18%' }}>🛡️</span>
        </div>

        <div className="about-hero-content container">
          <div className="badge badge-brand reveal reveal-up active" style={{ gap: '6px', marginBottom: '20px' }}>
            <Sparkles size={14} />
            <span>Meet Finlit AI Coach</span>
          </div>

          <h1 className="about-hero-title reveal reveal-up active">
            Financial literacy<br />
            shouldn't be <span>complicated.</span>
          </h1>

          <p className="about-hero-sub reveal reveal-up active">
            Finlit helps teenagers and young adults learn how money works through interactive lessons, real-world tools, AI coaching, and personalized learning paths.
          </p>

          <div className="reveal reveal-up active" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={handleStartApp}>
              Get Started Now
            </button>
            <button className="btn btn-secondary" onClick={() => document.getElementById('why-finlit')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </button>
          </div>
        </div>

        <div className="about-scroll-indicator">
          <span>Scroll to Explore</span>
          <div className="about-scroll-dot"></div>
        </div>
      </section>

      {/* 2. Why Finlit Exists */}
      <section id="why-finlit" className="about-section">
        <div className="container">
          <div className="about-section-header reveal reveal-up">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>The Core Problem</span>
            <h2 className="about-section-title">Most people are never taught how money works.</h2>
            <p className="about-section-desc">
              Finlit was built to bridge the gap between academic theory and real-life cash realities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '40px', alignItems: 'center' }} className="grid-2-col">
            <div className="reveal reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.25rem' }}>🏫</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                  <strong>Missing Curriculum:</strong> High schools rarely teach compound growth, tax forms, credit cards, or cash flow limits.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.25rem' }}>💵</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                  <strong>Paycheque Shock:</strong> Teenagers receive their first jobs only to find unexpected deductions like CPP, EI, and provincial income tax.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.25rem' }}>⚠️</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-sub)' }}>
                  <strong>Debt Traps:</strong> Without credit card score simulators, many fall prey to carrying balances at 20%+ APR rates.
                </p>
              </div>
            </div>

            {/* Statistics with count-up numbers */}
            <div id="stats-section-grid" className="stats-grid reveal reveal-right">
              <div className="stat-card">
                <div className="stat-num">{statTeens}%</div>
                <div className="stat-label">Teens Desire Lessons</div>
                <p className="stat-desc">Wish they had learned budgeting and money management before starting high school.</p>
              </div>
              <div className="stat-card">
                <div className="stat-num">{statTaxConfused}%</div>
                <div className="stat-label font-bold">Tax Confused</div>
                <p className="stat-desc">Are confused by how paycheque tax deductions or year-end T4 slips function.</p>
              </div>
              <div className="stat-card">
                <div className="stat-num">{statCreditDebt}%</div>
                <div className="stat-label">Credit Risks</div>
                <p className="stat-desc">Do not understand APR or credit utilization limits before applying for cards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Finlit Journey Timeline */}
      <section className="about-section">
        <div className="container">
          <div className="about-section-header reveal reveal-up">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>HOW IT WORKS</span>
            <h2 className="about-section-title">The Finlit Journey</h2>
            <p className="about-section-desc">
              A structured roadmap that transforms money newbies into master planners.
            </p>
          </div>

          <div id="timeline-list" className="timeline-container">
            <div className="timeline-line"></div>
            
            <div className="timeline-item active reveal reveal-up">
              <div className="timeline-dot">1</div>
              <div className="timeline-content">
                <span className="timeline-step">Step 1</span>
                <h4 className="timeline-title">Take the Money Profile Quiz</h4>
                <p className="timeline-desc">Answer 20 quick habits questions to map your financial personality situation.</p>
              </div>
            </div>

            <div className="timeline-item active reveal reveal-up" style={{ transitionDelay: '0.15s' }}>
              <div className="timeline-dot">2</div>
              <div className="timeline-content">
                <span className="timeline-step">Step 2</span>
                <h4 className="timeline-title">Discover Your Personality Archetype</h4>
                <p className="timeline-desc">Unlock risk metrics, suggested daily habits, paths, and starter AI prompts.</p>
              </div>
            </div>

            <div className="timeline-item active reveal reveal-up" style={{ transitionDelay: '0.3s' }}>
              <div className="timeline-dot">3</div>
              <div className="timeline-content">
                <span className="timeline-step">Step 3</span>
                <h4 className="timeline-title">Complete Interactive Lessons</h4>
                <p className="timeline-desc">Learn about taxes, compounding, and scams. Pass mini quizzes to earn XP rewards.</p>
              </div>
            </div>

            <div className="timeline-item active reveal reveal-up" style={{ transitionDelay: '0.45s' }}>
              <div className="timeline-dot">4</div>
              <div className="timeline-content">
                <span className="timeline-step">Step 4</span>
                <h4 className="timeline-title">Track Goals & Spending</h4>
                <p className="timeline-desc">Log your transactions and configure savings goals with active priority bars.</p>
              </div>
            </div>

            <div className="timeline-item active reveal reveal-up" style={{ transitionDelay: '0.6s' }}>
              <div className="timeline-dot">5</div>
              <div className="timeline-content">
                <span className="timeline-step">Step 5</span>
                <h4 className="timeline-title">Build Better Habits</h4>
                <p className="timeline-desc">Complete weekly challenges, audit active subscriptions, and maintain daily streaks.</p>
              </div>
            </div>

            <div className="timeline-item active reveal reveal-up" style={{ transitionDelay: '0.75s' }}>
              <div className="timeline-dot">6</div>
              <div className="timeline-content">
                <span className="timeline-step">Step 6</span>
                <h4 className="timeline-title">Become Financially Confident</h4>
                <p className="timeline-desc">Level up, achieve Master status, and own your financial future with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Showcase */}
      <section className="about-section">
        <div className="container">
          <div className="about-section-header reveal reveal-up">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>PRODUCT CATALOGUE</span>
            <h2 className="about-section-title">Everything Finlit Offers</h2>
            <p className="about-section-desc">
              All tools, trackers, and resources built into a single responsive dark-themed workspace.
            </p>
          </div>

          <div className="features-showcase-grid reveal reveal-up">
            
            <div className="feature-premium-card">
              <div className="feature-icon-badge">📝</div>
              <h4 className="feature-card-title">Money Quiz</h4>
              <p className="feature-card-desc">An onboarding analysis that determines personality archetype suggestions.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">📖</div>
              <h4 className="feature-card-title">Lessons Modules</h4>
              <p className="feature-card-desc">12 educational curriculums covering compound growth, debt, and credit card traps.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">📊</div>
              <h4 className="feature-card-title">Budget Builder</h4>
              <p className="feature-card-desc">Splits income into Needs (50%), Wants (30%), and Savings (20%) automatically.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">💸</div>
              <h4 className="feature-card-title">Spending Tracker</h4>
              <p className="feature-card-desc">Daily ledger category pie graphs showing inflow, outflows, and net cash balances.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">🎯</div>
              <h4 className="feature-card-title">Savings Goals</h4>
              <p className="feature-card-desc">Create target dates and savings contributions complete with checkoff goals.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">💵</div>
              <h4 className="feature-card-title">Paycheque Simulator</h4>
              <p className="feature-card-desc">Calculates Canadian provincial taxes, CPP, and EI take-home pay rates.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">💳</div>
              <h4 className="feature-card-title">Credit Simulator</h4>
              <p className="feature-card-desc">See how missing payments or maxing out card limits shifts your credit score.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">📉</div>
              <h4 className="feature-card-title">Debt payoff Planner</h4>
              <p className="feature-card-desc">Calculates extra monthly payment payoffs. Compares Snowball and Avalanche.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">🛡️</div>
              <h4 className="feature-card-title">Emergency Fund Calc</h4>
              <p className="feature-card-desc">Plan 1, 3, or 6 month safety nets. Prevent credit traps when emergencies hit.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">💬</div>
              <h4 className="feature-card-title">AI Financial Coach</h4>
              <p className="feature-card-desc">A chatbot that answers questions based on your profile context.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">🏆</div>
              <h4 className="feature-card-title">Gamified Badges</h4>
              <p className="feature-card-desc">Unlock 16 achievement badges, progress level XP ranks, and daily streaks.</p>
            </div>

            <div className="feature-premium-card">
              <div className="feature-icon-badge">❤️</div>
              <h4 className="feature-card-title">Health Score</h4>
              <p className="feature-card-desc">Circular meter scoring your money health based on budget logging and quizzes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Learn. Track. Grow. Horizontal slide-in panels */}
      <section className="about-section">
        <div className="container">
          <div className="panels-container">
            
            {/* Learn */}
            <div className="panel-row reveal reveal-left">
              <div className="panel-icon-side">📖</div>
              <div>
                <h3 className="panel-title"><span>Learn</span> money concepts.</h3>
                <p className="panel-desc">
                  Bite-sized modules packed with teen-friendly examples, key glossaries, and knowledge check quizzes. No boring textbooks—just simple explanations about compounding, credit card interest rates, tax forms, and campus budgeting.
                </p>
              </div>
            </div>

            {/* Track */}
            <div className="panel-row reveal reveal-right">
              <div>
                <h3 className="panel-title"><span>Track</span> daily balances.</h3>
                <p className="panel-desc">
                  Take control of your money flow with simple, integrated goal trackers and transaction ledgers. Map out saving timelines for big items, audit unused subscriptions to plug leaks, and keep cash flows positive.
                </p>
              </div>
              <div className="panel-icon-side">📊</div>
            </div>

            {/* Grow */}
            <div className="panel-row reveal reveal-up">
              <div className="panel-icon-side">🌱</div>
              <div>
                <h3 className="panel-title"><span>Grow</span> compound wealth.</h3>
                <p className="panel-desc">
                  Put compound interest to work early in life! Learn the differences between stocks and ETFs, and configure long-term goals inside tax-free accounts (TFSAs & RESPs) to let your wealth snowball over time.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Meet Finlit AI chatbot preview */}
      <section className="about-section">
        <div className="container">
          <div className="ai-showcase-layout">
            <div className="reveal reveal-left">
              <span className="badge badge-brand" style={{ marginBottom: '10px' }}>AI DIRECTIVES</span>
              <h2 className="about-section-title">Your personal financial coach.</h2>
              <p className="about-section-desc" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
                Ask Finlit AI is designed for teenagers and young adults. It avoids complex jargon and formats advice based on your current savings and budget data.
              </p>
              <ul style={{ fontSize: '0.9rem', color: 'var(--text-sub)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Personalized context:</strong> References your current money archetype.</li>
                <li><strong>Safety first:</strong> Educational guidelines only, strictly avoiding investment tips.</li>
                <li><strong>Teen-friendly tone:</strong> Short explanations in simple terms.</li>
              </ul>
            </div>

            {/* Chatbox simulation */}
            <div id="ai-bubble-box" className="ai-chat-preview-box reveal reveal-right">
              <div className="ai-chat-header">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--c-green)' }}></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Ask Finlit AI Coach</span>
              </div>
              <div className="ai-chat-body">
                {visibleBubbles.map((bubble, idx) => (
                  <div key={idx} className={`ai-bubble ${bubble.role === 'user' ? 'ai-bubble-user' : 'ai-bubble-coach'}`}>
                    <strong>{bubble.role === 'user' ? 'You' : 'Finlit Coach'}:</strong>
                    <div style={{ marginTop: '2px' }}>{bubble.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Built for Teens Canada / US */}
      <section className="about-section">
        <div className="container">
          <div className="about-section-header reveal reveal-up">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>LOCALIZED ISSUES</span>
            <h2 className="about-section-title">Built for Teens 🇨🇦 🇺🇸</h2>
            <p className="about-section-desc">
              Finlit focuses on local North American financial products and structures.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }} className="grid-3 reveal reveal-up">
            
            <div style={{ backgroundColor: 'var(--bg-card)', border: '0.5px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🍁</div>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Canadian accounts</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                Understand TFSAs (Tax-Free Savings Accounts), RESPs (Registered Education Savings Plans), and how government grants match college contributions.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', border: '0.5px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📝</div>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Taxes & Deductions</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                Demystify first job tax slips, CPP (Canada Pension Plan), EI deductions, and how filing a tax return unlocks government refunds and credits.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', border: '0.5px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎒</div>
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px' }}>Student Finance</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                Navigate campus costs, budget semesters, find scholarship guides, and manage government loans securely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Mission Statement typography */}
      <section className="about-section" style={{ backgroundColor: 'var(--bg-input)' }}>
        <div className="container">
          <div className="mission-quote-box">
            <h2 id="mission-words" className={`mission-quote-text reveal reveal-up ${triggerMission ? 'active' : ''}`}>
              {missionWords.map((word, idx) => (
                <span key={idx} style={{ transitionDelay: `${idx * 0.08}s` }}>
                  {word}&nbsp;
                </span>
              ))}
            </h2>
          </div>
        </div>
      </section>

      {/* 9. Future Vision Roadmap */}
      <section className="about-section">
        <div className="container">
          <div className="about-section-header reveal reveal-up">
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>PRODUCT TIMELINE</span>
            <h2 className="about-section-title">Future Vision & Roadmap</h2>
            <p className="about-section-desc">
              Here is what we have planned to expand Finlit's financial coaching.
            </p>
          </div>

          <div className="roadmap-grid reveal reveal-up">
            <div className="roadmap-card">
              <span className="roadmap-quarter">Phase 1</span>
              <h4 className="roadmap-title">Smarter Coach</h4>
              <p className="roadmap-desc">Deeper LLM integration matching custom financial personality advice and actions check lists.</p>
            </div>
            <div className="roadmap-card">
              <span className="roadmap-quarter">Phase 2</span>
              <h4 className="roadmap-title">Mobile App</h4>
              <p className="roadmap-desc">Launching mobile app wrappers for iOS and Android with notifications reminders.</p>
            </div>
            <div className="roadmap-card">
              <span className="roadmap-quarter">Phase 3</span>
              <h4 className="roadmap-title">Friend Duels</h4>
              <p className="roadmap-desc">Weekly challenges matchups against friends and global leaderboards indicators.</p>
            </div>
            <div className="roadmap-card">
              <span className="roadmap-quarter">Phase 4</span>
              <h4 className="roadmap-title">Bank Syncs</h4>
              <p className="roadmap-desc">Plaid integrations allowing transactions logs to sync directly from zero-fee accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final CTA with celebration hover */}
      <section className="about-section" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div className="cta-celebration-box reveal reveal-up">
            
            {/* Particles canvas */}
            {hoverCta && (
              <div className="cta-celebration-particles">
                {particles.map(p => (
                  <span
                    key={p.id}
                    className="particle"
                    style={{
                      left: `${p.x}%`,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      animationDelay: `${p.delay}s`,
                      bottom: '0'
                    }}
                  />
                ))}
              </div>
            )}

            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '14px' }}>
              Start building your financial future today.
            </h2>
            <p style={{ color: 'var(--text-sub)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 30px', lineHeight: '1.6' }}>
              Complete the Money Profile Quiz, unlock your dashboard, and start learning lessons for free.
            </p>

            <button 
              className="btn btn-primary btn-cta-premium"
              onClick={handleStartApp}
              onMouseEnter={() => setHoverCta(true)}
              onMouseLeave={() => setHoverCta(false)}
            >
              Start My Journey 🚀
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
