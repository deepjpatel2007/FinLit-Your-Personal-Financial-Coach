import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const BASE_SYSTEM_PROMPT = `You are Finlit, a friendly financial literacy assistant and money coach for teenagers and young adults. 
Your goal is to explain personal finance in simple, jargon-free, teen-friendly language. 
Always encourage positive money habits (like paying yourself first, tracking, budgeting, and compound interest).
Keep answers short, practical, and highly engaging.

CRITICAL SAFETY RULES:
- Do NOT provide specific investment recommendations, stock advice, or guarantee any financial returns.
- Always include a short, plain-english disclaimer that your responses are educational only and not professional financial or investment advice.
- Encourage users to consult with a trusted adult or qualified professional for serious financial decisions.
- Suggest a relevant next action inside the Finlit app where appropriate (e.g., "Read the Credit Cards module", "Use the Paycheque Simulator", "Audit your subscriptions", or "Add a savings goal").`;

app.post('/api/chat', async (req, res) => {
  const { messages, context } = req.body;
  
  // Use header key first, then fallback to environment variable
  let apiKey = req.headers['x-api-key'] || process.env.ANTHROPIC_API_KEY;

  if (apiKey && apiKey.startsWith('Bearer ')) {
    apiKey = apiKey.replace('Bearer ', '');
  }

  // Verify API key configuration
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    return res.status(400).json({
      error: 'API_KEY_MISSING',
      message: 'Anthropic API key is not configured. Please add your key in the UI settings or in the .env file.'
    });
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: 'INVALID_REQUEST',
      message: 'Messages array is required.'
    });
  }

  try {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    // Construct personalized system prompt from user context
    let systemPrompt = BASE_SYSTEM_PROMPT;
    if (context) {
      systemPrompt += `\n\nUSER DASHBOARD CONTEXT:
- Archetype: ${context.profileName || 'Money Newbie'}
- Financial Confidence: ${context.confidenceScore || 50}/100
- Main Saving Goal: ${context.mainGoal || 'Learn the basics'}
- Biggest Risk Area: ${context.riskArea || 'Overspending'}
- XP Level: ${context.xpLevel || 'Money Newbie'}
- Completed Modules: ${context.completedModulesCount || 0} / 12
- Streak: ${context.streak || 0} days
- Monthly Budget: Income $${context.totalIncome || 0}, Expense $${context.totalExpense || 0}, Net $${context.netCashFlow || 0}
- Priority Goal: ${context.priorityGoalSummary || 'None'}`;
    }

    // Request to Claude using the specific model requested
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: systemPrompt,
      messages: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }))
    });

    const responseText = response.content[0].text;
    res.json({ text: responseText });
  } catch (error) {
    console.error('Claude API Error:', error);
    res.status(500).json({
      error: 'CLAUDE_API_FAILURE',
      message: `Failed to communicate with Claude API using model 'claude-sonnet-4-20250514'.`,
      details: error.message || String(error)
    });
  }
});

// Basic health check route
app.get('/api/health', (req, res) => {
  const serverKey = process.env.ANTHROPIC_API_KEY;
  const isKeyConfigured = !!serverKey && serverKey !== 'your_anthropic_api_key_here';
  res.json({
    status: 'ok',
    apiKeyConfiguredOnServer: isKeyConfigured,
    model: 'claude-sonnet-4-20250514'
  });
});

app.listen(PORT, () => {
  console.log(`[Finlit Backend] Listening on port ${PORT}`);
});
