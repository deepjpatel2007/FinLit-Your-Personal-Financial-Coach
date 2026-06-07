import React, { useState } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { calculateProfile } from '../utils/profileLogic';
import { storage } from '../utils/storage';
import { X, ArrowRight, ArrowLeft, Target, Award, CheckCircle2 } from 'lucide-react';

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

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed last question
      const profile = calculateProfile(answers);
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
    if (!currentGoals.some(g => g.text === profileResult.suggestedGoal)) {
      const newGoal = {
        id: Date.now().toString(),
        text: profileResult.suggestedGoal,
        completed: false
      };
      storage.setSavedGoals([...currentGoals, newGoal]);
    }

    // Award XP for completing the quiz (e.g. 50 XP)
    const currentXP = storage.getXP();
    storage.setXP(currentXP + 50);

    onQuizComplete(profileResult);
    onClose();
  };

  const progressPercent = Math.round(((currentStep + 1) / quizQuestions.length) * 100);

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop" style={{ maxWidth: '550px' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close Quiz">
          <X size={20} />
        </button>

        {!showResult ? (
          <div>
            {/* Header / Progress */}
            <div className="quiz-progress-text">
              Question {currentStep + 1} of {quizQuestions.length}
            </div>
            <div className="progress-bar-container" style={{ height: '6px', marginBottom: '20px' }}>
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progressPercent}%`, backgroundColor: 'var(--primary)' }}
              ></div>
            </div>

            {/* Question Text */}
            <h3 className="quiz-question">
              {quizQuestions[currentStep].question}
            </h3>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quizQuestions[currentStep].options.map((option, idx) => {
                const isSelected = answers[currentStep] === idx;
                return (
                  <button
                    key={idx}
                    className="choice-btn"
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                      backgroundColor: isSelected ? 'var(--primary-muted)' : 'var(--bg-input)',
                      fontWeight: isSelected ? '600' : 'normal'
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={handleBack}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
              >
                <ArrowLeft size={16} /> Back
              </button>
              
              <button 
                className="btn btn-primary" 
                onClick={handleNext}
                disabled={answers[currentStep] === null}
                style={{ opacity: answers[currentStep] === null ? 0.5 : 1 }}
              >
                {currentStep === quizQuestions.length - 1 ? 'Calculate Profile' : 'Next'} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Profile Results Screen */
          <div className="profile-result-wrap">
            <div className="profile-avatar animate-pop">
              🏆
            </div>
            
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-sub)' }}>
              YOUR MONEY ARCHETYPE
            </span>
            <h2 className="profile-name">
              {profileResult.name}
            </h2>

            <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', margin: '8px 0' }}>
              {profileResult.description}
            </p>

            {/* Recommended Modules list */}
            <div className="profile-rec-list">
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '6px' }}>
                🎒 Recommended First Modules:
              </h4>
              {profileResult.recommendedModules.map((moduleId) => {
                let displayTitle = moduleId.charAt(0).toUpperCase() + moduleId.slice(1).replace('-', ' ');
                if (moduleId === 'credit-cards') displayTitle = 'Credit Cards';
                if (moduleId === 'banking') displayTitle = 'Banking 101';
                if (moduleId === 'goals') displayTitle = 'Goal Setting';
                if (moduleId === 'taxes') displayTitle = 'Taxes';
                return (
                  <div key={moduleId} className="profile-rec-item">
                    <CheckCircle2 size={16} color="var(--primary)" />
                    <span style={{ fontWeight: 500 }}>{displayTitle}</span>
                  </div>
                );
              })}
            </div>

            {/* Suggested Goal */}
            <div className="consequence-card" style={{ textAlignment: 'left', width: '100%', margin: '16px 0 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <Target size={16} />
                <span>Your Starter Goal:</span>
              </div>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                {profileResult.suggestedGoal}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
              <span>+50 XP Awarded for Completion!</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} onClick={handleFinish}>
              Start My Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
