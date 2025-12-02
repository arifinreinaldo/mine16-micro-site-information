export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            🐾 Pet Information Hub
          </h1>
          <p className="text-gray-600 mt-1">Your trusted pet profile and contact resource</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Pet Information...</h2>
          <p className="text-gray-600">Please wait while we fetch the pet details.</p>
        </div>
      </main>
    </div>
  );
}
