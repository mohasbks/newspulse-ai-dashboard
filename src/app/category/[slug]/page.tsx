import { fetchLiveNews, Category, CATEGORIES } from '@/lib/rss';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // Regenerate every minute

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  if (!(slug in CATEGORIES)) {
    notFound();
  }

  const categoryName = slug === 'global' ? 'Global Headlines'
                     : slug === 'tech' ? 'Technology & VC'
                     : slug === 'finance' ? 'Markets & Finance'
                     : 'Web3 & Crypto';

  const news = await fetchLiveNews(slug as Category);

  return (
    <div className="flex-1 flex flex-col items-center bg-background p-4 md:p-8">
      <div className="max-w-5xl w-full mt-10 mb-20">
        
        <header className="mb-12 border-b border-border pb-6">
          <h1 className="text-3xl md:text-5xl font-black text-tx tracking-tighter mb-4 capitalize">
            {categoryName}
          </h1>
          <p className="text-tx-muted font-medium text-base md:text-lg">
            Latest updates and real-time RSS feeds for {categoryName.toLowerCase()}.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
             <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="flex flex-col group rounded-3xl overflow-hidden border border-border bg-surface hover:border-tx-muted transition-colors">
               <div className="aspect-video w-full overflow-hidden relative border-b border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background p-1.5 rounded text-tx">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
               </div>
               <div className="p-6 flex flex-col flex-1">
                 <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-3">{item.source}</div>
                 <h2 className="text-lg font-bold text-tx leading-tight mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                 </h2>
                 <p className="text-sm text-tx-muted line-clamp-3 mb-6 flex-1">
                    {item.snippet}
                 </p>
                 <div className="text-xs text-tx-muted font-mono mt-auto">
                    {new Date(item.pubDate).toLocaleString()}
                 </div>
               </div>
             </a>
          ))}
        </div>

      </div>
    </div>
  );
}
