# 🚀 AI Crop Predictor Demo Guide

## About This Project

This demo is part of the **AI for Atmanirbhar Bharat** initiative, showcasing how AI can help Indian farmers make better decisions using **Google Gemini AI**.

### Features
- 📊 **Crop Prediction** - Get demand and price trends
- 🤖 **AI Farming Advice** - Powered by Gemini 2.5 Flash
- 💬 **Krishi Mitra Chat** - Ask questions in Hindi or English

---

## Step 1: Get Your Google API Key

1. Go to **[Google AI Studio](https://aistudio.google.com/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Select a project (or create new)
5. Copy the API key (starts with `AIza...`)

![Get API Key](https://ai.google.dev/static/site-assets/images/docs/api-key-button.png)

> ⚠️ **Keep your API key secret!** Never share it publicly.

---

## Step 2: Clone the Repository

```bash
git clone https://github.com/yashsm01/AI-for-Atmanirbhar-Bharat-HEI-Pre-Summit-Engagements-towards-IndiaAI-Impact-Summit-2026.git
cd AI-for-Atmanirbhar-Bharat-HEI-Pre-Summit-Engagements-towards-IndiaAI-Impact-Summit-2026
```

---

## Step 3: Setup the Demo

```bash
cd demo
npm install
```

---

## Step 4: Configure API Key

Create a `.env` file in the `demo` folder:

```env
GOOGLE_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual API key from Step 1.

---

## Step 5: Run the Demo

```bash
node index.js
```

You should see:
```
API Key loaded: Yes (ends with xxxx)
🌾 AI Crop Predictor running at http://localhost:3000
🤖 Gemini AI: Ready
CSV data loaded successfully.
```

---

## Step 6: Open in Browser

Go to **http://localhost:3000**

---

## Using the Demo

### 1. Crop Prediction
- Select a crop (Tomato, Wheat, Rice, etc.)
- Select a month
- Click "Predict Demand & Price"
- See demand level, price trend, and recommendation

### 2. AI Farming Advice
- Select crop and month
- Optionally add a specific question
- Click "Get AI Advice"
- Get detailed, AI-generated farming guidance

### 3. Krishi Mitra Chat
- Type any farming question
- Supports Hindi and English
- Example: "टमाटर की खेती कैसे करें?"

---

## Project Structure

```
demo/
├── index.js          # Server with Gemini AI
├── .env              # API key (create this)
├── data.csv          # Crop data
├── package.json      # Dependencies
├── views/
│   └── index.ejs     # Frontend UI
└── test-api.js       # API key tester
```

---

## Troubleshooting

| Issue | Solution |
|:---|:---|
| 404 Model Error | Check model name is `gemini-2.5-flash` |
| API Key Error | Verify key at [aistudio.google.com](https://aistudio.google.com/apikey) |
| Port in use | Kill other node processes or change PORT |

### Test Your API Key

**Using Node.js:**
```bash
node test-api.js
```

**Using curl (replace YOUR_API_KEY):**
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

This will list all available Gemini models for your API key.

---

## Tech Stack

| Component | Technology |
|:---|:---|
| Backend | Node.js + Express |
| AI | Google Gemini 2.5 Flash |
| Frontend | HTML + CSS + JavaScript |
| Template | EJS |

---

## Resources

- 🌐 [Google AI Studio](https://aistudio.google.com/)
- 📚 [Gemini API Docs](https://ai.google.dev/docs)
- 🇮🇳 [IndiaAI Mission](https://indiaai.gov.in/)

---

## License

Part of **AI for Atmanirbhar Bharat** - HEI Pre-Summit Engagements towards IndiaAI Impact Summit 2026
