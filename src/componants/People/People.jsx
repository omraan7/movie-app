// People.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "4783682a696f279ea3f036ea2a5a0021";

export default function People() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function getPeople() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setActors(data.results.filter(p => p.known_for_department === "Acting"));
      } catch (err) {
        console.error(err);
      }
    }
    getPeople();
  }, []);

  if (!actors.length) return (
    <div className="flex justify-center items-center h-screen bg-[#0d0d0d]">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-red-600 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#0d0d0d] min-h-screen p-10 pb-20">

      {/* Header */}
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-5xl tracking-[3px] text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Popular Actors
        </h1>
        <span className="text-[11px] uppercase tracking-[2px] text-[#444]">
          {actors.length} actors
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {actors.map((actor, i) => (
          <Link
            key={actor.id}
            to={`/actor/${actor.id}`}
            className="group relative rounded-lg overflow-hidden bg-[#111] block transition-transform duration-250 hover:scale-105"
          >
            {/* Rank badge */}
            <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-red-600/85 flex items-center justify-center text-[10px] font-semibold text-white">
              {i + 1}
            </div>

            {/* Poster */}
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
                className="w-full aspect-[2/3] object-cover object-top block"
                loading="lazy"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-[#1a1a1a] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/92 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 pb-3">
              <div className="text-[12px] font-medium text-white leading-tight mb-1">{actor.name}</div>
              <div className="text-[10px] text-red-500 uppercase tracking-[1px]">{actor.known_for_department}</div>
            </div>

            {/* Bottom label */}
            <div className="px-2 py-2.5 bg-[#111]">
              <div className="text-[13px] font-medium text-[#ddd] leading-tight">{actor.name}</div>
              <div className="text-[10px] text-[#555] uppercase tracking-[1px] mt-0.5">{actor.known_for_department}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}