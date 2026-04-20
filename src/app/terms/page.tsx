export default function TermsPage() {
  return (
    <div className="flex-1 flex justify-center p-8 mt-10">
      <div className="max-w-3xl w-full text-tx-muted space-y-6 text-sm leading-relaxed">
        <h1 className="text-4xl font-black text-tx tracking-tight mb-8">Terms of Service</h1>
        
        <p><strong>Last Updated:</strong> January 1, 2026</p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the NewsPulse platform ("Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Platform.
        </p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">2. Description of Service</h2>
        <p>
          NewsPulse acts as a live Next.js-based RSS aggregator and AI analysis dashboard. We pull publicly available RSS feeds from various news organizations and utilize the Groq API (LLaMA) to perform Natural Language Processing on the text snippets.
        </p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">3. Intellectual Property Rights</h2>
        <p>
          The original news content, images, and headlines displayed on NewsPulse remain the intellectual property of their respective creators and publishers (e.g., BBC, TechCrunch, Wall Street Journal). NewsPulse only displays short snippets under Fair Use principles, directing users to the original publisher for the full article.
        </p>
        <p>
          The NewsPulse codebase, design, and UI/UX are the intellectual property of the NewsPulse development team.
        </p>

        <h2 className="text-xl font-bold text-tx mt-10 mb-4">4. Limitation of Liability</h2>
        <p>
          The AI-generated "Market Mood" and sentiment analyses are provided for entertainment and informational purposes only. They do not constitute financial, investment, or legal advice. NewsPulse is not liable for any financial losses incurred based on the outputs of our AI models.
        </p>

        <div className="mt-16 pt-8 border-t border-border">
          <p>By continuing to use NewsPulse, you acknowledge you have read and understood these terms.</p>
        </div>
      </div>
    </div>
  );
}
