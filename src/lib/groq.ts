import { NewsItem } from './rss';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export interface AnalysisResponse {
  marketMood: string;
  articlesSentiment: Record<string, {
    sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    reason: string;
  }>;
  mapData: {
    nodes: Array<{ id: string; label: string; group: 'company' | 'person' | 'theme' }>;
    edges: Array<{ source: string; target: string; label: string }>;
  };
}

export async function analyzeNewsWithGroq(news: NewsItem[]): Promise<AnalysisResponse> {
  if (!GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set');
  }

  // Optimize payload size
  const simplifiedNews = news.map(n => ({ id: n.id, title: n.title, source: n.source }));

  const prompt = `
You are an expert market analyst and sentiment analyzer. I will provide a list of current global news headlines.
Your task is to analyze them and output a strict JSON object with this exact structure:

{
  "marketMood": "A 2-sentence highly engaging summary of the current global trend based on the headlines. Use a brutalist/direct tone.",
  "articlesSentiment": {
    "article_id": {
      "sentiment": "POSITIVE" | "NEGATIVE" | "NEUTRAL",
      "reason": "3-5 word reason"
    }
  },
  "mapData": {
    "nodes": [
      { "id": "apple", "label": "Apple Inc", "group": "company" }
    ],
    "edges": [
      { "source": "apple", "target": "vision_pro", "label": "launches" }
    ]
  }
}

Rules:
1. ONLY output valid JSON. No markdown wrappers like \`\`\`json.
2. In 'articlesSentiment', the keys must match the exact article string IDs provided.
3. For 'mapData', extract max 8 most important entities (companies, themes like 'AI', people) as nodes, and max 8 edges showing relationships between them based on the news.
4. Keep node labels short (1-3 words).

News payload:
${JSON.stringify(simplifiedNews)}
`;

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2, // Low temp for robust JSON
        response_format: { type: 'json_object' }
      })
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("Groq Error:", txt);
      throw new Error(`Groq API Error: ${res.status}`);
    }

    const data = await res.json();
    return JSON.parse(data.choices[0].message.content) as AnalysisResponse;
  } catch (error) {
    console.error("Groq analysis failed:", error);
    // Return fallback gracefully
    return {
      marketMood: "Failed to analyze current market mood. The AI is sleeping.",
      articlesSentiment: {},
      mapData: { nodes: [], edges: [] }
    };
  }
}
