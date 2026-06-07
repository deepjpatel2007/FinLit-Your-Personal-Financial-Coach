import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import Quiz from './components/Quiz';
import { storage } from './utils/storage';

export default function App() {
  const [xp, setXp] = useState(storage.getXP());
  const [streak, setStreak] = useState(storage.getStreak());
  const [profile, setProfile] = useState(storage.getMoneyProfile());
  const [theme, setTheme] = useState(storage.getTheme());
  const [showQuiz, setShowQuiz] = useState(false);

  // Apply theme class on change
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    storage.setTheme(theme);
  }, [theme]);

  // Update streak on mount
  useEffect(() => {
    const { streak: newStreak } = storage.updateStreak();
    setStreak(newStreak);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAwardXp = (amount) => {
    const currentXp = storage.getXP();
    const updated = currentXp + amount;
    storage.setXP(updated);
    setXp(updated);
  };

  const handleQuizComplete = (newProfile) => {
    setProfile(newProfile);
    // Refresh XP because the quiz completes and awards 50 XP
    setXp(storage.getXP());
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Header Navbar */}
      <Navbar 
        xp={xp} 
        streak={streak} 
        theme={theme}
        toggleTheme={toggleTheme}
        onStartQuiz={() => setShowQuiz(true)}
      />

      {/* Main Pages Content area */}
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                xp={xp} 
                streak={streak} 
                setXp={setXp}
                onAwardXp={handleAwardXp}
                onStartQuiz={() => setShowQuiz(true)}
                profile={profile}
              />
            } 
          />
          <Route 
            path="/lesson/:moduleId" 
            element={
              <LessonPage 
                onAwardXp={handleAwardXp} 
              />
            } 
          />
        </Routes>
      </main>

      {/* Multi-step Quiz Modal */}
      {showQuiz && (
        <Quiz 
          onClose={() => setShowQuiz(false)} 
          onQuizComplete={handleQuizComplete}
        />
      )}

      {/* Footer Branding */}
      <Footer />
    </div>
  );
}
