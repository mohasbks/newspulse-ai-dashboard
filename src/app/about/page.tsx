import { Database, Zap, Cpu, Code2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1 flex justify-center p-8 mt-10">
      <div className="max-w-3xl w-full">
        
        <h1 className="text-4xl font-black text-tx tracking-tight mb-4">Architecture</h1>
        <p className="text-tx-muted font-medium mb-12">How NewsPulse processes data at the speed of thought.</p>

        <div className="space-y-12">
          
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-surface border border-border text-tx"><Database className="w-5 h-5"/></div>
              <h2 className="text-xl font-bold text-tx">Data Aggregation Layer</h2>
            </div>
            <p className="text-sm text-tx-muted leading-relaxed mb-4">
              Instead of relying on rate-limited third-party APIs (like GNews), NewsPulse queries the raw XML RSS feeds of major publications directly from the Next.js server. This guarantees 0 delays and circumvents standard CORS boundaries, providing a truly live feed.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-surface border border-border text-accent"><Cpu className="w-5 h-5"/></div>
              <h2 className="text-xl font-bold text-tx">Inference Engine (Groq + LLaMA 3.3)</h2>
            </div>
            <p className="text-sm text-tx-muted leading-relaxed mb-4">
              When news is pulled, the entire payload is batched and sent to Meta's LLaMA 3.3 70B model running on a Groq LPU cluster. Because Groq processes tokens at ~800 tok/s, complex sentiment analysis across 15 headlines completes in &lt;1 second.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-surface border border-border text-positive"><Zap className="w-5 h-5"/></div>
              <h2 className="text-xl font-bold text-tx">Visualization (React Flow)</h2>
            </div>
            <p className="text-sm text-tx-muted leading-relaxed mb-4">
              The AI structures the news into Entities and Edges. This JSON is passed seamlessly into <code>@xyflow/react</code>, plotting an interactive concept map showing how companies, people, and themes connect in the global ecosystem today.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-surface border border-border text-tx-muted"><Code2 className="w-5 h-5"/></div>
              <h2 className="text-xl font-bold text-tx">Frontend Client</h2>
            </div>
            <p className="text-sm text-tx-muted leading-relaxed mb-4">
              Built on Next.js 15 App Router using Tailwind CSS v4. The UI adheres to a sleek, brutalist terminal aesthetic.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
