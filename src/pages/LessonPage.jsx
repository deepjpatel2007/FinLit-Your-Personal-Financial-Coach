import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { modules } from '../data/modules';
import { storage } from '../utils/storage';
import { ArrowLeft, BookOpen, Award, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import * as Icons from 'lucide-react';

export default function LessonPage({ onAwardXp, onLessonComplete }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // Find current module
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Module Not Found</h2>
        <p style={{ color: 'var(--text-sub)', marginTop: '8px' }}>Sorry, we couldn't find the lesson you were looking for.</p>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Resolve icon
  const IconComponent = Icons[module.icon] || Icons.BookOpen;

  // Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [showXPModal, setShowXPModal] = useState(false);

  const currentQuestion = module.quiz[currentQuestionIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOptionIdx(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOptionIdx(null);

    if (currentQuestionIdx < module.quiz.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Finished quiz!
      setQuizFinished(true);
      
      // Check if already completed
      const completedList = storage.getCompletedLessons();
      const isAlreadyCompleted = completedList.includes(moduleId);

      // Save progress to 100%
      const currentProgress = storage.getModuleProgress();
      currentProgress[moduleId] = 100;
      storage.setModuleProgress(currentProgress);

      if (!isAlreadyCompleted) {
        // Mark as completed
        storage.setCompletedLessons([...completedList, moduleId]);
        // Award 100 XP
        const currentXp = storage.getXP();
        storage.setXP(currentXp + 100);
        onAwardXp(100);
        if (onLessonComplete) onLessonComplete();
        setShowXPModal(true);
      } else {
        if (onLessonComplete) onLessonComplete();
        setShowXPModal(true);
      }
    }
  };

  const handleFinish = () => {
    setShowXPModal(false);
    navigate('/');
  };

  // Scroll to top on mount/change module
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [moduleId]);

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      {/* Header Row */}
      <div className="lesson-header" style={{ marginTop: '30px' }}>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => navigate('/')} 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-icon" style={{ backgroundColor: 'var(--primary-muted)', color: 'var(--primary)', width: '36px', height: '36px' }}>
            <IconComponent size={18} />
          </div>
          <h2 style={{ fontSize: '1.4rem' }}>{module.title}</h2>
        </div>
      </div>

      <div className="lesson-page-container">
        {!quizFinished ? (
          /* Lesson Content Mode */
          <div className="lesson-body animate-pop">
            {/* 1. Content sections */}
            {module.sections.map((section, idx) => (
              <div key={idx} className="lesson-section">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {section.title}
                </h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {section.content}
                </p>
              </div>
            ))}

            {/* 2. Real-life example box */}
            <div className="lesson-section" style={{ marginTop: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color="var(--primary)" /> Real-Life Case Study
              </h3>
              <div className="example-box">
                <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                  {module.realLifeExample.title}
                </h4>
                <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {module.realLifeExample.text}
                </p>
              </div>
            </div>

            {/* 3. Glossary terms */}
            <div className="lesson-section" style={{ marginTop: '10px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Key Terms to Know</h3>
              <div className="glossary-grid">
                {module.glossary.map((gloss, idx) => (
                  <div key={idx} className="glossary-card">
                    <div className="glossary-term">{gloss.term}</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>{gloss.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Start Lesson Quiz Button */}
            <div style={{ borderTop: '0.5px solid var(--border-color)', paddingTop: '30px', marginTop: '30px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Ready to test your knowledge?</h3>
              <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Complete the mini-quiz and earn 100 XP to level up!
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setCurrentQuestionIdx(0);
                  setSelectedOptionIdx(null);
                  setIsAnswered(false);
                  setScore(0);
                  setQuizFinished(false);
                  // Scroll to quiz section
                  document.getElementById('lesson-quiz')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Take the Lesson Quiz <ChevronRight size={16} />
              </button>
            </div>

            <div id="lesson-quiz" />
          </div>
        ) : (
          /* Quiz Mode */
          <div className="lesson-quiz-section animate-pop">
            <div className="section-title-wrap" style={{ marginBottom: '20px' }}>
              <div>
                <h2>Lesson Quiz</h2>
                <p className="section-subtitle">Question {currentQuestionIdx + 1} of {module.quiz.length}</p>
              </div>
            </div>

            <div className="quiz-card animate-pop">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '18px', fontWeight: 600 }}>
                {currentQuestion.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = idx === currentQuestion.correctAnswerIndex;
                  const isSelected = idx === selectedOptionIdx;

                  let optionClass = 'quiz-option';
                  if (isAnswered) {
                    if (isCorrect) optionClass += ' correct';
                    else if (isSelected) optionClass += ' incorrect';
                  }

                  return (
                    <button
                      key={idx}
                      className={optionClass}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: isSelected ? '600' : 'normal'
                      }}
                    >
                      <span>{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 size={16} color="var(--c-green)" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle size={16} color="var(--c-red)" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation display */}
              {isAnswered && (
                <div className="quiz-explanation animate-pop">
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
                    {selectedOptionIdx === currentQuestion.correctAnswerIndex ? '🎉 Correct!' : '❌ Let\'s learn why:'}
                  </div>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Next navigation button */}
              {isAnswered && (
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '20px' }} 
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIdx === module.quiz.length - 1 ? 'Show Results' : 'Next Question'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Completion Modal Overlay */}
      {showXPModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-pop" style={{ maxWidth: '450px', textAlign: 'center' }}>
            <div className="profile-avatar animate-pop" style={{ margin: '0 auto 16px', color: 'var(--c-green)', backgroundColor: 'var(--c-green-muted)' }}>
              🎓
            </div>
            
            <h2 style={{ fontSize: '1.75rem', color: 'var(--primary)' }}>Lesson Completed!</h2>
            
            <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem', margin: '12px 0 20px', lineHeight: '1.5' }}>
              Awesome job! You've finished the **{module.title}** module and passed the quiz with a score of <strong>{score} / {module.quiz.length}</strong>!
            </p>

            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--primary)', 
              fontWeight: 700, 
              fontSize: '1.1rem',
              backgroundColor: 'var(--primary-muted)',
              padding: '10px 24px',
              borderRadius: '99px',
              marginBottom: '20px'
            }}>
              <Award size={20} />
              <span>+100 XP Earned!</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleFinish}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
