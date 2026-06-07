import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { PieChart as PieIcon, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';

export default function Tools() {
  // 1. Budget Builder State
  const [monthlyIncome, setMonthlyIncome] = useState(1200);

  const needsAmount = Math.round(monthlyIncome * 0.5);
  const wantsAmount = Math.round(monthlyIncome * 0.3);
  const savingsAmount = Math.round(monthlyIncome * 0.2);

  const budgetChartData = [
    { name: 'Needs (50%)', value: needsAmount, color: '#1D9E75' }, // Green
    { name: 'Wants (30%)', value: wantsAmount, color: '#2563EB' }, // Blue
    { name: 'Savings (20%)', value: savingsAmount, color: '#9333EA' } // Purple
  ];

  // 2. What-If Calculator State
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

  // 3. Credit Score Simulator State
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

  // Calculate score starting from 700
  let simulatedScore = 700;
  if (creditToggles.paidOnTime) simulatedScore += 35;
  if (creditToggles.missedPayment) simulatedScore -= 75;
  if (creditToggles.highUtilization) simulatedScore -= 60;
  if (creditToggles.lowBalance) simulatedScore += 25;
  if (creditToggles.newAccounts) simulatedScore -= 30;

  // Clamp score
  simulatedScore = Math.max(300, Math.min(simulatedScore, 900));

  const getCreditRating = (score) => {
    if (score >= 760) return { label: 'Excellent', className: 'rating-excellent' };
    if (score >= 660) return { label: 'Good', className: 'rating-good' };
    if (score >= 560) return { label: 'Fair', className: 'rating-fair' };
    return { label: 'Poor', className: 'rating-poor' };
  };

  const rating = getCreditRating(simulatedScore);

  return (
    <section className="tools-sec" id="tools">
      <div className="section-title-wrap">
        <div>
          <h2>Interactive Tools</h2>
          <p className="section-subtitle">Play with the sliders and toggles to see how your choices shape your money.</p>
        </div>
      </div>

      <div className="grid-3">
        {/* Tool 1: Budget Builder */}
        <div className="card tool-card">
          <div className="tool-header">
            <div className="logo-icon" style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)' }}>
              <PieIcon size={18} />
            </div>
            <h3 style={{ fontSize: '1.2rem' }}>50/30/20 Budget Builder</h3>
          </div>

          <div className="tool-body">
            <div className="input-group">
              <label className="input-label" htmlFor="monthly-income-input">Monthly Take-Home Income</label>
              <input
                id="monthly-income-input"
                type="number"
                className="input-field"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
              />
            </div>

            {/* Recharts Pie Chart */}
            <div style={{ width: '100%', height: '160px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
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
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Total</span>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>${monthlyIncome}</div>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="budget-breakdown">
              <div className="breakdown-row">
                <div className="color-dot" style={{ backgroundColor: '#1D9E75' }}></div>
                <span className="category-name">Needs (50%)</span>
                <span className="category-amount">${needsAmount}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', paddingLeft: '20px', marginTop: '-8px' }}>
                Rent share, transit pass, groceries, phone bill.
              </p>

              <div className="breakdown-row">
                <div className="color-dot" style={{ backgroundColor: '#2563EB' }}></div>
                <span className="category-name">Wants (30%)</span>
                <span className="category-amount">${wantsAmount}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', paddingLeft: '20px', marginTop: '-8px' }}>
                Hanging out, fast food, streaming, trendy clothes.
              </p>

              <div className="breakdown-row">
                <div className="color-dot" style={{ backgroundColor: '#9333EA' }}></div>
                <span className="category-name">Savings (20%)</span>
                <span className="category-amount">${savingsAmount}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', paddingLeft: '20px', marginTop: '-8px' }}>
                Emergency fund, future TFSA deposits, big goals.
              </p>
            </div>
          </div>
        </div>

        {/* Tool 2: What-If Calculator */}
        <div className="card tool-card" style={{ gridColumn: 'span 1' }}>
          <div className="tool-header">
            <div className="logo-icon" style={{ backgroundColor: 'var(--c-blue-muted)', color: 'var(--c-blue)' }}>
              <TrendingUp size={18} />
            </div>
            <h3 style={{ fontSize: '1.2rem' }}>What-If Growth Calculator</h3>
          </div>

          <div className="tool-body">
            {/* Monthly deposit slider */}
            <div className="slider-group">
              <div className="slider-labels">
                <label htmlFor="monthly-saving-slider">Monthly Savings</label>
                <span className="slider-value">${monthlyDeposit}/mo</span>
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

            {/* Time slider */}
            <div className="slider-group">
              <div className="slider-labels">
                <label htmlFor="years-slider">Time Horizon</label>
                <span className="slider-value">{years} Years</span>
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

            {/* Interest slider */}
            <div className="slider-group">
              <div className="slider-labels">
                <label htmlFor="interest-rate-slider">Annual Return Rate</label>
                <span className="slider-value">{interestRate}%</span>
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

            {/* Projections graph */}
            <div style={{ width: '100%', height: '140px' }}>
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

            {/* Results display */}
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
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>${finalAmount.toLocaleString()}</div>
              </div>
            </div>

            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
              Disclaimer: This is an estimate for learning only. Actual returns vary.
            </p>
          </div>
        </div>

        {/* Tool 3: Credit Score Simulator */}
        <div className="card tool-card">
          <div className="tool-header">
            <div className="logo-icon" style={{ backgroundColor: 'var(--c-purple-muted)', color: 'var(--c-purple)' }}>
              <HelpCircle size={18} />
            </div>
            <h3 style={{ fontSize: '1.2rem' }}>Credit Score Simulator</h3>
          </div>

          <div className="tool-body">
            {/* Visual Gauge */}
            <div className="credit-gauge-container">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Simulated Score</span>
              <div className="credit-score-big" style={{ color: simulatedScore >= 700 ? 'var(--c-green)' : simulatedScore >= 600 ? 'var(--c-blue)' : simulatedScore >= 500 ? 'var(--c-amber)' : 'var(--c-red)' }}>
                {simulatedScore}
              </div>
              <div className={`credit-rating-pill ${rating.className}`}>
                {rating.label}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div 
                className={`toggle-card ${creditToggles.paidOnTime ? 'active' : ''}`}
                onClick={() => handleToggle('paidOnTime')}
              >
                <div className="toggle-bullet"></div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600 }}>Pay phone & credit card bills on time</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Adds +35 points</div>
                </div>
              </div>

              <div 
                className={`toggle-card ${creditToggles.missedPayment ? 'active' : ''}`}
                onClick={() => handleToggle('missedPayment')}
              >
                <div className="toggle-bullet"></div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600 }}>Miss a bill or card payment deadline</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Subtracts -75 points</div>
                </div>
              </div>

              <div 
                className={`toggle-card ${creditToggles.highUtilization ? 'active' : ''}`}
                onClick={() => handleToggle('highUtilization')}
              >
                <div className="toggle-bullet"></div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600 }}>Max out credit card limit (90%+)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Subtracts -60 points</div>
                </div>
              </div>

              <div 
                className={`toggle-card ${creditToggles.lowBalance ? 'active' : ''}`}
                onClick={() => handleToggle('lowBalance')}
              >
                <div className="toggle-bullet"></div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600 }}>Keep card balances near zero</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Adds +25 points</div>
                </div>
              </div>

              <div 
                className={`toggle-card ${creditToggles.newAccounts ? 'active' : ''}`}
                onClick={() => handleToggle('newAccounts')}
              >
                <div className="toggle-bullet"></div>
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 600 }}>Apply for 3 new store cards in one week</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Habit: Subtracts -30 points</div>
                </div>
              </div>
            </div>
            
            <div className="consequence-card" style={{ marginTop: '0', backgroundColor: 'var(--bg-input)', borderColor: 'var(--border-color)' }}>
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
    </section>
  );
}
