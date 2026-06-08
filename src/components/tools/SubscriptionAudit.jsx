import React, { useState, useEffect } from 'react';
import { storage } from '../../utils/storage';
import { Trash2, AlertTriangle, Lightbulb } from 'lucide-react';

const CATEGORIES = ['Entertainment', 'Gaming', 'Software/App', 'Health & Gym', 'Food & Delivery', 'Other'];
const USAGE_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'rarely', label: 'Rarely / Never' }
];

export default function SubscriptionAudit({ onActionTriggered }) {
  const [subs, setSubs] = useState([]);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('Entertainment');
  const [usage, setUsage] = useState('weekly');
  const [decision, setDecision] = useState('keep'); // keep or cancel
  const [linkedGoalId, setLinkedGoalId] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Load from storage
    const loadedSubs = storage.getSubscriptions();
    setSubs(loadedSubs);

    const loadedGoals = storage.getSavedGoals();
    setGoals(loadedGoals);
  }, []);

  const saveSubs = (updatedSubs) => {
    setSubs(updatedSubs);
    storage.setSubscriptions(updatedSubs);
    if (onActionTriggered) onActionTriggered();
  };

  const handleAddSub = (e) => {
    e.preventDefault();
    if (!name.trim() || !cost || isNaN(cost)) return;

    const newSub = {
      id: Date.now().toString(),
      name: name.trim(),
      cost: parseFloat(cost),
      category,
      usage,
      decision,
      linkedGoalId: decision === 'cancel' ? linkedGoalId : ''
    };

    const updated = [...subs, newSub];
    saveSubs(updated);

    // Reset inputs
    setName('');
    setCost('');
    setCategory('Entertainment');
    setUsage('weekly');
    setDecision('keep');
    setLinkedGoalId('');
  };

  const handleDeleteSub = (id) => {
    const updated = subs.filter(s => s.id !== id);
    saveSubs(updated);
  };

  const handleToggleDecision = (id) => {
    const updated = subs.map(s => {
      if (s.id === id) {
        const nextDecision = s.decision === 'keep' ? 'cancel' : 'keep';
        return { 
          ...s, 
          decision: nextDecision,
          linkedGoalId: nextDecision === 'cancel' ? s.linkedGoalId : ''
        };
      }
      return s;
    });
    saveSubs(updated);
  };

  const handleUpdateLinkedGoal = (id, goalId) => {
    const updated = subs.map(s => {
      if (s.id === id) {
        return { ...s, linkedGoalId: goalId };
      }
      return s;
    });
    saveSubs(updated);
  };

  // Calculations
  const totalMonthlyCost = subs.reduce((sum, s) => sum + s.cost, 0);
  const totalYearlyCost = totalMonthlyCost * 12;

  const canceledSubs = subs.filter(s => s.decision === 'cancel');
  const monthlySavings = canceledSubs.reduce((sum, s) => sum + s.cost, 0);
  const yearlySavings = monthlySavings * 12;

  // Underutilized suggestions
  const underutilized = subs.filter(s => s.usage === 'rarely' && s.decision === 'keep');

  return (
    <div className="card tool-card-full">
      <div className="tool-header">
        <div className="logo-icon" style={{ backgroundColor: 'var(--c-purple-muted)', color: 'var(--c-purple)' }}>
          🔄
        </div>
        <div>
          <h3>Subscription Audit Tool</h3>
          <p className="tool-sub">Audit your active subscriptions, find leakages, and redirect saved cash to your goals.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '24px', marginTop: '20px' }} className="grid-2-col">
        {/* Left: Add Subscription Form */}
        <div>
          <form onSubmit={handleAddSub} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontWeight: 600, fontSize: '0.9rem' }}>Add Subscription</h4>
            
            <div className="input-group">
              <label className="input-label" htmlFor="sub-name">Subscription Name</label>
              <input
                id="sub-name"
                type="text"
                className="input-field"
                placeholder="Netflix, Spotify, Gym, etc."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="sub-cost">Monthly Cost ($)</label>
              <input
                id="sub-cost"
                type="number"
                step="0.01"
                min="0"
                className="input-field"
                placeholder="14.99"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="sub-cat">Category</label>
              <select
                id="sub-cat"
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="sub-usage">How often do you use it?</label>
              <select
                id="sub-usage"
                className="input-field"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
              >
                {USAGE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="sub-decision">Initial Decision</label>
              <select
                id="sub-decision"
                className="input-field"
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
              >
                <option value="keep">Keep Active</option>
                <option value="cancel">Plan to Cancel</option>
              </select>
            </div>

            {decision === 'cancel' && goals.length > 0 && (
              <div className="input-group">
                <label className="input-label" htmlFor="link-goal-select">Redirect Savings To Savings Goal</label>
                <select
                  id="link-goal-select"
                  className="input-field"
                  value={linkedGoalId}
                  onChange={(e) => setLinkedGoalId(e.target.value)}
                >
                  <option value="">-- Choose Goal (Optional) --</option>
                  {goals.map(g => (
                    <option key={g.id} value={g.id}>{g.name || g.text}</option>
                  ))}
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Add to Audit
            </button>
          </form>
        </div>

        {/* Right: Subscriptions List & Analytics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Analytics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-input)', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Current Monthly Spend</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-red)' }}>${totalMonthlyCost.toFixed(2)}</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>${totalYearlyCost.toFixed(2)} / year</span>
            </div>

            <div style={{ padding: '12px', backgroundColor: 'var(--c-green-muted)', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Proposed Monthly Savings</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-green)' }}>+${monthlySavings.toFixed(2)}</div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>+${yearlySavings.toFixed(2)} / year saved</span>
            </div>
          </div>

          {/* Underutilized Alert */}
          {underutilized.length > 0 && (
            <div className="consequence-card animate-pop" style={{ borderLeft: '3px solid var(--c-amber)', padding: '10px 14px', backgroundColor: 'rgba(217, 119, 6, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--c-amber)', fontSize: '0.8rem' }}>
                <AlertTriangle size={16} />
                <span>Underutilized Subscriptions Found:</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                You have {underutilized.length} subscription{underutilized.length > 1 ? 's' : ''} you rarely use but are keeping:
                {" "}<strong>{underutilized.map(u => u.name).join(', ')}</strong>. Consider cancelling to save cash.
              </p>
            </div>
          )}

          {/* List of Subscriptions */}
          <div style={{ flexGrow: 1, maxHeight: '260px', overflowY: 'auto', border: '0.5px solid var(--border-color)', borderRadius: '8px', padding: '8px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '8px' }}>Active Subscriptions ({subs.length})</h4>
            
            {subs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No subscriptions audited yet. Add one on the left!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {subs.map(s => {
                  const linkedGoal = goals.find(g => g.id === s.linkedGoalId);
                  return (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', border: '0.5px solid var(--border-color)' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{s.name}</span>
                          <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--border-color)', color: 'var(--text-sub)' }}>{s.category}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '2px' }}>
                          Cost: ${s.cost.toFixed(2)}/mo | Usage: {s.usage.toUpperCase()}
                        </div>
                        {s.decision === 'cancel' && linkedGoal && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--c-green)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Lightbulb size={12} />
                            <span>Redirecting savings to goal: "{linkedGoal.name || linkedGoal.text}"</span>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={() => handleToggleDecision(s.id)}
                          className="btn"
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: s.decision === 'keep' ? 'var(--border-color)' : 'var(--c-green-muted)',
                            color: s.decision === 'keep' ? 'var(--text-main)' : 'var(--c-green)',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {s.decision === 'keep' ? 'Keep' : 'Cancel'}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteSub(s.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--c-red)', cursor: 'pointer', padding: '4px' }}
                          aria-label="Delete subscription"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
