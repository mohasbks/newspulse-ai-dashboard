export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export async function fetchLiveMarketData(): Promise<MarketData[]> {
  try {
    // Fetching real data from CoinGecko Free API
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 60 } } // Cache for 1 minute
    );
    
    if (!res.ok) throw new Error('CoinGecko API failed');
    
    const data = await res.json();
    
    return [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
      },
      {
        symbol: 'SOL',
        name: 'Solana',
        price: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
      },
      {
        symbol: 'XRP',
        name: 'Ripple',
        price: data.ripple?.usd || 0,
        change24h: data.ripple?.usd_24h_change || 0,
      }
    ];
  } catch (error) {
    console.error("Market fetch error:", error);
    return [];
  }
}
