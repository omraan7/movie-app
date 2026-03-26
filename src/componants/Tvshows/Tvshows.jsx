// Tvshows.jsx
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "4783682a696f279ea3f036ea2a5a0021";

const buttons = [
  { id: 1, label: "Trending" },
  { id: 2, label: "Popular"  },
  { id: 3, label: "Top Rated"},
];

const urls = {
  1: `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`,
  2: `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`,
  3: `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`,
};

export default function Tvshows() {
  const [shows,   setShows]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [active,  setActive]  = useState(null);

  async function handleCategory(id) {
    if (active === id) return;          // ✅ مضغطتش مرتين على نفس الزرار
    setActive(id);
    setLoading(true);
    try {
      const { data } = await axios.get(urls[id]);
      setShows((data.results || []).filter(s => s.poster_path));
    } catch (e) {
      console.error(e);
      setShows([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white px-10 py-10 pb-20">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[3rem] leading-none tracking-[3px] text-white mb-1"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          TV Shows
        </h1>
        <p className="text-[11px] text-[#444] uppercase tracking-[2px]">Browse by category</p>
      </div>

      {/* Category buttons */}
      <div className="flex gap-2.5 mb-8 flex-wrap">
        {buttons.map(btn => (
          <button
            key={btn.id}
            onClick={() => handleCategory(btn.id)}
            className={`px-5 py-2 rounded text-[12px] font-medium uppercase tracking-[1px] transition-all duration-200 cursor-pointer
              ${active === btn.id
                ? "bg-red-600 border border-red-600 text-white"
                : "bg-white/5 border border-[#2a2a2a] text-[#666] hover:bg-white/9 hover:text-[#bbb] hover:border-[#444]"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex gap-2 justify-center py-20">
          {[0,1,2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-red-600 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      )}

      {/* Empty state — before any selection */}
      {!loading && active === null && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="text-5xl mb-4">😶🎥</div>
          <p className="text-[14px] text-[#444]">Select a category from buttons to get started</p>
        </div>
      )}

      {/* No results */}
      {!loading && active !== null && shows.length === 0 && (
        <div className="text-center py-20 text-[#444] text-[14px]">No results found</div>
      )}

      {/* Grid */}
      {!loading && shows.length > 0 && (
        <>
          <div className="text-[11px] text-[#444] uppercase tracking-[2px] mb-4">
            {shows.length} shows
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3.5">
            {shows.map((show, i) => {
              const year  = show.first_air_date?.slice(0, 4) || "—";
              const score = Math.round(show.vote_average * 10) / 10;

              return (
                <Link
                  key={show.id}
                  to={`/tv/${show.id}`}         
                  className="group relative rounded-lg overflow-hidden bg-[#111] block transition-transform duration-250 hover:scale-105"
                >
                  {/* Rank */}
                  <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-red-600/85 flex items-center justify-center text-[10px] font-semibold text-white">
                    {i + 1}
                  </div>

                  {/* Score */}
                  <div className="absolute top-2 right-2 z-10 bg-black/75 border border-[#333] rounded px-1.5 py-0.5 text-[10px] text-yellow-400 font-medium">
                    ★ {score}
                  </div>

                  <img
                    src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                    alt={show.name}
                    className="w-full aspect-2/3 object-cover block"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 pb-3">
                    <div className="text-[12px] font-medium text-white leading-tight mb-1">{show.name}</div>
                    <div className="text-[10px] text-red-500">{year}</div>
                  </div>

                  {/* Bottom label */}
                  <div className="px-2.5 py-2 pb-3 bg-[#111]">
                    <div className="text-[13px] font-medium text-[#ddd] leading-tight truncate">{show.name}</div>
                    <div className="text-[10px] text-[#555] mt-0.5">{year}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}