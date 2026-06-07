import React, { useState } from 'react';
import { scenarios } from '../data/scenarios';
import { storage } from '../utils/storage';
import { X, Play, Clock, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ScenarioCard({ xp, setXp, onAwardXp }) {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [chosenOption, setChosenOption] = useState(null);
  const [completions, setCompletions] = useState(storage.getScenarioCompletions());

  const handleOpenScenario = (scenario) => {
    setSelectedScenario(scenario);
    setChosenOption(null);
  };

  const handleChoose = (idx) => {
    setChosenOption(idx);
  };

  const handleFinish = () => {
    if (selectedScenario && chosenOption !== null) {
      const choice = selectedScenario.choices[chosenOption];
      
      // Update completion record
      const scenarioId = selectedScenario.id;
      if (!completions.includes(scenarioId)) {
        const newCompletions = [...completions, scenarioId];
        storage.setScenarioCompletions(newCompletions);
        setCompletions(newCompletions);
        
        // Award XP
        const earnedXp = choice.xpReward || 20;
        const currentXp = storage.getXP();
        const updatedXp = currentXp + earnedXp;
        storage.setXP(updatedXp);
        onAwardXp(earnedXp);
      }
    }
    setSelectedScenario(null);
    setChosenOption(null);
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'var(--c-green)';
      case 'Medium': return 'var(--c-amber)';
      case 'Hard': return 'var(--c-red)';
      default: return 'var(--text-sub)';
    }
  };

  return (
    <section className="tools-sec" id="scenarios" style={{ borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '60px' }}>
      <div className="section-title-wrap">
        <div>
          <h2>Real Talk Scenarios</h2>
          <p className="section-subtitle">Make your choices. See the consequences. Learn the lessons.</p>
        </div>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => {
          const isCompleted = completions.includes(scenario.id);
          return (
            <div key={scenario.id} className="card scenario-card card-hover" onClick={() => handleOpenScenario(scenario)}>
              <div>
                <div className="scenario-badge-row">
                  <span className="badge" style={{ backgroundColor: 'var(--bg-input)', color: getDifficultyColor(scenario.difficulty), fontSize: '0.7rem' }}>
                    {scenario.difficulty}
                  </span>
                  <span className="badge" style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-sub)', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={10} />
                    {scenario.time}
                  </span>
                  {isCompleted && (
                    <span className="badge" style={{ backgroundColor: 'var(--c-green-muted)', color: 'var(--c-green)', fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={10} />
                      Done
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '8px 0' }}>
                  {scenario.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {scenario.intro}
                </p>
              </div>

              <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px', justifyContent: 'center', width: '100%' }}>
                <Play size={12} fill="currentColor" /> {isCompleted ? 'Replay Story' : 'Start Story'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Decision Story Modal */}
      {selectedScenario && (
        <div className="modal-overlay">
          <div className="modal-content animate-pop">
            <button className="modal-close" onClick={() => setSelectedScenario(null)}>
              <X size={20} />
            </button>

            <span className="badge" style={{ backgroundColor: 'var(--bg-input)', color: getDifficultyColor(selectedScenario.difficulty), fontSize: '0.75rem', marginBottom: '8px' }}>
              {selectedScenario.difficulty} Difficulty
            </span>
            <h2 className="modal-title">{selectedScenario.title}</h2>
            
            <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', margin: '14px 0' }}>
              {selectedScenario.intro}
            </p>

            {chosenOption === null ? (
              /* Step 1: Render Choice Buttons */
              <div className="modal-choices">
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-sub)', fontWeight: 600, marginBottom: '6px' }}>
                  WHAT DO YOU DO?
                </h4>
                {selectedScenario.choices.map((choice, idx) => (
                  <button key={idx} className="choice-btn" onClick={() => handleChoose(idx)}>
                    {choice.text}
                  </button>
                ))}
              </div>
            ) : (
              /* Step 2: Render Selection Consequences and Lessons */
              <div className="consequence-card animate-pop">
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={16} /> The Consequence
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '6px', lineHeight: '1.5' }}>
                    {selectedScenario.choices[chosenOption].consequence}
                  </p>
                </div>

                <div style={{ marginTop: '14px', borderTop: '0.5px solid rgba(255,255,255,0.15)', paddingTop: '14px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    💡 The Lesson Learned
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '6px', lineHeight: '1.5' }}>
                    {selectedScenario.choices[chosenOption].lesson}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 600, marginTop: '12px', fontSize: '0.9rem' }}>
                  <Award size={18} />
                  <span>
                    +{selectedScenario.choices[chosenOption].xpReward} XP Awarded!
                  </span>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={handleFinish}>
                  Finish Story
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
