# 🌐 NewsPulse v5.0
### The Ultimate AI-Powered Market Intelligence Dashboard

![NewsPulse Banner](https://picsum.photos/seed/newspulse/1000/300)

**NewsPulse** is an enterprise-grade, modern news aggregation platform and financial dashboard. It bypasses restrictive third-party APIs by dynamically parsing global RSS feeds directly from top publishers (BBC, TechCrunch, Reuters, WSJ) and pushing the text snippets through Meta's `LLaMA 3.3 70B` via the ultra-fast Groq LPU engine.

This provides instant, zero-delay market sentiment analysis, trending themes extraction, and concept mapping.

<br/>

## ✨ Key Features (v5.0 Update)

- 📈 **Real-Time Market Ticker:** Fetches live cryptocurrency and stock indices (via CoinGecko) and displays them natively in the dashboard.
- 🍱 **Modern Bento Grid Architecture:** Responsive, asymmetrical UI layout built with Tailwind CSS v4 featuring glassmorphism and extreme information density.
- 🧠 **Groq LPU Inference Engine:** Processes batches of 20+ headlines in ~800ms, scoring sentiment (Bullish vs. Bearish) and extracting market entities.
- 🗺️ **Concept Mapping:** Visualizes relationships between companies, politicians, and economic events using `@xyflow/react` (React Flow).
- 🎙️ **Natural Voice TTS:** Utilizing native Web Speech API with advanced OS Voice mapping (Microsoft Natural / Siri Samantha) to read the daily market briefs out loud.
- 📱 **Mobile Optimized:** A flawless layout that responds beautifully from 4k ultrawide monitors down to mobile screens.

<br/>

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| --- | --- |
| **Frontend Framework** | Next.js 15 (App Router) |
| **PaaS / Hosting** | Vercel |
| **UI System** | React, Tailwind CSS v4, Lucide Icons |
| **Data Aggregation** | `rss-parser` (Direct XML fetching) |
| **Market Data** | CoinGecko Free API |
| **AI Processing** | Groq (`llama-3.3-70b-versatile`) |
| **Data Visualization** | React Flow (`@xyflow/react`) |

<br/>

## 🚀 Getting Started

### 1. Requirements
- Node.js `18.17+`
- A free **Groq API Key** (Get one at [console.groq.com](https://console.groq.com))

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/mohasbks/newspulse-ai-dashboard.git
cd newspulse
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Run the Dev Server
```bash
npm run dev
```
Open `http://localhost:3000` to see the live portal.

<br/>

## 🛡️ Privacy & Rate Limits
- **No Third-Party Rate Limits:** Because we fetch standard RSS XML feeds natively over HTTP, there are no "100 requests per day" limits like GNews or NewsAPI.
- **Groq Tiers:** The free tier of Groq limits requests to ~30 RPM. You can upgrade or switch the model to `llama3-8b` if you hit limits.

<br/>

---
**Designed & Developed by [mohasbks](https://github.com/mohasbks)**  
*NewsPulse Inc. © 2026*
