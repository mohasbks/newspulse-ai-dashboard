import { NextResponse } from 'next/server';
import { fetchLiveNews, Category, CATEGORIES } from '@/lib/rss';

export const revalidate = 60; // Cache for 60 seconds

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryQuery = searchParams.get('category') || 'global';
    
    // Validate category
    const category: Category = (categoryQuery in CATEGORIES) 
      ? (categoryQuery as Category) 
      : 'global';

    const news = await fetchLiveNews(category);
    return NextResponse.json({ news });
  } catch (error) {
    console.error("News fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
