export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl text-center max-w-md">
        <div className="text-6xl mb-6">📵</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          אין חיבור לאינטרנט
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          No Internet Connection
        </p>
        <p className="text-gray-500 mb-6">
          אנא בדוק את החיבור שלך ונסה שוב
          <br />
          Please check your connection and try again
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white
                   px-8 py-4 rounded-2xl font-bold text-lg shadow-lg
                   hover:shadow-xl hover:scale-105 transition-all"
        >
          🔄 נסה שוב / Try Again
        </button>
      </div>
    </div>
  );
}
