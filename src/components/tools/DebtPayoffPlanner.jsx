import React, { useState } from 'react';
import { Calendar, TrendingDown, Award } from 'lucide-react';

export default function DebtPayoffPlanner() {
  const [debtName, setDebtName] = useState('Credit Card Balance');
  const [balance, setBalance] = useState(1200);
  const [interestRate, setInterestRate] = useState(19.99); // standard CC interest
  const [minPayment, setMinPayment] = useState(35);
  const [extraPayment, setExtraPayment] = useState(40);

  // Simulation logic
  const runSimulation = (startingBalance, rate, monthlyPayment) => {
    let currentBalance = startingBalance;
    const monthlyRate = (rate / 100) / 12;
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 360; // 30 year limit

    if (currentBalance > 0 && monthlyPayment <= currentBalance * monthlyRate) {
      // Payment does not cover monthly interest, debt grows infinitely
      return { infinite: true, months: maxMonths, totalInterest: Infinity };
    }

    while (currentBalance > 0 && months < maxMonths) {
      const interest = currentBalance * monthlyRate;
      totalInterest += interest;
      
      const newBalance = currentBalance + interest;
      if (monthlyPayment >= newBalance) {
        currentBalance = 0;
      } else {
        currentBalance = newBalance - monthlyPayment;
      }
      months++;
    }

    return { infinite: false, months, totalInterest: Math.round(totalInterest * 100) / 100 };
  };

  const minResult = runSimulation(balance, interestRate, minPayment);
  const extraResult = runSimulation(balance, interestRate, minPayment + extraPayment);

  const interestSaved = (!minResult.infinite && !extraResult.infinite) 
    ? Math.max(0, Math.round((minResult.totalInterest - extraResult.totalInterest) * 100) / 100) 
    : 0;

  const monthsSaved = (!minResult.infinite && !extraResult.infinite)
    ? Math.max(0, minResult.months - extraResult.months)
    : 0;

  const displayTime = (totalMonths) => {
    if (totalMonths >= 360) return "30+ years (Max Limit)";
    const yrs = Math.floor(totalMonths / 12);
    const mos = totalMonths % 12;
    return yrs > 0 
      ? `${yrs} yr${yrs > 1 ? 's' : ''} ${mos > 0 ? `${mos} mo${mos > 1 ? 's' : ''}` : ''}`
      : `${mos} mo${mos > 1 ? 's' : ''}`;
  };

  return (
    <div className="card tool-card-full">
      <div className="tool-header">
        <div className="logo-icon" style={{ backgroundColor: 'var(--c-red-muted)', color: 'var(--c-red)' }}>
          📉
        </div>
        <div>
          <h3>Debt Payoff Planner</h3>
          <p className="tool-sub">See how small extra payments shave off years of debt interest payments.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', marginTop: '20px' }} className="grid-2-col">
        {/* Left: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="input-group">
            <label className="input-label" htmlFor="debt-name">Debt Name</label>
            <input
              id="debt-name"
              type="text"
              className="input-field"
              value={debtName}
              onChange={(e) => setDebtName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="debt-balance">Debt Balance ($)</label>
            <input
              id="debt-balance"
              type="number"
              className="input-field"
              value={balance}
              min="0"
              onChange={(e) => setBalance(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="debt-rate">Interest Rate (Annual %)</label>
            <input
              id="debt-rate"
              type="number"
              className="input-field"
              value={interestRate}
              min="0"
              step="0.01"
              onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="min-payment">Minimum Monthly Payment ($)</label>
            <input
              id="min-payment"
              type="number"
              className="input-field"
              value={minPayment}
              min="1"
              onChange={(e) => setMinPayment(Math.max(1, parseFloat(e.target.value) || 1))}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="extra-payment">Extra Monthly Payment ($)</label>
            <input
              id="extra-payment"
              type="number"
              className="input-field"
              value={extraPayment}
              min="0"
              onChange={(e) => setExtraPayment(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>
        </div>

        {/* Right: Results comparison */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-input)', borderRadius: '8px', border: '0.5px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>Repayment Timelines Comparison:</h4>
            
            {/* Minimum payment result */}
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-card)', borderRadius: '6px', border: '0.5px solid var(--border-color)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-sub)' }}>Paying Minimum Only (${minPayment}/mo):</div>
              {minResult.infinite ? (
                <div style={{ color: 'var(--c-red)', fontSize: '0.9rem', fontWeight: 700, marginTop: '4px' }}>
                  ⚠️ Debt grows infinitely! (Payment too low for interest)
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.9rem' }}>
                  <span>Time: <strong>{displayTime(minResult.months)}</strong></span>
                  <span>Interest: <strong style={{ color: 'var(--c-red)' }}>${minResult.totalInterest.toFixed(2)}</strong></span>
                </div>
              )}
            </div>

            {/* Extra payment result */}
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-card)', borderRadius: '6px', border: '0.5px solid var(--border-color)', borderColor: 'var(--primary)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
                Paying Min + Extra (${minPayment + extraPayment}/mo):
              </div>
              {extraResult.infinite ? (
                <div style={{ color: 'var(--c-red)', fontSize: '0.9rem', fontWeight: 700, marginTop: '4px' }}>
                  ⚠️ Debt grows infinitely!
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.9rem' }}>
                  <span>Time: <strong>{displayTime(extraResult.months)}</strong></span>
                  <span>Interest: <strong>${extraResult.totalInterest.toFixed(2)}</strong></span>
                </div>
              )}
            </div>

            {/* Summary statistics */}
            {!minResult.infinite && !extraResult.infinite && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderTop: '0.5px solid var(--border-color)', paddingTop: '12px' }}>
                <div style={{ backgroundColor: 'var(--c-green-muted)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Interest Saved</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-green)' }}>
                    ${interestSaved.toFixed(2)}
                  </div>
                </div>
                <div style={{ backgroundColor: 'var(--c-blue-muted)', padding: '8px', borderRadius: '6px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>Months Saved</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--c-blue)' }}>
                    {monthsSaved} mo{monthsSaved > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Education content */}
          <div className="consequence-card" style={{ marginTop: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} />
              <span>Strategies for Debt Repayment:</span>
            </h4>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p><strong>1. Debt Avalanche (Mathematical Winner):</strong> Pay the absolute minimum on all debts, and put all your extra cash towards the debt with the <em>highest interest rate</em>. This saves you the most money over time.</p>
              <p style={{ marginTop: '4px' }}><strong>2. Debt Snowball (Psychological Winner):</strong> Pay the minimum on all debts, and put all your extra cash towards the debt with the <em>smallest balance</em>. Checking off a debt quickly builds great momentum!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
