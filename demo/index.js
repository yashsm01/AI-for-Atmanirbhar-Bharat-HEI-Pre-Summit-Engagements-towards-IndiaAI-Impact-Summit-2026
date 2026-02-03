require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 3000;

// Initialize Gemini AI
const apiKey = process.env.GOOGLE_API_KEY;
console.log('API Key loaded:', apiKey ? 'Yes (ends with ' + apiKey.slice(-4) + ')' : 'No');
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

// Load data into memory
let database = [];
fs.createReadStream(path.join(__dirname, 'data.csv'))
  .pipe(csv())
  .on('data', (row) => {
    database.push(row);
  })
  .on('end', () => {
    console.log('CSV data loaded successfully.');
    console.log('Gemini AI initialized with model: gemini-2.0-flash');
  });

app.get('/', (req, res) => {
  res.render('index');
});

// Basic prediction from CSV data
app.get('/predict', (req, res) => {
  const { crop, month } = req.query;

  const result = database.find(
    (item) => item.crop === crop && item.month === month
  );

  if (result) {
    res.json(result);
  } else {
    res.json({
      error: "Data not available for this combination.",
      historical_demand: "N/A",
      price_trend: "N/A",
      recommendation: "Try searching for Tomato in June or Wheat in November."
    });
  }
});

// AI-powered advice using Gemini
app.post('/ai-advice', async (req, res) => {
  try {
    const { crop, month, question } = req.body;

    // Get base data if available
    const baseData = database.find(
      (item) => item.crop === crop && item.month === month
    );

    const prompt = `You are an expert agricultural advisor for Indian farmers. 
    
Context:
- Crop: ${crop}
- Month: ${month}
${baseData ? `- Historical Demand: ${baseData.historical_demand}
- Price Trend: ${baseData.price_trend}
- Base Recommendation: ${baseData.recommendation}` : '- No historical data available for this combination.'}

User Question: ${question || 'Give me detailed advice about growing this crop in this month.'}

Provide practical, actionable advice for an Indian farmer. Include:
1. Best practices for this crop in this season
2. Risk factors to consider
3. Market timing suggestions
4. Any region-specific tips for India

Keep the response concise but helpful. Use simple language that farmers can understand.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      crop,
      month,
      baseData: baseData || null,
      aiAdvice: text
    });
  } catch (error) {
    console.error('Gemini AI Error:', error);
    res.status(500).json({
      success: false,
      error: 'AI service temporarily unavailable. Please try again.',
      details: error.message
    });
  }
});

// Chat endpoint for general farming questions
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = `You are "Krishi Mitra" (कृषि मित्र), an AI assistant for Indian farmers.
    
You help with:
- Crop selection and planning
- Weather and seasonal advice
- Market price insights
- Pest and disease management
- Government schemes for farmers
- Modern farming techniques

User Message: ${message}

Respond in a helpful, friendly manner. If the question is in Hindi, respond in Hindi. Keep answers practical and relevant to Indian agriculture.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      response: text
    });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Chat service temporarily unavailable.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌾 AI Crop Predictor running at http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI: Ready`);
});
