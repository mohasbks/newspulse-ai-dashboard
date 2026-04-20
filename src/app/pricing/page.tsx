import { Check } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 mt-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-tx tracking-tight mb-4">Simple, transparent pricing</h1>
        <p className="text-tx-muted font-medium">Start for free. Upgrade when your trading needs grow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Free Tier */}
        <div className="p-8 rounded-3xl border border-border bg-surface flex flex-col hover:border-tx-muted transition-colors">
          <h2 className="text-xl font-bold text-tx mb-2">Hobby</h2>
          <div className="text-4xl font-black text-tx mb-6">$0<span className="text-lg text-tx-muted font-medium tracking-normal">/mo</span></div>
          <p className="text-sm text-tx-muted mb-8 leading-relaxed">Perfect for casual readers tracking global tech and finance news.</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            <Feature text="150 AI Requests / day" />
            <Feature text="Standard RSS Feeds" />
            <Feature text="Text-to-Speech Briefs" />
          </ul>

          <button className="w-full py-3 rounded-xl bg-surface-hover border border-border text-tx font-bold text-sm tracking-wide hover:bg-border transition-colors">
            Current Plan
          </button>
        </div>

        {/* Pro Tier */}
        <div className="p-8 rounded-3xl border border-accent bg-accent/5 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.1)]">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent to-positive" />
          <h2 className="text-xl font-bold text-tx mb-2 flex justify-between items-center">
            Pro <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-accent/20 text-accent rounded-full">Popular</span>
          </h2>
          <div className="text-4xl font-black text-tx mb-6">$29<span className="text-lg text-tx-muted font-medium tracking-normal">/mo</span></div>
          <p className="text-sm text-tx-muted mb-8 leading-relaxed">For day traders and analysts requiring zero delay and custom sources.</p>
          
          <ul className="space-y-4 mb-8 flex-1">
            <Feature text="Unlimited AI Analysis" />
            <Feature text="Custom RSS URL Injection" />
            <Feature text="Deep Dive LinkedIn Export" />
            <Feature text="Priority WebSockets" />
          </ul>

          <button className="w-full py-3 rounded-xl bg-tx text-background font-bold text-sm tracking-wide hover:opacity-90 transition-opacity">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-sm text-tx font-medium">
      <div className="w-5 h-5 rounded-full bg-positive/20 flex items-center justify-center text-positive">
        <Check className="w-3 h-3" />
      </div>
      {text}
    </li>
  );
}
