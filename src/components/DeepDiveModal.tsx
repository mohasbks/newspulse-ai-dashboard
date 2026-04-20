'use client';
import { useState, useEffect } from 'react';
import { NewsItem } from '@/lib/rss';
import { X, Copy, Loader2, Target, Users } from 'lucide-react';

interface Props {
  article: NewsItem;
  onClose: () => void;
}

interface DeepDiveData {
  summary: string[];
  impact: string;
  entities: string[];
}

export default function DeepDiveModal({ article, onClose }: Props) {
  const [data, setData] = useState<DeepDiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchDeepDive() {
      try {
        const res = await fetch('/api/deepdive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: article.title, snippet: article.snippet })
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeepDive();
  }, [article]);

  const copyPost = () => {
    if (!data) return;
    const post = `🚨 NewsPulse Alert:\n\n${article.title}\n\nKey Takeaways:\n${data.summary.map(s => `• ${s}`).join('\n')}\n\n🔍 Impact: ${data.impact}\n\n#NewsPulse #AI #TechNews`;
    navigator.clipboard.writeText(post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-surface border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        <div className="p-4 border-b border-border flex justify-between items-center bg-surface-hover">
          <span className="text-xs font-bold uppercase tracking-widest text-tx-muted">AI Deep Dive</span>
          <button onClick={onClose} className="p-1 text-tx-muted hover:text-tx transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <h2 className="text-lg font-bold text-tx leading-snug mb-4">{article.title}</h2>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-tx-muted">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
              <span className="text-xs font-mono">Running LLaMA 3.3 Analysis...</span>
            </div>
          ) : data ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              
              <div>
                <h3 className="text-xs font-bold text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Bullet Summary
                </h3>
                <ul className="space-y-2">
                  {data.summary.map((point, i) => (
                    <li key={i} className="text-sm text-tx-muted leading-relaxed flex items-start gap-2">
                      <span className="text-border-hover mt-1">●</span> {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-border/20 p-4 rounded-lg border border-border/50 border-l-4 border-l-accent">
                <h3 className="text-xs font-bold text-tx uppercase tracking-wider mb-1">Market Impact</h3>
                <p className="text-sm font-medium text-tx-muted">{data.impact}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold text-tx uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Key Entities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.entities.map((en, i) => (
                    <span key={i} className="px-2 py-1 bg-surface-hover border border-border rounded text-xs text-tx font-mono">
                      {en}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="text-negative text-sm">Failed to generate insights.</div>
          )}
        </div>

        <div className="p-4 border-t border-border bg-surface-hover flex justify-end">
          <button 
            onClick={copyPost}
            disabled={loading || !data}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied to Clipboard!' : 'Copy as LinkedIn Post'}
          </button>
        </div>

      </div>
    </div>
  );
}
