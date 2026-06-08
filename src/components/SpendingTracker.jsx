import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, AlertTriangle, List } from 'lucide-react';

const EXPENSE_CATEGORIES = ['Food', 'Transportation', 'Shopping', 'Entertainment', 'Subscriptions', 'School', 'Savings', 'Other'];
const INCOME_CATEGORIES = ['Income', 'Allowance', 'Gig Work', 'Other'];
const METHODS = ['Debit', 'Credit Card', 'Cash', 'Apple Pay / Google Pay', 'Other'];

export default function SpendingTracker({ onActionTriggered }) {
  const [transactions, setTransactions] = useState([]);
  
  // Form State
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense'); // expense or income
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [method, setMethod] = useState('Debit');

  useEffect(() => {
    setTransactions(storage.getTransactions());
  }, []);

  // Update Category defaults on type change
  useEffect(() => {
    if (type === 'expense') {
      setCategory('Food');
    } else {
      setCategory('Income');
    }
  }, [type]);

  const saveTransactions = (updated) => {
    setTransactions(updated);
    storage.setTransactions(updated);
    if (onActionTriggered) onActionTriggered();
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;

    const newTx = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category,
      date,
      note: note.trim() || category,
      method
    };

    const updated = [newTx, ...transactions];
    saveTransactions(updated);

    // Reset Form
    setAmount('');
    setNote('');
  };

  const handleDeleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    saveTransactions(updated);
  };

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netCashFlow = totalIncome - totalExpense;

  // Group expenses by category for chart
  const categoryDataObj = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryDataObj[t.category] = (categoryDataObj[t.category] || 0) + t.amount;
    });

  const CHART_COLORS = ['#1D9E75', '#2563EB', '#9333EA', '#EF4444', '#F59E0B', '#10B981', '#EC4899', '#64748B'];

  const chartData = Object.keys(categoryDataObj).map((cat, idx) => ({
    name: cat,
    value: Math.round(categoryDataObj[cat]),
    color: CHART_COLORS[idx % CHART_COLORS.length]
  }));

  // Identify highest spending category
  let highestCategory = "None";
  let highestAmount = 0;
  Object.keys(categoryDataObj).forEach(cat => {
    if (categoryDataObj[cat] > highestAmount) {
      highestAmount = categoryDataObj[cat];
      highestCategory = cat;
    }
  });

  // Warn if spending is high
  const spendingRatio = totalIncome > 0 ? (totalExpense / totalIncome) : 0;
  const isHighSpending = totalExpense > 0 && (spendingRatio > 0.8 || (totalIncome === 0 && totalExpense > 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title block */}
      <div className="section-title-wrap">
        <div>
          <h2>Daily Spending Tracker</h2>
          <p className="section-subtitle">Track your cash inflows and outflows to build budgeting awareness.</p>
        </div>
      </div>

      {/* Cash Flow Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }} className="grid-3">
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            <ArrowUpRight size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Total Monthly Income</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-green)' }}>${totalIncome.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: 'var(--c-red-muted)', color: 'var(--c-red)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            <ArrowDownRight size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Total Monthly Expenses</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--c-red)' }}>${totalExpense.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ padding: '16px', backgroundColor: 'var(--bg-input)', border: '0.5px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ backgroundColor: netCashFlow >= 0 ? 'var(--c-green-muted)' : 'var(--c-red-muted)', color: netCashFlow >= 0 ? 'var(--c-green)' : 'var(--c-red)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}>
            💵
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Net Cash Flow</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: netCashFlow >= 0 ? 'var(--c-green)' : 'var(--c-red)' }}>
              {netCashFlow >= 0 ? '+' : ''}${netCashFlow.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form, Chart, Transaction List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '20px' }} className="grid-2-col">
        
        {/* Left Side: Form */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={18} color="var(--primary)" />
            <span>Add Transaction</span>
          </h3>

          <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div className="input-group">
              <label className="input-label">Transaction Type</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  type="button"
                  className={`btn ${type === 'expense' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexGrow: 1, padding: '8px 0', fontSize: '0.85rem' }}
                  onClick={() => setType('expense')}
                >
                  Expense 💸
                </button>
                <button
                  type="button"
                  className={`btn ${type === 'income' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexGrow: 1, padding: '8px 0', fontSize: '0.85rem' }}
                  onClick={() => setType('income')}
                >
                  Income 💰
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="tx-amount">Amount ($)</label>
              <input
                id="tx-amount"
                type="number"
                step="0.01"
                min="0.01"
                className="input-field"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="tx-category">Category</label>
              <select
                id="tx-category"
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {type === 'expense' ? (
                  EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                ) : (
                  INCOME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)
                )}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="tx-date">Date</label>
              <input
                id="tx-date"
                type="date"
                className="input-field"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="tx-note">Note / Memo</label>
              <input
                id="tx-note"
                type="text"
                className="input-field"
                placeholder="e.g. Bubble tea, allowance"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="tx-method">Payment Method</label>
              <select
                id="tx-method"
                className="input-field"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              Add Transaction
            </button>
          </form>
        </div>

        {/* Right Side: Charts & List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Chart Card */}
          <div className="card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>Category Breakdown</h3>
            
            {chartData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No expenses logged to chart yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', alignItems: 'center' }}>
                {/* Donut Chart */}
                <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {chartData.map((entry, idx) => (
                          <Cell key={`cell-${idx}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Info block */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                    Highest Spending: <strong>{highestCategory}</strong> (${highestAmount.toFixed(2)})
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '100px', overflowY: 'auto' }}>
                    {chartData.map(item => (
                      <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></div>
                        <span style={{ color: 'var(--text-sub)' }}>{item.name}: ${item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* High Spending Warning Notification */}
          {isHighSpending && (
            <div className="consequence-card animate-pop" style={{ borderLeft: '3px solid var(--c-red)', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '10px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--c-red)', fontSize: '0.8rem' }}>
                <AlertTriangle size={16} />
                <span>Budget Warning Alert:</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                Your expenses are running high relative to your income. Try to review your subscription audit or use the 50/30/20 builder to cut wants.
              </p>
            </div>
          )}

          {/* Transaction List Card */}
          <div className="card" style={{ flexGrow: 1, maxHeight: '250px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <List size={16} />
              <span>Recent Transactions ({transactions.length})</span>
            </h3>

            {transactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                Empty state. Log your allowance or purchase above to get started!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {transactions.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', border: '0.5px solid var(--border-color)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.note}</span>
                        <span style={{ fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', backgroundColor: 'var(--border-color)', color: 'var(--text-sub)' }}>{t.category}</span>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {t.date} via {t.method}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: t.type === 'income' ? 'var(--c-green)' : 'var(--text-main)' }}>
                        {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteTransaction(t.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--c-red)', cursor: 'pointer', padding: '4px' }}
                        aria-label="Delete transaction"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
