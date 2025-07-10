require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const aiReply = response.choices[0]?.message?.content;

    if (!aiReply) {
      return res.status(500).json({ error: 'No response from OpenAI' });
    }

    return res.json({ reply: aiReply });
  } catch (error) {
    console.error('❌ Error from OpenAI:', error.message);

    return res.status(500).json({
      error: 'Failed to get response from OpenAI',
      details: error.message,
    });
  }
};

