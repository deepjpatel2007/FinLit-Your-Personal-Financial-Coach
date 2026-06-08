import React, { useState } from 'react';
import { Target, Calendar, CheckCircle } from 'lucide-react';

export default function EmergencyFundCalc() {
  const [monthlyExpenses, setMonthlyExpenses] = useState(400);
  const [currentSavings, setCurrentSavings] = useState(150);
  const [targetMonths, setTargetMonths] = useState(3); // 1, 3, or 6
  const [monthlyContribution, setMonthlyContribution] = useState(50);

  // Calculations
  const targetAmount = monthlyExpenses * targetMonths;
  const amountNeeded = Math.max(0, targetAmount - currentSavings);
  
  const progressPercent = targetAmount > 0 
    ? Math.min(100, Math.round((currentSavings / targetAmount) * 100)) 
    : 0;

  // Time to complete
  const monthsToComplete = monthlyContribution > 0 
    ? Math.ceil(amountNeeded / monthlyContribution) 
    : Infinity;

  return (
    <div className="card tool-card-full">
      <div className="tool-header">
        <div className="logo-icon" style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)' }}>
          🛡️
        </div>
        <div>
          <h3>Emergency Fund Calculator</h3>
          <p className="tool-sub">Build a cash buffer so you never have to borrow money for unexpected emergencies.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', marginTop: '20px' }} className="grid-2-col">
        {/* Left: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="input-group">
            <label className="input-label" htmlFor="monthly-essential-exp">Monthly Essential Expenses ($)</label>
            <input
              id="monthly-essential-exp"
              type="number"
              className="input-field"
              value={monthlyExpenses}
              min="0"
              onChange={(e) => setMonthlyExpenses(Math.max(0, parseFloat(e.target.value) || 0))}
            />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Include: phone bill, transit, rent share, basic groceries.</span>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="current-emergency-sav">Current Emergency Savings ($)</label>
            <input
              id="current-emergency-sav"
              type="number"
              className="input-field"
              value={currentSavings}
              min="0"
              onChange={(e) => setCurrentSavings(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Target Buffer Size</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              {[1, 3, 6].map(m => (
                <button
                  key={m}
                  type="button"
                  className={`btn ${targetMonths === m ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexGrow: 1, padding: '8px 0', fontSize: '0.85rem' }}
                  onClick={() => setTargetMonths(m)}
                >
                  {m} Month{m > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="monthly-saving-budget">Monthly Savings Budget ($)</label>
            <input
              id="monthly-saving-budget"
              type="number"
              className="input-field"
              value={monthlyContribution}
              min="1"
              onChange={(e) => setMonthlyContribution(Math.max(1, parseFloat(e.target.value) || 1))}
            />
          </div>
        </div>

        {/* Right: Results and explanations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Main output indicators */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-input)', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderBottom: '0.5px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Target Fund Goal</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>${targetAmount.toLocaleString()}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Still Needed</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: amountNeeded > 0 ? 'var(--c-amber)' : 'var(--c-green)' }}>
                  ${amountNeeded.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-sub)' }}>Fund Progress</span>
                <span style={{ fontWeight: 600 }}>{progressPercent}%</span>
              </div>
              <div className="progress-bar-container" style={{ height: '8px' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${progressPercent}%`, backgroundColor: 'var(--primary)' }}
                ></div>
              </div>
            </div>

            {amountNeeded === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--c-green)', fontWeight: 600, marginTop: '8px' }}>
                <CheckCircle size={16} />
                <span>Excellent! Your emergency fund is fully funded.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '8px' }}>
                <Calendar size={16} />
                <span>At ${monthlyContribution}/mo, you will reach this in <strong>{monthsToComplete === Infinity ? 'never' : `${monthsToComplete} month${monthsToComplete > 1 ? 's' : ''}`}</strong>.</span>
              </div>
            )}
          </div>

          {/* Sinking Fund Suggestions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>💡 Milestone Target Breakdowns:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--bg-card)', border: '0.5px solid var(--border-color)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>1 Month Buffer</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>${monthlyExpenses}</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--bg-card)', border: '0.5px solid var(--border-color)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>3 Month Buffer</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>${monthlyExpenses * 3}</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--bg-card)', border: '0.5px solid var(--border-color)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>6 Month Buffer</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>${monthlyExpenses * 6}</div>
              </div>
            </div>
          </div>

          <div className="consequence-card" style={{ marginTop: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>Why Emergency Funds Matter:</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
              Your phone screen cracks, your bike gets a flat tire, or your student laptop crashes. If you have cash saved, it is a minor inconvenience. If you don't, you might have to borrow on high-interest credit cards (20%+ interest), which is the #1 way teens fall into credit debt traps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
