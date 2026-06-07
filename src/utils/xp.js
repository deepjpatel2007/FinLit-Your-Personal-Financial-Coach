// XP and Leveling Rules for Finlit

export const LEVELS = [
  { name: "Money Newbie", minXp: 0, maxXp: 100 },
  { name: "Budget Boss", minXp: 100, maxXp: 250 },
  { name: "Credit Champ", minXp: 250, maxXp: 500 },
  { name: "Invest Pro", minXp: 500, maxXp: 1000 },
  { name: "Money Master", minXp: 1000, maxXp: Infinity }
];

/**
 * Calculates level information based on total XP.
 * @param {number} xp 
 * @returns {object} { name, progressPercentage, xpRemaining, nextLevelName, minXp, maxXp }
 */
export const getLevelInfo = (xp) => {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || null;
    }
  }

  // Calculate progress inside current level range
  let progressPercentage = 100;
  let xpInCurrentLevel = xp - currentLevel.minXp;
  
  if (nextLevel) {
    let range = nextLevel.minXp - currentLevel.minXp;
    progressPercentage = Math.min(Math.round((xpInCurrentLevel / range) * 100), 100);
  }

  return {
    name: currentLevel.name,
    progressPercentage,
    xpRemaining: nextLevel ? nextLevel.minXp - xp : 0,
    nextLevelName: nextLevel ? nextLevel.name : "Max Level",
    minXp: currentLevel.minXp,
    maxXp: nextLevel ? nextLevel.minXp : 1000
  };
};
