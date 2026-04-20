'use client';
import { useEffect, useState, useMemo } from 'react';
import { NewsItem, CATEGORIES, Category } from '@/lib/rss';
import { AnalysisResponse } from '@/lib/groq';
import { Activity, Loader2, Play, Pause, Volume2, Maximize2 } from 'lucide-react';
import NewsMap from './NewsMap';
import DeepDiveModal from './DeepDiveModal';

export default function LiveDashboard() {
  const [category, setCategory] = useState<Category>('global');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('Initializing dashboard...');
  const [isError, setIsError] = useState(false);
  const [view, setView] = useState<'feed' | 'map'>('feed');
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  // Stop TTS if unmounted or category changed
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, [category]);

  useEffect(() => {
    async function init() {
      try {
        setAnalysis(null);
        setLoadingMsg(`Fetching ${category} RSS feeds...`);
        const res = await fetch(`/api/news?category=${category}`);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        
        if (!data.news || data.news.length === 0) {
            setIsError(true);
            setLoadingMsg('No news found. RSS blocked or unavailable.');
            return;
        }
        
        const topNews = data.news.slice(0, 15);
        setNews(topNews);

        setLoadingMsg(`AI analyzing ${category} market mood...`);
        const r2 = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ news: topNews })
        });
        
        if (!r2.ok) throw new Error('AI analysis failed');
        const analysisData = await r2.json();
        setAnalysis(analysisData);
        setLoadingMsg('');
      } catch (err) {
        console.error(err);
        setIsError(true);
        setLoadingMsg('System error. Refresh required.');
      }
    }
    init();
  }, [category]);

  const toggleTTS = () => {
    if (isPlayingTTS) {
      window.speechSynthesis.cancel();
      setIsPlayingTTS(false);
    } else if (analysis?.marketMood) {
      const utterance = new SpeechSynthesisUtterance(analysis.marketMood);
      
      // Attempt to find a high-quality human-like voice (Edge Natural, Google, Samantha)
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(v => 
        (v.name.includes('Natural') && v.lang.startsWith('en')) || 
        v.name.includes('Google US English') || 
        v.name.includes('Samantha')
      ) || voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');

      if (bestVoice) {
        utterance.voice = bestVoice;
      }
      
      utterance.rate = 0.9; // Slightly slower for more dramatic news reading
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingTTS(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingTTS(true);
    }
  };

  // Pre-load voices to ensure they are available when clicked
  useEffect(() => {
    window.speechSynthesis.getVoices();
  }, []);

  const sentimentStats = useMemo(() => {
    if (!analysis) return { pos: 0, neg: 0, neu: 0, total: 1 };
    let pos = 0, neg = 0, neu = 0;
    Object.values(analysis.articlesSentiment).forEach(v => {
      if (v.sentiment === 'POSITIVE') pos++;
      else if (v.sentiment === 'NEGATIVE') neg++;
      else neu++;
    });
    return { pos, neg, neu, total: pos + neg + neu || 1 };
  }, [analysis]);

  if (loadingMsg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-tx-muted gap-4">
        {isError ? (
            <div className="text-negative font-mono text-sm border border-negative/20 bg-negative/5 p-4 rounded">{loadingMsg}</div>
        ) : (
            <>
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
                <p className="font-mono text-sm tracking-tight">{loadingMsg}</p>
            </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-700">
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 pb-2">
        {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors border
              ${category === cat ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-surface border-border text-tx-muted hover:text-tx hover:bg-surface-hover'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Overview Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-border/50 bg-surface rounded-xl shadow-sm gap-4 relative overflow-hidden">
        
        {/* Sparkline Background */}
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div style={{ width: `${(sentimentStats.pos / sentimentStats.total) * 100}%` }} className="h-full bg-positive/60 transition-all duration-1000" />
          <div style={{ width: `${(sentimentStats.neu / sentimentStats.total) * 100}%` }} className="h-full bg-neutral/30 transition-all duration-1000" />
          <div style={{ width: `${(sentimentStats.neg / sentimentStats.total) * 100}%` }} className="h-full bg-negative/60 transition-all duration-1000" />
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button 
            onClick={toggleTTS}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlayingTTS ? 'bg-accent text-white shadow-lg shadow-accent/20 animate-pulse' : 'bg-accent/10 text-accent hover:bg-accent/20'}`}
          >
            {isPlayingTTS ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-tx flex items-center gap-2">
              Market Mood
              <span className="flex items-center gap-1 text-[10px] bg-border px-1.5 py-0.5 rounded text-tx-muted">
                <span className="w-2 h-2 rounded-full bg-positive"></span> {sentimentStats.pos}
                <span className="w-2 h-2 rounded-full bg-negative ml-1"></span> {sentimentStats.neg}
              </span>
            </h2>
            <p className="text-xs text-tx-muted tracking-wide mt-1">
              Live AI analysis of {news.length} {category} headlines
            </p>
          </div>
        </div>
        <div className="max-w-xl text-sm font-medium leading-relaxed border-l border-border/50 pl-4 py-1 text-tx">
          {analysis?.marketMood}
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 p-1 border border-border bg-surface-hover w-max rounded-lg">
        <button 
          onClick={() => setView('feed')} 
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'feed' ? 'bg-border text-tx shadow-sm' : 'text-tx-muted hover:text-tx'}`}
        >
          News Feed
        </button>
        <button 
          onClick={() => setView('map')} 
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${view === 'map' ? 'bg-border text-tx shadow-sm' : 'text-tx-muted hover:text-tx'}`}
        >
          Concept Map
        </button>
      </div>

      {/* Main Content */}
      {view === 'map' && analysis?.mapData && (
        <NewsMap mapData={analysis.mapData} />
      )}

      {view === 'feed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((item) => {
            const insight = analysis?.articlesSentiment[item.id] || { sentiment: 'NEUTRAL', reason: 'Unprocessed' };
            const isPos = insight.sentiment === 'POSITIVE';
            const isNeg = insight.sentiment === 'NEGATIVE';
            
            return (
              <button
                onClick={() => setActiveArticle(item)}
                key={item.id} 
                className={`
                  text-left flex flex-col flex-1 p-5 rounded-xl border bg-surface hover:bg-surface-hover transition-colors group relative
                  ${isPos ? 'border-positive/30 hover:border-positive/60' : isNeg ? 'border-negative/30 hover:border-negative/60' : 'border-border'}
                `}
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 bg-accent/10 text-accent rounded-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                <div className="flex justify-between items-start mb-3 pr-8">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-tx-muted bg-border/50 px-2 py-1 rounded">
                    {item.source}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider
                    ${isPos ? 'bg-positive/10 text-positive' : isNeg ? 'bg-negative/10 text-negative' : 'bg-neutral/10 text-neutral/70'}
                  `}>
                    {insight.sentiment}
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-tx leading-snug mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-tx-muted leading-relaxed line-clamp-3 mb-4">
                  {item.snippet}
                </p>
                
                <div className="mt-auto pt-3 border-t border-border/50 flex flex-col gap-1 w-full">
                  <span className="text-[11px] font-mono whitespace-normal text-tx-muted">
                    <span className="text-accent/70 font-bold opacity-80 mr-1">↳</span>
                    {insight.reason}
                  </span>
                  <div className="flex items-center text-[10px] text-tx-muted/60 justify-end mt-2">
                    {new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {activeArticle && (
        <DeepDiveModal article={activeArticle} onClose={() => setActiveArticle(null)} />
      )}
    </div>
  );
}
