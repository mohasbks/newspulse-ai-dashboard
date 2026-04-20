import { NextResponse } from 'next/server';
import { analyzeNewsWithGroq } from '@/lib/groq';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { news } = body;

    if (!news || !Array.isArray(news)) {
      return NextResponse.json({ error: "Invalid news payload" }, { status: 400 });
    }

    const analysis = await analyzeNewsWithGroq(news);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis route error:", error);
    return NextResponse.json({ error: "Failed to analyze news" }, { status: 500 });
  }
}
