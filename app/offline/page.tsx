'use client';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-md border">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          אין חיבור לאינטרנט
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          No Internet Connection
        </p>
        <p className="text-muted-foreground mb-6">
          אנא בדוק את החיבור שלך ונסה שוב
          <br />
          Please check your connection and try again
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground
                   px-8 py-4 rounded-2xl font-bold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 transition-all hover:bg-primary/90"
        >
          נסה שוב / Try Again
        </button>
      </div>

      {/* Simple Footer without i18n */}
      <footer className="text-center mt-16 mb-8 ps-4 pe-4" dir="ltr" lang="en">
        <p className="text-sm text-foreground/80">
          Built with Love and AI by{' '}
          <a
            href="https://www.linkedin.com/in/elli-patrick/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline font-medium inline-flex items-center gap-1"
          >
            Elizabeth Patrick
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" x2="21" y1="14" y2="3" />
            </svg>
          </a>
        </p>
      </footer>
    </div>
  );
}
