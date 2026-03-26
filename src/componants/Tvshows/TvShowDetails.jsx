import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel } from "swiper/modules"
import "swiper/css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "4783682a696f279ea3f036ea2a5a0021";

export default function TvShowDetails() {
  const { id } = useParams();
  const [show,        setShow]        = useState(null);
  const [trailer,     setTrailer]     = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast,        setCast]        = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const [{ data }, { data: vidData }, { data: credData }] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`),
        axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`),
        axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`),
      ]);

      setShow(data);

      const t = vidData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
      setTrailer(t);

      setCast((credData.cast || []).filter(a => a.profile_path).slice(0, 20));
    }
    fetchAll();
  }, [id]);

  if (!show) return (
    <div className="flex justify-center items-center h-screen bg-[#0d0d0d]">
      <div className="flex gap-2">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-red-600 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );

  const genres   = show.genres?.map(g => g.name) || [];
  const score    = Math.round(show.vote_average * 10) / 10;
  const stars    = Math.round(score / 2);

  // ✅ TV-specific fields
  const seasons  = show.number_of_seasons;
  const episodes = show.number_of_episodes;
  const status   = show.status;
  const network  = show.networks?.[0]?.name || "—";

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">

      {/* ── Hero ── */}
      <div className="relative min-h-screen overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-cover bg-center scale-[1.04] blur-sm"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path})` }} />
        <div className="absolute inset-0 bg-black/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0d0d0d] to-transparent" />

        <Link to="/Tvshows"
          className="absolute top-6 left-6 z-10 text-sm text-[#aaa] px-3.5 py-1.5 rounded-full border border-[#333] bg-black/60 hover:text-white hover:border-[#555] transition-all">
          ← Back
        </Link>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row gap-10 px-10 pt-20 pb-12 max-w-5xl">

          {/* Poster */}
          <div className="w-[200px] flex-shrink-0 rounded-xl overflow-hidden border border-[#222]">
            <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} alt={show.name} className="w-full block" />
          </div>

          {/* Info */}
          <div className="flex-1 pt-2">
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[2px] text-white mb-1"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {show.name}
            </h1>

            {show.tagline && (
              <p className="text-[13px] text-[#555] italic mb-4 tracking-[.5px]">{show.tagline}</p>
            )}

            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {show.first_air_date && (
                <span className="px-3 py-1 rounded-full border border-[#333] text-[#777] text-[11px]">
                  {show.first_air_date.slice(0, 4)}
                </span>
              )}
              {genres.map(g => (
                <span key={g} className="px-3 py-1 rounded-full border border-red-600 text-red-500 bg-red-600/8 text-[11px]">
                  {g}
                </span>
              ))}
              {status && (
                <span className={`px-3 py-1 rounded-full text-[11px] border ${
                  status === "Returning Series"
                    ? "border-green-700 text-green-500 bg-green-600/8"
                    : "border-[#333] text-[#777]"
                }`}>
                  {status}
                </span>
              )}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-3 h-3 ${i < stars ? "bg-red-600" : "bg-[#333]"}`}
                    style={{ clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
                ))}
              </div>
              <span className="text-[12px] text-[#666]">
                {score} / 10 · {show.vote_count?.toLocaleString()} votes
              </span>
            </div>

            <p className="text-[14px] text-[#999] leading-[1.8] mb-7 max-w-xl">{show.overview}</p>

            {/* Buttons */}
            <div className="flex gap-3 mb-7">
              {trailer && (
                <button onClick={() => setShowTrailer(true)}
                  className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-[13px] font-medium transition-all cursor-pointer border-none">
                  <div className="w-0 h-0 border-y-[5px] border-y-transparent border-l-[9px] border-l-white" />
                  Play Trailer
                </button>
              )}
              <button className="px-5 py-2 bg-white/6 border border-[#333] hover:bg-white/12 hover:text-white text-[#bbb] rounded text-[13px] font-medium transition-all cursor-pointer">
                + Add to List
              </button>
            </div>

            {/* ✅ TV-specific stats */}
            <div className="flex border border-[#1e1e1e] rounded-lg overflow-hidden w-fit">
              {[
                { l: "Seasons",  v: seasons  || "—" },
                { l: "Episodes", v: episodes || "—" },
                { l: "Network",  v: network          },
              ].map((s, i) => (
                <div key={s.l} className={`px-5 py-3 bg-[#111] ${i > 0 ? "border-l border-[#1e1e1e]" : ""}`}>
                  <div className="text-[10px] uppercase tracking-[2px] text-[#444] mb-1">{s.l}</div>
                  <div className="text-[15px] font-medium text-[#ddd]">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cast ── */}
      
       
      {/* ── Cast ── */}
      {cast.length > 0 && (
        <div className="px-10 pb-20 -mt-4">
          <div className="text-[10px] uppercase tracking-[4px] text-[#444] mb-4">Cast</div>
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-[#333]">
           <Swiper
            modules={[FreeMode, Mousewheel]}
            spaceBetween={10}
            slidesPerView="auto"
            freeMode={true}
            grabCursor={true}
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
          >
            {cast.map(actor => (
              <SwiperSlide key={actor.id} style={{ width: "150px" }}>
                <Link to={`/actor/${actor.id}`} className="flex flex-col items-center text-white">
             
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/placeholder.png"
                    }
                    alt={actor.name}
                    className="w-full rounded-lg object-cover"
                  />
                  <p className="text-sm font-semibold mt-2 text-center">{actor.name}</p>
                  <p className="text-xs text-gray-400 text-center">{actor.character}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          </div>
        </div>
      )}

      {/* ── Trailer Modal ── */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 bg-black/93 z-50 flex items-center justify-center p-8"
          onClick={e => e.target === e.currentTarget && setShowTrailer(false)}>
          <div className="relative w-[65%] max-w-3xl aspect-video">
            <button onClick={() => setShowTrailer(false)}
              className="absolute -top-8 right-0 text-[#aaa] hover:text-white text-2xl cursor-pointer bg-transparent border-none">
              ×
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full border-none rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}