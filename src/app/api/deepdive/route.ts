import { NextResponse } from 'next/server';

const GROQ_API_KEY = process.env.GROQ_API_KEY;

export async function POST(req: Request) {
  try {
    const { title, snippet } = await req.json();

    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const prompt = `
Analyze this news article snippet and provide a brief actionable summary.
Title: ${title}
Snippet: ${snippet}

Format your response as a strict JSON object:
{
  "summary": ["bullet 1", "bullet 2", "bullet 3"],
  "impact": "1 sentence describing market or industry impact",
  "entities": ["entity 1", "entity 2"]
}
`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        response_format: { type: 'json_object' }
      })
    });

    if (!res.ok) throw new Error('Groq failed');
    const data = await res.json();
    return NextResponse.json(JSON.parse(data.choices[0].message.content));

  } catch (error) {
    console.error("Deepdive route error:", error);
    return NextResponse.json({ error: "Failed to analyze" }, { status: 500 });
  }
}
