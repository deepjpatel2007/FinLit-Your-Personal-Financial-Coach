import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { calculateProfile } from '../utils/profileLogic';
import { storage } from '../utils/storage';
import { X, ArrowRight, ArrowLeft, Target, Award, ShieldAlert, Sparkles, CheckSquare } from 'lucide-react';

export default function Quiz({ onClose, onQuizComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [profileResult, setProfileResult] = useState(null);

  const handleSelectOption = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSkip = () => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = -1; // -1 represents skipped
    setAnswers(newAnswers);
    handleNext();
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed last question
      const profile = calculateProfile(answers);
      // Attach the raw answers array so we can calculate health score or coach tips
      profile.answers = answers;
      setProfileResult(profile);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Save to localStorage
    storage.setQuizAnswers(answers);
    storage.setMoneyProfile(profileResult);
    
    // Set recommended goal in goals list if not already present
    const currentGoals = storage.getSavedGoals();
    if (!currentGoals.some(g => (g.name || g.text) === profileResult.suggestedFirstGoal)) {
      const newGoal = {
        id: Date.now().toString(),
        name: profileResult.suggestedFirstGoal,
        targetAmount: 250,
        currentAmount: 0,
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days out
        category: 'Emergency fund',
        priority: 'High',
        monthlyContribution: 50,
        completed: false
      };
      storage.setSavedGoals([...currentGoals, newGoal]);
    }

    // Award XP for completing the quiz (e.g. 100 XP)
    const currentXP = storage.getXP();
    storage.setXP(currentXP + 100);

    onQuizComplete(profileResult);
    onClose();
  };

  const progressPercent = Math.round(((currentStep + 1) / quizQuestions.length) * 100);
  const activeQuestion = quizQuestions[currentStep];

  // Helper to map sections to letter labels
  const getSectionLabel = (sectionName) => {
    switch (sectionName) {
      case 'Current Situation': return 'Section A: Current Situation';
      case 'Goals': return 'Section B: Goals & Aspirations';
      case 'Habits': return 'Section C: Money Habits';
      case 'Knowledge': return 'Section D: Financial Literacy';
      default: return sectionName;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop" style={{ maxWidth: '580px', width: '90%' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close Quiz">
          <X size={20} />
        </button>

        {!showResult ? (
          <div>
            {/* Section Label */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {getSectionLabel(activeQuestion.section)}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)' }}>
                Q {currentStep + 1} / {quizQuestions.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-bar-container" style={{ height: '6px', marginBottom: '24px' }}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%`, backgroundColor: 'var(--primary)' }}
              ></div>
            </div>

            {/* Friendly microcopy */}
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontStyle: 'italic' }}>
              Be honest! You can skip questions you aren't sure about or prefer not to answer.
            </p>

            {/* Question Text */}
            <h3 className="quiz-question" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              {activeQuestion.question}
            </h3>

            {/* Options list as Option Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeQuestion.options.map((option, idx) => {
                const isSelected = answers[currentStep] === idx;
                return (
                  <button
                    key={idx}
                    className="choice-btn"
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '14px 18px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: isSelected ? 'var(--c-green-muted)' : 'var(--bg-input)',
                      color: 'var(--text-main)',
                      fontWeight: isSelected ? '600' : 'normal',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'center' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleBack}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={16} /> Back
              </button>

              {activeQuestion.canSkip && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem' }}
                  onClick={handleSkip}
                >
                  Skip Question
                </button>
              )}
              
              <button 
                className="btn btn-primary" 
                onClick={handleNext}
                disabled={answers[currentStep] === null}
                style={{ opacity: answers[currentStep] === null ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {currentStep === quizQuestions.length - 1 ? 'Show Profile' : 'Next'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Detailed Personalized Profile Results Screen */
          <div className="profile-result-wrap" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="profile-avatar animate-pop" style={{ fontSize: '2.5rem', width: '70px', height: '70px', backgroundColor: 'var(--c-green-muted)', color: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              💎
            </div>
            
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Your Custom Money Archetype
              </span>
              <h2 className="profile-name" style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }}>
                {profileResult.name}
              </h2>
            </div>

            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 10px' }}>
              {profileResult.description}
            </p>

            {/* Profile specifications */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left', margin: '10px 0' }}>
              <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px 14px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>CONFIDENCE SCORE</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{profileResult.confidenceScore} / 100</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px 14px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>MAIN GOAL</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profileResult.mainGoal}</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px 14px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>BIGGEST RISK AREA</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--c-red)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profileResult.riskArea}</div>
              </div>

              <div style={{ backgroundColor: 'var(--bg-input)', padding: '10px 14px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-sub)' }}>DAILY SUGGESTED HABIT</span>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profileResult.suggestedDailyHabit}</div>
              </div>
            </div>

            {/* Suggested First Goal & Best Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              <div className="consequence-card" style={{ margin: 0, padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem' }}>
                  <Target size={16} />
                  <span>Suggested First Goal:</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                  {profileResult.suggestedFirstGoal}
                </p>
              </div>

              <div style={{ backgroundColor: 'var(--bg-input)', padding: '12px', borderRadius: '8px', border: '0.5px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-sub)', display: 'block', marginBottom: '6px' }}>🛠️ BEST TOOLS TO USE FIRST:</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {profileResult.bestTools.map((t, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--border-color)', color: 'var(--text-main)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom AI starter */}
            <div style={{ backgroundColor: 'rgba(29, 158, 117, 0.1)', border: '0.5px dashed var(--primary)', borderRadius: '8px', padding: '12px', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>💬 AI COACH STARTER QUESTION:</span>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-sub)', fontStyle: 'italic' }}>
                "{profileResult.aiCoachStarter}"
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              <Award size={16} />
              <span>+100 XP Awarded for Quiz Completion!</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '10px 0', fontSize: '0.95rem' }} onClick={handleFinish}>
              Activate Dashboard & Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
