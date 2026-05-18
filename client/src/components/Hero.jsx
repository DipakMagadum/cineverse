function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 h-96 flex items-center px-10">
      <div className="max-w-lg">
        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
          🔥 Trending Now
        </span>
        <h1 className="text-4xl font-bold text-white mt-4 mb-3">
          Welcome to TadiPaar
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Download latest Bollywood, Hollywood & South Indian movies in HD quality
        </p>
        <div className="flex gap-3">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold">
            🎬 Browse Movies
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold">
            📥 Latest Downloads
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero