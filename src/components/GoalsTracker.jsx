import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Target, Plus, Trash2, Calendar, Edit, Check } from 'lucide-react';

const CATEGORIES = ['Car', 'School', 'Emergency fund', 'Travel', 'Technology', 'Investing', 'Clothes', 'Other'];
const PRIORITIES = ['High', 'Medium', 'Low'];

export default function GoalsTracker({ onActionTriggered }) {
  const [goals, setGoals] = useState([]);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState('Emergency fund');
  const [priority, setPriority] = useState('Medium');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  useEffect(() => {
    // Convert old text goals to full goals objects if they are primitive
    const loaded = storage.getSavedGoals().map(g => {
      if (g.text && !g.name) {
        return {
          id: g.id || Date.now().toString(),
          name: g.text,
          targetAmount: 100,
          currentAmount: g.completed ? 100 : 0,
          targetDate: '',
          category: 'Other',
          priority: 'Medium',
          monthlyContribution: 10,
          completed: g.completed || false
        };
      }
      return g;
    });
    setGoals(loaded);
  }, []);

  const saveGoals = (updated) => {
    setGoals(updated);
    storage.setSavedGoals(updated);
    if (onActionTriggered) onActionTriggered();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !targetAmount || isNaN(targetAmount)) return;

    if (editingId) {
      // Edit mode
      const updated = goals.map(g => {
        if (g.id === editingId) {
          const curr = parseFloat(currentAmount) || 0;
          const targ = parseFloat(targetAmount);
          return {
            ...g,
            name: name.trim(),
            targetAmount: targ,
            currentAmount: curr,
            targetDate,
            category,
            priority,
            monthlyContribution: parseFloat(monthlyContribution) || 0,
            completed: curr >= targ
          };
        }
        return g;
      });
      saveGoals(updated);
      setEditingId(null);
    } else {
      // Create mode
      const curr = parseFloat(currentAmount) || 0;
      const targ = parseFloat(targetAmount);
      const newGoal = {
        id: Date.now().toString(),
        name: name.trim(),
        targetAmount: targ,
        currentAmount: curr,
        targetDate,
        category,
        priority,
        monthlyContribution: parseFloat(monthlyContribution) || 0,
        completed: curr >= targ
      };
      saveGoals([...goals, newGoal]);
    }

    // Reset Form
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setTargetDate('');
    setCategory('Emergency fund');
    setPriority('Medium');
    setMonthlyContribution('');
  };

  const handleEdit = (g) => {
    setEditingId(g.id);
    setName(g.name || g.text || '');
    setTargetAmount(g.targetAmount || 100);
    setCurrentAmount(g.currentAmount || 0);
    setTargetDate(g.targetDate || '');
    setCategory(g.category || 'Other');
    setPriority(g.priority || 'Medium');
    setMonthlyContribution(g.monthlyContribution || '');
  };

  const handleDelete = (id) => {
    const updated = goals.filter(g => g.id !== id);
    saveGoals(updated);
  };

  const handleToggleComplete = (id) => {
    const updated = goals.map(g => {
      if (g.id === id) {
        const nextCompleted = !g.completed;
        return { 
          ...g, 
          completed: nextCompleted, 
          currentAmount: nextCompleted ? g.targetAmount : 0 
        };
      }
      return g;
    });
    saveGoals(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div className="section-title-wrap">
        <div>
          <h2>Savings Goal Tracker</h2>
          <p className="section-subtitle">Plan and achieve targets by automating contributions and tracking remaining periods.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '20px' }} className="grid-2-col">
        {/* Left: Create/Edit Form */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={18} color="var(--primary)" />
            <span>{editingId ? 'Edit Savings Goal' : 'Add New Savings Goal'}</span>
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div className="input-group">
              <label className="input-label" htmlFor="goal-name">Goal Name</label>
              <input
                id="goal-name"
                type="text"
                className="input-field"
                placeholder="e.g. Save for a used car, laptop"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="goal-target">Target Amount ($)</label>
              <input
                id="goal-target"
                type="number"
                min="1"
                className="input-field"
                placeholder="100"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="goal-current">Current Saved Amount ($)</label>
              <input
                id="goal-current"
                type="number"
                min="0"
                className="input-field"
                placeholder="0"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="goal-date">Target Date</label>
              <input
                id="goal-date"
                type="date"
                className="input-field"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="goal-category">Category</label>
              <select
                id="goal-category"
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="goal-priority">Priority</label>
              <select
                id="goal-priority"
                className="input-field"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="goal-monthly">Monthly Contribution Amount ($)</label>
              <input
                id="goal-monthly"
                type="number"
                min="0"
                className="input-field"
                placeholder="Optional"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              {editingId ? 'Save Edits' : 'Create Goal'}
            </button>

            {editingId && (
              <button 
                type="button" 
                className="btn btn-secondary" 
                style={{ width: '100%', border: 'none' }}
                onClick={() => {
                  setEditingId(null);
                  setName('');
                  setTargetAmount('');
                  setCurrentAmount('');
                  setTargetDate('');
                  setMonthlyContribution('');
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Right: Goals List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={18} />
            <span>Active Goals ({goals.length})</span>
          </h3>

          {goals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)', fontSize: '0.85rem' }} className="card">
              No savings goals created yet. Use the form on the left to set up a target!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {goals.map(g => {
                const percent = Math.min(100, Math.round(((g.currentAmount || 0) / (g.targetAmount || 1)) * 100));
                const amountLeft = Math.max(0, g.targetAmount - g.currentAmount);
                
                // Days remaining
                let daysLeftText = "";
                let suggestedMonthly = null;
                if (g.targetDate) {
                  const today = new Date();
                  const target = new Date(g.targetDate);
                  const diffTime = target - today;
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  daysLeftText = diffDays > 0 ? `${diffDays} days remaining` : "Passed deadline";

                  const diffMonths = diffDays / 30.4;
                  if (diffMonths > 0 && amountLeft > 0) {
                    suggestedMonthly = Math.round(amountLeft / diffMonths);
                  }
                }

                // Encouraging messages
                let message = "Keep pushing, you can do it!";
                if (percent >= 100) message = "Goal Completed! Outstanding job! 🎉";
                else if (percent >= 80) message = "Almost there! The finish line is in sight! 🚀";
                else if (percent >= 50) message = "Halfway there! Keep up the momentum! 💪";

                return (
                  <div key={g.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderColor: g.completed ? 'var(--primary)' : 'var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h4 style={{ fontWeight: 700, fontSize: '1rem', textDecoration: g.completed ? 'line-through' : 'none' }}>
                            {g.name}
                          </h4>
                          <span style={{ fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', backgroundColor: 'var(--border-color)', color: 'var(--text-sub)' }}>
                            {g.category}
                          </span>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            padding: '1px 5px', 
                            borderRadius: '4px', 
                            backgroundColor: g.priority === 'High' ? 'var(--c-red-muted)' : g.priority === 'Low' ? 'var(--border-color)' : 'var(--c-blue-muted)',
                            color: g.priority === 'High' ? 'var(--c-red)' : g.priority === 'Low' ? 'var(--text-sub)' : 'var(--c-blue)'
                          }}>
                            {g.priority} Priority
                          </span>
                        </div>
                        
                        {daysLeftText && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={12} />
                            <span>{daysLeftText} | Target: {g.targetDate}</span>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleToggleComplete(g.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: g.completed ? 'var(--primary)' : 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          aria-label="Toggle Complete"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(g)}
                          style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer', padding: '4px' }}
                          aria-label="Edit Goal"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(g.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--c-red)', cursor: 'pointer', padding: '4px' }}
                          aria-label="Delete Goal"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Progress details */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                        <span>Saved: <strong>${g.currentAmount}</strong> of <strong>${g.targetAmount}</strong></span>
                        <span style={{ fontWeight: 600 }}>{percent}%</span>
                      </div>
                      <div className="progress-bar-container" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar-fill" 
                          style={{ width: `${percent}%`, backgroundColor: g.completed ? 'var(--primary)' : 'var(--primary)' }}
                        ></div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '0.5px solid var(--border-color)', paddingTop: '8px', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        {message}
                      </span>
                      {amountLeft > 0 && suggestedMonthly && (
                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                          Need ${suggestedMonthly}/mo
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
