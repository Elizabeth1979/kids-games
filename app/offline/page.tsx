'use client';

import Footer from '@/components/shared/Footer';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
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
      <Footer />
    </div>
  );
}
