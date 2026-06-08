import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

const PROVINCES = [
  { code: 'ON', name: 'Ontario', rate: 0.0505 },
  { code: 'QC', name: 'Quebec', rate: 0.1500 },
  { code: 'BC', name: 'British Columbia', rate: 0.0506 },
  { code: 'AB', name: 'Alberta', rate: 0.1000 },
  { code: 'SK', name: 'Saskatchewan', rate: 0.1050 },
  { code: 'MB', name: 'Manitoba', rate: 0.1080 },
  { code: 'NS', name: 'Nova Scotia', rate: 0.0879 },
  { code: 'NB', name: 'New Brunswick', rate: 0.0940 },
  { code: 'NL', name: 'Newfoundland', rate: 0.0870 },
  { code: 'PE', name: 'PEI', rate: 0.0980 }
];

export default function PaychequeSimulator() {
  const [hourlyWage, setHourlyWage] = useState(16.55); // ON minimum wage
  const [hoursWorked, setHoursWorked] = useState(40);
  const [provinceCode, setProvinceCode] = useState('ON');
  const [frequency, setFrequency] = useState('bi-weekly'); // weekly, bi-weekly, monthly
  const [benefitsDeduction, setBenefitsDeduction] = useState(0);

  const selectedProv = PROVINCES.find(p => p.code === provinceCode) || PROVINCES[0];

  // Calculations
  const grossPay = Math.round(hourlyWage * hoursWorked * 100) / 100;
  
  // Tax calculations (Simplified education model)
  // Baseline federal tax is 15%
  const fedTaxRate = 0.15;
  const provTaxRate = selectedProv.rate;

  const fedTax = Math.round(grossPay * fedTaxRate * 100) / 100;
  const provTax = Math.round(grossPay * provTaxRate * 100) / 100;

  // CPP (Canada Pension Plan): 5.95%
  const cpp = Math.round(grossPay * 0.0595 * 100) / 100;

  // EI (Employment Insurance): 1.66%
  const ei = Math.round(grossPay * 0.0166 * 100) / 100;

  // Total deductions
  const totalDeductions = Math.round((fedTax + provTax + cpp + ei + Number(benefitsDeduction)) * 100) / 100;

  // Take-home pay (clamped at 0)
  const netPay = Math.max(0, Math.round((grossPay - totalDeductions) * 100) / 100);

  // 50/30/20 allocation of take-home pay
  const needs = Math.round(netPay * 0.5);
  const wants = Math.round(netPay * 0.3);
  const savings = Math.round(netPay * 0.2);

  return (
    <div className="card tool-card-full">
      <div className="tool-header">
        <div className="logo-icon" style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)' }}>
          💵
        </div>
        <div>
          <h3>First Paycheque Simulator</h3>
          <p className="tool-sub">Understand your deductions and see what you actually take home.</p>
        </div>
      </div>

      <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '20px' }}>
        {/* Left Side: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="input-group">
            <label className="input-label" htmlFor="hourly-wage">Hourly Wage ($)</label>
            <input
              id="hourly-wage"
              type="number"
              className="input-field"
              value={hourlyWage}
              min="0"
              step="0.01"
              onChange={(e) => setHourlyWage(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="hours-worked">Hours Worked (Per Pay Period)</label>
            <input
              id="hours-worked"
              type="number"
              className="input-field"
              value={hoursWorked}
              min="0"
              step="0.5"
              onChange={(e) => setHoursWorked(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="province-select">Province (Canada)</label>
            <select
              id="province-select"
              className="input-field"
              value={provinceCode}
              onChange={(e) => setProvinceCode(e.target.value)}
            >
              {PROVINCES.map(p => (
                <option key={p.code} value={p.code}>{p.name} ({Math.round(p.rate * 1000) / 10}%)</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="benefits-deduction">Other Optional Deductions (e.g. health benefits, union dues)</label>
            <input
              id="benefits-deduction"
              type="number"
              className="input-field"
              value={benefitsDeduction}
              min="0"
              step="1"
              onChange={(e) => setBenefitsDeduction(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>
        </div>

        {/* Right Side: Projections and Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="summary-banner" style={{ backgroundColor: 'var(--bg-input)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-sub)' }}>Gross Earnings:</span>
              <span style={{ fontWeight: 700 }}>${grossPay.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderLeft: '2px solid var(--border-color)', paddingLeft: '12px', margin: '12px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Fed Tax (15%):</span>
                <span>-${fedTax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Prov Tax ({Math.round(provTaxRate * 1000)/10}%):</span>
                <span>-${provTax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>CPP deduction (5.95%):</span>
                <span>-${cpp.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>EI deduction (1.66%):</span>
                <span>-${ei.toFixed(2)}</span>
              </div>
              {benefitsDeduction > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Benefits & Dues:</span>
                  <span>-${Number(benefitsDeduction).toFixed(2)}</span>
                </div>
              )}
            </div>

            <div style={{ borderTop: '0.5px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Estimated Net Take-Home:</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--c-green)' }}>${netPay.toFixed(2)}</span>
            </div>
          </div>

          {/* Allocation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>💡 Suggested 50/30/20 Allocation:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ padding: '8px', backgroundColor: 'var(--c-green-muted)', border: '0.5px solid var(--border-color)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Needs (50%)</div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>${needs}</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--c-blue-muted)', border: '0.5px solid var(--border-color)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Wants (30%)</div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>${wants}</div>
              </div>
              <div style={{ padding: '8px', backgroundColor: 'var(--c-purple-muted)', border: '0.5px solid var(--border-color)', borderRadius: '6px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>Savings (20%)</div>
                <div style={{ fontSize: '1rem', fontWeight: 700 }}>${savings}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax explanations */}
      <div className="consequence-card" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
          <Info size={16} />
          <span>Understanding Your Deductions:</span>
        </h4>
        <ul style={{ fontSize: '0.8rem', color: 'var(--text-sub)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li><strong>Income Tax (Federal & Provincial):</strong> Money deducted by the government to fund public services like schools, healthcare, and transit. If you earn under the basic personal limit (~$15,000/yr), you get this back as a refund when you file taxes!</li>
          <li><strong>CPP (Canada Pension Plan):</strong> A mandatory national retirement pension program. You contribute to this starting at age 18, securing money for when you retire.</li>
          <li><strong>EI (Employment Insurance):</strong> Protects workers by providing temporary income support if you lose your job through no fault of your own (e.g. layouts).</li>
        </ul>
      </div>

      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px', fontStyle: 'italic' }}>
        Disclaimer: This tool calculates educational estimates only. Real paycheck withholdings depend on tax brackets, TD1 forms, and annual income projections.
      </p>
    </div>
  );
}
