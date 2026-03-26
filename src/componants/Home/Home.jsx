// Home.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardHome from "./CardHome";

const API_KEY = "4783682a696f279ea3f036ea2a5a0021";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day`,
        { params: { api_key: API_KEY, language: "en-US", page: 1 } }
      );
      setMovies(data.results);
      setLoading(false);
    }
    getMovies();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-[#0d0d0d]">
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-red-600 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );

  const featured = movies[1];

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">

      {/* ── Hero Banner ── */}
      <div className="relative h-130 overflow-hidden mb-12">


        <div className="absolute inset-0 bg-cover  bg-position-[center_top] scale-[1.04] blur-[1px]"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${featured?.backdrop_path})` }} ></div>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/50 to-transparent" ></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-[#0d0d0d] to-transparent" ></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-12 max-w-162.5">


          <div className="flex items-center gap-2 bg-red-600/12 border border-red-600/35 rounded-full px-3.5 py-1.5 w-fit mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[11px] text-red-400 uppercase tracking-[2px]">Made by Omran</span>
          </div>

          <h1 className="text-[clamp(3rem,8vw,6rem)] leading-none tracking-[4px] text-white mb-2"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="text-red-600">MOVIES</span><br />
            To <span className="text-red-600">Day</span>
          </h1>

          <p className="text-[14px] text-[#888] leading-[1.7] mb-7 max-w-120">
            Discover trending movies, explore actor profiles, and build your personal watchlist
            all in one place. Built with passion by{" "}
            <span className="text-[#f0f0f0] font-medium">Omran</span>.
          </p>

           <div className="flex items-center md:gap-8 gap-2  ">
            {[
              { num: "20+", label: "Trending" },
              { num: "4K", label: "Actors" },
              { num: "HD", label: "Trailers" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-9 bg-white/40" />}
                <div>
                  <div className="text-[2rem] leading-none text-white tracking-[1px]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.num}</div>
                  <div className="text-[10px] text-[#555] uppercase tracking-[2px] mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CardHome movies={movies} />
    </div>
  );
}