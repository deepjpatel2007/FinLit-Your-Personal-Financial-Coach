import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { PieChart as PieIcon, TrendingUp, HelpCircle, Activity } from 'lucide-react';

// New Sub Tools
import PaychequeSimulator from './tools/PaychequeSimulator';
import SubscriptionAudit from './tools/SubscriptionAudit';
import EmergencyFundCalc from './tools/EmergencyFundCalc';
import DebtPayoffPlanner from './tools/DebtPayoffPlanner';

export default function Tools({ onActionTriggered }) {
  const [activeTab, setActiveTab] = useState('budget'); // budget, growth, credit, paycheque, subscription, emergency, debt

  // 1. Budget Builder State (Existing)
  const [monthlyIncome, setMonthlyIncome] = useState(1200);

  const needsAmount = Math.round(monthlyIncome * 0.5);
  const wantsAmount = Math.round(monthlyIncome * 0.3);
  const savingsAmount = Math.round(monthlyIncome * 0.2);

  const budgetChartData = [
    { name: 'Needs (50%)', value: needsAmount, color: '#1D9E75' }, // Green
    { name: 'Wants (30%)', value: wantsAmount, color: '#2563EB' }, // Blue
    { name: 'Savings (20%)', value: savingsAmount, color: '#9333EA' } // Purple
  ];

  // 2. What-If Calculator State (Existing)
  const [monthlyDeposit, setMonthlyDeposit] = useState(50);
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(7);

  // Generate projections for line chart
  const projectionData = [];
  const monthlyRate = (interestRate / 100) / 12;
  let totalContributed = 0;
  let accumulatedValue = 0;

  for (let y = 1; y <= years; y++) {
    const months = y * 12;
    if (monthlyRate > 0) {
      accumulatedValue = monthlyDeposit * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      accumulatedValue = monthlyDeposit * months;
    }
    totalContributed = monthlyDeposit * months;
    
    projectionData.push({
      year: `Yr ${y}`,
      'Total Value': Math.round(accumulatedValue),
      'My Contributions': Math.round(totalContributed),
      'Interest Growth': Math.round(Math.max(0, accumulatedValue - totalContributed))
    });
  }

  const finalAmount = Math.round(accumulatedValue);
  const finalContributed = monthlyDeposit * years * 12;
  const finalGrowth = Math.max(0, finalAmount - finalContributed);

  // 3. Credit Score Simulator State (Existing)
  const [creditToggles, setCreditToggles] = useState({
    paidOnTime: true,
    missedPayment: false,
    highUtilization: false,
    lowBalance: false,
    newAccounts: false
  });

  const handleToggle = (key) => {
    setCreditToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  let simulatedScore = 700;
  if (creditToggles.paidOnTime) simulatedScore += 35;
  if (creditToggles.missedPayment) simulatedScore -= 75;
  if (creditToggles.highUtilization) simulatedScore -= 60;
  if (creditToggles.lowBalance) simulatedScore += 25;
  if (creditToggles.newAccounts) simulatedScore -= 30;

  simulatedScore = Math.max(300, Math.min(simulatedScore, 900));

  const getCreditRating = (score) => {
    if (score >= 760) return { label: 'Excellent', className: 'rating-excellent' };
    if (score >= 660) return { label: 'Good', className: 'rating-good' };
    if (score >= 560) return { label: 'Fair', className: 'rating-fair' };
    return { label: 'Poor', className: 'rating-poor' };
  };

  const rating = getCreditRating(simulatedScore);

  const renderActiveTool = () => {
    switch (activeTab) {
      case 'budget':
        return (
          <div className="card tool-card-full animate-pop">
            <div className="tool-header">
              <div className="logo-icon" style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)' }}>
                <PieIcon size={18} />
              </div>
              <div>
                <h3>50/30/20 Budget Builder</h3>
                <p className="tool-sub">Enter an income to split it into needs, wants, and savings goals automatically.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', marginTop: '20px' }} className="grid-2-col">
              <div>
                <div className="input-group">
                  <label className="input-label" htmlFor="monthly-income-input">Monthly Take-Home Income ($)</label>
                  <input
                    id="monthly-income-input"
                    type="number"
                    className="input-field"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
                  />
                </div>

                <div className="budget-breakdown" style={{ marginTop: '16px' }}>
                  <div className="breakdown-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="color-dot" style={{ backgroundColor: '#1D9E75', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                      <span className="category-name" style={{ fontWeight: 600 }}>Needs (50%)</span>
                    </div>
                    <span className="category-amount" style={{ fontWeight: 700 }}>${needsAmount}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', paddingLeft: '20px', marginBottom: '12px' }}>
                    Rent share, transit pass, groceries, phone bill.
                  </p>

                  <div className="breakdown-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="color-dot" style={{ backgroundColor: '#2563EB', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                      <span className="category-name" style={{ fontWeight: 600 }}>Wants (30%)</span>
                    </div>
                    <span className="category-amount" style={{ fontWeight: 700 }}>${wantsAmount}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', paddingLeft: '20px', marginBottom: '12px' }}>
                    Hanging out, fast food, streaming, trendy clothes.
                  </p>

                  <div className="breakdown-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="color-dot" style={{ backgroundColor: '#9333EA', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                      <span className="category-name" style={{ fontWeight: 600 }}>Savings (20%)</span>
                    </div>
                    <span className="category-amount" style={{ fontWeight: 700 }}>${savingsAmount}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', paddingLeft: '20px', marginBottom: '12px' }}>
                    Emergency fund, future TFSA deposits, big goals.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {budgetChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Total</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>${monthlyIncome}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'growth':
        return (
          <div className="card tool-card-full animate-pop">
            <div className="tool-header">
              <div className="logo-icon" style={{ backgroundColor: 'var(--c-blue-muted)', color: 'var(--c-blue)' }}>
                <TrendingUp size={18} />
              </div>
              <div>
                <h3>What-If Growth Calculator</h3>
                <p className="tool-sub">See how small recurring savings compound over years with interest.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', marginTop: '20px' }} className="grid-2-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="slider-group">
                  <div className="slider-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <label htmlFor="monthly-saving-slider">Monthly Savings</label>
                    <span className="slider-value" style={{ fontWeight: 600 }}>${monthlyDeposit}/mo</span>
                  </div>
                  <input 
                    id="monthly-saving-slider"
                    type="range" 
                    min="10" 
                    max="500" 
                    step="10"
                    className="slider-input" 
                    value={monthlyDeposit} 
                    onChange={(e) => setMonthlyDeposit(parseInt(e.target.value))}
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <label htmlFor="years-slider">Time Horizon</label>
                    <span className="slider-value" style={{ fontWeight: 600 }}>{years} Years</span>
                  </div>
                  <input 
                    id="years-slider"
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    className="slider-input" 
                    value={years} 
                    onChange={(e) => setYears(parseInt(e.target.value))}
                  />
                </div>

                <div className="slider-group">
                  <div className="slider-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <label htmlFor="interest-rate-slider">Annual Return Rate</label>
                    <span className="slider-value" style={{ fontWeight: 600 }}>{interestRate}%</span>
                  </div>
                  <input 
                    id="interest-rate-slider"
                    type="range" 
                    min="1" 
                    max="15" 
                    step="0.5"
                    className="slider-input" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <div style={{ width: '100%', height: '140px', marginBottom: '10px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                      <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                      <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                      <Tooltip formatter={(value) => `$${value}`} contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-main)' }} />
                      <Line type="monotone" dataKey="Total Value" stroke="#1D9E75" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="My Contributions" stroke="#94A3B8" strokeWidth={1} strokeDasharray="3 3" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ backgroundColor: 'var(--bg-input)', padding: '12px 16px', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Contributed</span>
                    <div style={{ fontSize: '1rem', fontWeight: 700 }}>${finalContributed.toLocaleString()}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Interest Earned</span>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--c-green)' }}>+${finalGrowth.toLocaleString()}</div>
                  </div>
                  <div style={{ gridColumn: 'span 2', borderTop: '0.5px solid var(--border-color)', paddingTop: '6px', marginTop: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Total Estimated Future Value</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>${finalAmount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'credit':
        return (
          <div className="card tool-card-full animate-pop">
            <div className="tool-header">
              <div className="logo-icon" style={{ backgroundColor: 'var(--c-purple-muted)', color: 'var(--c-purple)' }}>
                <HelpCircle size={18} />
              </div>
              <div>
                <h3>Credit Score Simulator</h3>
                <p className="tool-sub">Simulate credit card and bill payment habits to see their impact on your score.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', marginTop: '20px' }} className="grid-2-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div 
                  className={`toggle-card ${creditToggles.paidOnTime ? 'active' : ''}`}
                  onClick={() => handleToggle('paidOnTime')}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: creditToggles.paidOnTime ? 'var(--primary)' : 'var(--border-color)' }}></div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Pay bills on time</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Adds +35 points</div>
                  </div>
                </div>

                <div 
                  className={`toggle-card ${creditToggles.missedPayment ? 'active' : ''}`}
                  onClick={() => handleToggle('missedPayment')}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: creditToggles.missedPayment ? 'var(--c-red)' : 'var(--border-color)' }}></div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Miss a bill payment deadline</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Subtracts -75 points</div>
                  </div>
                </div>

                <div 
                  className={`toggle-card ${creditToggles.highUtilization ? 'active' : ''}`}
                  onClick={() => handleToggle('highUtilization')}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: creditToggles.highUtilization ? 'var(--c-red)' : 'var(--border-color)' }}></div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Max out credit card (90%+)</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Subtracts -60 points</div>
                  </div>
                </div>

                <div 
                  className={`toggle-card ${creditToggles.lowBalance ? 'active' : ''}`}
                  onClick={() => handleToggle('lowBalance')}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: creditToggles.lowBalance ? 'var(--primary)' : 'var(--border-color)' }}></div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Keep credit balance low</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Adds +25 points</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '16px', backgroundColor: 'var(--bg-input)', borderRadius: '8px', textAlign: 'center', border: '0.5px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Simulated Credit Score</span>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: simulatedScore >= 700 ? 'var(--c-green)' : simulatedScore >= 600 ? 'var(--c-blue)' : simulatedScore >= 500 ? 'var(--c-amber)' : 'var(--c-red)', margin: '4px 0' }}>
                    {simulatedScore}
                  </div>
                  <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'var(--border-color)', color: 'var(--text-main)', fontWeight: 600 }}>
                    Rating: {rating.label}
                  </span>
                </div>

                <div className="consequence-card" style={{ marginTop: '0', backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)', padding: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-main)' }}>💡 Credit Insight:</div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px', lineHeight: '1.4' }}>
                    {creditToggles.missedPayment 
                      ? "A single missed payment is a major black mark. It flags you as a high-risk client and stays on your record for 6 years." 
                      : creditToggles.highUtilization 
                      ? "Using more than 30% of your credit limit implies you are desperate for borrowed cash. Keeping it low looks much better." 
                      : "Paying your bills on time is the single biggest factor (35%) of your score. Automating payments is a great cheat code!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'paycheque':
        return <PaychequeSimulator />;
      case 'subscription':
        return <SubscriptionAudit onActionTriggered={onActionTriggered} />;
      case 'emergency':
        return <EmergencyFundCalc />;
      case 'debt':
        return <DebtPayoffPlanner />;
      default:
        return null;
    }
  };

  return (
    <section className="tools-sec" id="tools" style={{ padding: '24px 0' }}>
      <div className="section-title-wrap">
        <div>
          <h2>Financial Tools & Calculators</h2>
          <p className="section-subtitle">Play with interactive simulation tools to test scenarios and make informed financial plans.</p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="tabs-header-scroll" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px', borderBottom: '0.5px solid var(--border-color)', scrollbarWidth: 'none' }}>
        <button
          className={`btn ${activeTab === 'budget' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('budget')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          📊 50/30/20 Budget
        </button>
        <button
          className={`btn ${activeTab === 'growth' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('growth')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          📈 Compound What-If
        </button>
        <button
          className={`btn ${activeTab === 'credit' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('credit')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          💳 Credit Simulator
        </button>
        <button
          className={`btn ${activeTab === 'paycheque' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('paycheque')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          💵 Paycheque Simulator
        </button>
        <button
          className={`btn ${activeTab === 'subscription' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('subscription')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          🔄 Subscription Audit
        </button>
        <button
          className={`btn ${activeTab === 'emergency' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('emergency')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          🛡️ Emergency Fund
        </button>
        <button
          className={`btn ${activeTab === 'debt' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('debt')}
          style={{ whiteSpace: 'nowrap', padding: '8px 16px', fontSize: '0.85rem' }}
        >
          📉 Debt Payoff
        </button>
      </div>

      <div className="active-tool-wrap">
        {renderActiveTool()}
      </div>
    </section>
  );
}
