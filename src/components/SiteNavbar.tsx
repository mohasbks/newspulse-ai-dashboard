'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Network, Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function SiteNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
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
            className="hidden md:flex items-center gap-2 px-4 py-1.5 bg-tx text-background hover:bg-tx-muted transition-colors rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <Activity className="w-3 h-3" />
            Launch App
          </Link>
          
          <button 
            className="md:hidden text-tx-muted hover:text-tx p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bg-surface border-b border-border flex flex-col p-4 shadow-2xl z-40 animate-in slide-in-from-top-2">
          <Link 
            href="/dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 p-4 mb-2 bg-tx text-background rounded-full font-bold text-sm justify-center uppercase tracking-wider"
          >
            <Activity className="w-4 h-4" />
            Launch Dashboard
          </Link>
          <div className="flex flex-col gap-2">
            <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="p-4 rounded-xl text-tx font-medium hover:bg-surface-hover border border-transparent hover:border-border transition-colors">
              Pricing Options
            </Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="p-4 rounded-xl text-tx font-medium hover:bg-surface-hover border border-transparent hover:border-border transition-colors">
              System Architecture
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
