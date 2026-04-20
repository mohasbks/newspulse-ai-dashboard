import { fetchLiveNews } from '@/lib/rss';
import { fetchLiveMarketData } from '@/lib/market';
import Link from 'next/link';
import { Sparkles, ArrowRight, Activity, Clock, Compass, Globe, Zap, Mail, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

export const revalidate = 60; // Regenerate page every 60s

export default async function NewsPortal() {
  const [globalNews, techNews, financeNews, marketData] = await Promise.all([
    fetchLiveNews('global'),
    fetchLiveNews('tech'),
    fetchLiveNews('finance'),
    fetchLiveMarketData()
  ]);
  
  const allNewsFallback = globalNews.length > 0 ? globalNews : techNews.length > 0 ? techNews : financeNews;
  
  if (!allNewsFallback || allNewsFallback.length === 0) {
    return <div className="p-8 text-center text-tx-muted">No news available.</div>;
  }

  const featured = allNewsFallback[0];
  const trendingList = globalNews.slice(1, 11); // Top 10 for the trending grid
  const marqueeNews = globalNews.slice(0, 15);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* 1. Ticker Tape */}
      <div className="w-full bg-surface border-b border-border py-1.5 overflow-hidden flex items-center shadow-sm">
        <div className="bg-tx text-background text-[10px] font-black uppercase px-4 py-1 ml-4 rounded-sm whitespace-nowrap z-10 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Live Pulse
        </div>
        <div className="flex whitespace-nowrap animate-marquee">
          {marqueeNews.map((n) => (
            <span key={n.id} className="mx-8 text-xs font-semibold text-tx-muted inline-flex items-center gap-2 tracking-wide">
              <span className="text-accent animate-pulse">●</span> {n.title}
            </span>
          ))}
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 md:px-8 mt-12 mb-20 space-y-20">
        
        {/* 2. Modern Bento Hero (No sidebar) */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold tracking-tight">Today's Briefing</h2>
            </div>
            {/* Real Market Data Mini-Widget */}
            <div className="hidden md:flex gap-4">
              {marketData.map((coin) => (
                <div key={coin.symbol} className="flex flex-col border border-border/50 bg-surface/50 rounded-lg px-3 py-1.5 min-w-[100px]">
                  <span className="text-[10px] font-bold text-tx-muted uppercase tracking-widest">{coin.symbol}</span>
                  <div className="flex items-center justify-between gap-3 mt-1">
                    <span className="text-xs font-mono text-tx font-bold">${coin.price.toLocaleString()}</span>
                    <span className={`text-[10px] font-bold flex items-center ${coin.change24h >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {coin.change24h >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                      {Math.abs(coin.change24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[500px]">
            
            {/* Massive Featured Article */}
            <a 
              href={featured.link}
              target="_blank"
              rel="noreferrer"
              className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-border bg-surface flex items-end p-6 md:p-12 shadow-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={featured.image} 
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
              
              <div className="relative z-10 w-full md:w-5/6">
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/50 backdrop-blur-md text-tx text-[10px] font-black uppercase tracking-widest border border-border">
                  <span className="w-2 h-2 rounded-full bg-positive animate-pulse"></span>
                  {featured.source}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-tx leading-[1.1] tracking-tighter mb-4 group-hover:text-accent transition-colors drop-shadow-lg">
                  {featured.title}
                </h1>
                <p className="text-sm md:text-base text-tx-muted font-medium line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl text-shadow">
                  {featured.snippet}
                </p>
                <div className="inline-flex items-center gap-2 font-mono text-xs text-tx border border-border/50 px-4 py-2 rounded-full bg-surface/30 backdrop-blur">
                  <Clock className="w-3 h-3" /> Read Full Story <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>
            </a>

            {/* AI Insights & Features Block */}
            <div className="md:col-span-1 p-8 rounded-3xl bg-surface border border-accent/20 relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-80" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-3 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-tx w-4/5 to-tx-muted">
                  Intelligent Market Sentiment
                </h3>
                <p className="text-sm text-tx-muted leading-relaxed">
                  Every headline is processed via Meta LLaMA 3.3. Experience real-time bias detection, instant summaries, and interactive concept mapping directly from the dashboard.
                </p>
              </div>

              <div className="relative z-10 mt-8 space-y-3">
                <div className="p-3 bg-surface-hover border border-border rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-tx uppercase tracking-wider">Analysis Speed</span>
                  <span className="text-xs text-positive font-mono font-bold">&lt; 800ms</span>
                </div>
                <div className="p-3 bg-surface-hover border border-border rounded-xl flex items-center justify-between">
                  <span className="text-xs font-bold text-tx uppercase tracking-wider">Models Used</span>
                  <span className="text-xs text-accent font-mono font-bold">LLaMA 70B</span>
                </div>
                
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center justify-center w-full mt-4 p-4 bg-tx text-background rounded-xl font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  Enter Dashboard <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 3. High-Density Trending Block */}
        <section>
          <div className="flex items-center mb-8 border-b border-border pb-4">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Activity className="w-6 h-6 text-tx-muted" /> Top 10 Trending
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {trendingList.map((n, idx) => (
              <a key={n.id} href={n.link} target="_blank" rel="noreferrer" className="group relative flex flex-col p-5 rounded-2xl bg-surface border border-border hover:border-tx-muted transition-colors">
                <div className="absolute top-2 right-3 text-5xl font-black text-tx-muted opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none italic">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="text-[10px] font-bold uppercase text-accent tracking-widest mb-3 relative z-10">
                  {n.source}
                </div>
                <h3 className="text-sm font-bold text-tx leading-snug group-hover:text-accent transition-colors relative z-10 line-clamp-4">
                  {n.title}
                </h3>
              </a>
            ))}
          </div>
        </section>
        
        <div className="border-b border-border w-full opacity-50" />

        {/* 4. Categorized Sections */}

        {/* Technology Horizons */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-tx">💻</span> 
              Technology Horizons
            </h2>
            <Link href="/category/tech" className="text-xs font-bold text-tx-muted hover:text-tx transition-colors uppercase tracking-widest flex items-center">
              View All <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techNews.slice(0, 3).map(n => (
              <a key={n.id} href={n.link} target="_blank" rel="noreferrer" className="group flex flex-col gap-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-border bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur text-tx-muted text-[10px] font-bold uppercase tracking-wider rounded border border-border/50">
                      {n.source}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-accent transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-sm text-tx-muted line-clamp-2">
                    {n.snippet}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 5. Inline Newsletter Banner */}
        <section className="w-full relative rounded-3xl overflow-hidden border border-border flex flex-col md:flex-row items-center justify-between p-8 md:p-12 bg-surface">
           <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
           <div className="relative z-10 md:w-1/2 mb-6 md:mb-0">
             <h2 className="text-3xl md:text-4xl font-black tracking-tight text-tx mb-3">Join The Daily Pulse</h2>
             <p className="text-tx-muted leading-relaxed font-medium">Get our AI-curated market brief delivered straight to your inbox every morning. Zero noise, 100% signal.</p>
           </div>
           <div className="relative z-10 w-full md:w-auto">
             <form className="flex w-full md:w-[400px] bg-background border border-border rounded-full overflow-hidden focus-within:border-accent transition-colors shadow-xl">
                <input type="email" placeholder="Enter your email" required className="flex-1 bg-transparent px-6 py-4 text-sm text-tx outline-none" />
                <button type="button" className="px-8 bg-tx text-background font-bold text-sm tracking-wide uppercase hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
             </form>
             <p className="text-[10px] font-mono text-tx-muted mt-3 ml-4">Unsubscribe anytime. Trusted by 12,000+ readers.</p>
           </div>
        </section>

        {/* Markets & Finance */}
        <section>
          <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-tx">💸</span> 
              Global Markets
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {financeNews.slice(0, 4).map((n) => (
              <a key={n.id} href={n.link} target="_blank" rel="noreferrer" className="p-5 rounded-2xl border border-border bg-surface hover:bg-surface-hover transition-colors flex flex-col justify-between group">
                <div>
                  <div className="text-[10px] font-bold uppercase text-tx-muted tracking-widest mb-3 flex justify-between items-center">
                    {n.source}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors mb-4 line-clamp-3">
                    {n.title}
                  </h3>
                </div>
                <div className="text-[11px] text-tx-muted font-mono pt-4 border-t border-border/50">
                  {new Date(n.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>

      {/* 6. Global Comprehensive Footer */}
      <footer className="w-full bg-surface border-t border-border pt-16 pb-10">
        <div className="container max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
              <div className="font-bold tracking-tight text-tx text-2xl mb-4 flex items-center gap-2">
                <Activity className="text-accent w-6 h-6" /> NewsPulse.
              </div>
              <p className="text-sm text-tx-muted leading-relaxed mb-6">
                Redefining market intelligence with AI-driven sentiment tracking and instant global news aggregation.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-tx mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-tx-muted">
                <li><Link href="/dashboard" className="hover:text-tx transition-colors">AI Dashboard</Link></li>
                <li><Link href="/pricing" className="hover:text-tx transition-colors">Pricing Options</Link></li>
                <li><Link href="/about" className="hover:text-tx transition-colors">Architecture</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-tx mb-4">Categories</h4>
              <ul className="space-y-3 text-sm text-tx-muted">
                <li><Link href="/category/global" className="hover:text-tx transition-colors">Global Headlines</Link></li>
                <li><Link href="/category/tech" className="hover:text-tx transition-colors">Technology & VC</Link></li>
                <li><Link href="/category/finance" className="hover:text-tx transition-colors">Wall Street</Link></li>
                <li><Link href="/category/crypto" className="hover:text-tx transition-colors">Web3 & Crypto</Link></li>
              </ul>
            </div>

            <div>
               <h4 className="font-bold text-tx mb-4">Trusted Data Sources</h4>
               <ul className="space-y-3 text-sm font-mono text-tx-muted">
                 <li>&gt; BBC World News</li>
                 <li>&gt; TechCrunch XML</li>
                 <li>&gt; Yahoo Finance</li>
                 <li>&gt; CoinGecko V3 API</li>
               </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-tx-muted">
            <div>&copy; {new Date().getFullYear()} NewsPulse Inc. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-tx transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-tx transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
