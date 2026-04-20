export default function PrivacyPage() {
  return (
    <div className="flex-1 flex justify-center p-8 mt-10">
      <div className="max-w-3xl w-full text-tx-muted space-y-6 text-sm leading-relaxed">
        <h1 className="text-4xl font-black text-tx tracking-tight mb-8">Privacy Policy</h1>
        
        <p><strong>Effective Date:</strong> January 1, 2026</p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">1. Information We Collect</h2>
        <p>
          NewsPulse operates primarily as a frontend aggregator. We collect minimal personal data. When you subscribe to our newsletter, we collect your email address. We do not store or track your IP address for reading the news feed.
        </p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">2. How We Use API Keys & Local Data</h2>
        <p>
          NewsPulse is designed to connect securely with the Groq API for Market Sentiment analysis. If you run NewsPulse locally, your <code>GROQ_API_KEY</code> is never stored on our external servers; it remains securely in your local environment file (<code>.env.local</code>) or is proxied via Next.js Serverless Functions when deployed.
        </p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">3. Third-Party Links</h2>
        <p>
          Our platform aggregates links from global publishers (such as BBC, Reuters, TechCrunch). We are not responsible for the privacy practices of these external sites once you click on an article to read the full story.
        </p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">4. Updates to this Policy</h2>
        <p>
          We may update our Privacy Policy periodically. Any changes will be posted on this page with an updated "Effective Date".
        </p>

        <div className="mt-16 pt-8 border-t border-border">
          <p>If you have any questions, contact us at <a href="mailto:privacy@newspulse.example.com" className="text-accent hover:underline">privacy@newspulse.example.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
