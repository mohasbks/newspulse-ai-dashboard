import Parser from 'rss-parser';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  snippet: string;
  category: string;
  image: string;
}

const parser = new Parser({
  customFields: {
    item: [
      'description', 
      'content:encoded', 
      'media:content', 
      'media:thumbnail',
      'enclosure'
    ],
  },
});

export const CATEGORIES = {
  global: [
    { name: 'BBC News', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
  ],
  tech: [
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
  ],
  finance: [
    { name: 'WSJ', url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml' },
  ],
  crypto: [
    { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
  ]
};

export type Category = keyof typeof CATEGORIES;

export async function fetchLiveNews(category: Category = 'global'): Promise<NewsItem[]> {
  const allParsed: NewsItem[] = [];
  const feedsToFetch = CATEGORIES[category] || CATEGORIES.global;

  const requests = feedsToFetch.map(async (feed) => {
    try {
      const parsed = await parser.parseURL(feed.url);
      
      const items = parsed.items.slice(0, 10).map((item, i) => {
        let rawSnippet = item.contentSnippet || item.summary || item.description || '';
        // Clean HTML tags from snippet
        rawSnippet = rawSnippet.replace(/<[^>]*>?/gm, '');
        if (rawSnippet.length > 200) rawSnippet = rawSnippet.slice(0, 200) + '...';

        // Try extracting image from enclosure or media:content
        let imgUrl = '';
        if (item.enclosure && item.enclosure.url) {
            imgUrl = item.enclosure.url;
        } else if (item['media:content'] && item['media:content'].$) {
            imgUrl = item['media:content'].$.url;
        } else if (item['media:thumbnail'] && item['media:thumbnail'].$) {
            imgUrl = item['media:thumbnail'].$.url;
        } else {
            // Regex search for first img tag in content:encoded or description
            const imgRegex = /<img[^>]+src="([^">]+)"/;
            const match = imgRegex.exec(item['content:encoded'] || item.description || '');
            if (match && match[1]) imgUrl = match[1];
        }

        if (!imgUrl) {
          // Use picsum with a seed based on the item ID so the image stays consistent for the same article
          const seedStr = (item.guid || item.link || i.toString()).replace(/[^a-zA-Z0-9]/g, '');
          imgUrl = `https://picsum.photos/seed/${seedStr}/1200/800`;
        } else {
          // Attempt to aggressively upgrade low-res images from known providers (like BBC)
          if (imgUrl.includes('bbci.co.uk') || imgUrl.includes('bbc.co.uk')) {
             imgUrl = imgUrl.replace(/\/(240|320|480|640|800)\//, '/1024/');
          }
          if (imgUrl.includes('techcrunch')) {
             imgUrl = imgUrl.replace(/-\d+x\d+\.(jpg|png|webp)/, '.$1');
          }
        }

        return {
          id: item.guid || item.link || Math.random().toString(),
          title: item.title || 'Untitled',
          link: item.link || '',
          pubDate: item.pubDate || new Date().toISOString(),
          source: feed.name,
          snippet: rawSnippet,
          category,
          image: imgUrl
        };
      });

      return items;
    } catch (e) {
      console.error(`Failed to fetch ${feed.name}:`, e);
      return [];
    }
  });

  const results = await Promise.all(requests);
  
  for (const items of results) {
    allParsed.push(...items);
  }

  // Sort by newest
  allParsed.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return allParsed.slice(0, 20);
}
