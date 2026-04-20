'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, Activity } from 'lucide-react';

export default function SiteNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container max-w-7xl mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent/10 border border-accent/20 rounded-lg flex items-center justify-center transition-colors group-hover:bg-accent/20">
              <Network className="w-4 h-4 text-accent" />
            </div>
            <span className="font-bold tracking-tight text-tx transition-colors group-hover:text-accent">
              NewsPulse<span className="text-accent">.</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-tx-muted">
            <Link 
              href="/pricing" 
              className={`transition-colors hover:text-tx ${pathname === '/pricing' ? 'text-tx' : ''}`}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors hover:text-tx ${pathname === '/about' ? 'text-tx' : ''}`}
            >
              Architecture
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-1.5 bg-tx text-background hover:bg-tx-muted transition-colors rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <Activity className="w-3 h-3" />
            Launch App
          </Link>
        </div>

      </div>
    </header>
  );
}
