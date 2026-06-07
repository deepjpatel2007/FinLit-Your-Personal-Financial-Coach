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

const SYSTEM_PROMPT = `You are Finlit, a friendly financial literacy assistant for teenagers. Explain everything in simple, jargon-free language. Always encourage good money habits. Keep answers short and practical. Do not provide professional financial, legal, or tax advice. For serious financial decisions, tell the user to speak with a trusted adult or qualified professional. Keep disclaimers short.`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Verify API key configuration
  if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
    return res.status(400).json({
      error: 'API_KEY_MISSING',
      message: 'Anthropic API key is not configured. Please add your ANTHROPIC_API_KEY to the .env file in the project root to chat with the real Claude AI.'
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

    // Request to Claude using the specific model requested
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      system: SYSTEM_PROMPT,
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
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const isKeyConfigured = !!apiKey && apiKey !== 'your_anthropic_api_key_here';
  res.json({
    status: 'ok',
    apiKeyConfigured: isKeyConfigured,
    model: 'claude-sonnet-4-20250514'
  });
});

app.listen(PORT, () => {
  console.log(`[Finlit Backend] Listening on port ${PORT}`);
});
