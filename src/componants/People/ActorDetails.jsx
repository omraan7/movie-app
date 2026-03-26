// ActorDetails.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API_KEY = "4783682a696f279ea3f036ea2a5a0021";

export default function ActorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`)
      .then((r) => setActor(r.data));
  }, [id]);

  async function loadMovies() {
    if (moviesLoaded) return;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`
    );
    const sorted = data.cast
      .filter((m) => m.poster_path)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 24);
    setMovies(sorted);
    setMoviesLoaded(true);
  }

  async function loadPhotos() {
    if (photosLoaded) return;
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${API_KEY}`
    );
    setPhotos(data.profiles.slice(0, 30));
    setPhotosLoaded(true);
  }

  function toggle(section) {
    if (activeSection === section) { setActiveSection(null); return; }
    setActiveSection(section);
    if (section === "movies") loadMovies();
    else loadPhotos();
  }

  if (!actor) return (
    <div className="flex justify-center items-center h-screen bg-[#0d0d0d]">
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-red-600 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );

  const bio = actor.biography?.length > 260
    ? actor.biography.slice(0, 260) + "…"
    : actor.biography;

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen pb-20">

        <div className=" md:hidden  absolute bottom-0 left-0 right-0 h-full bg-linear-to-t from-[#000000] to-transparent" ></div>
      {/* ── Hero ── */}
      <div className="relative h-125 overflow-hidden">

        {actor.profile_path && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w780${actor.profile_path}`}
              alt={actor.name}
              className="absolute right-0 top-0 h-full w-full lg:w-[42%] object-cover object-center  "
            />
              
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-full bg-linear-to-t from-[#000000] to-transparent" ></div>
       <Link to = "/people"
          className="absolute top-6 cursor-pointer z-999 left-6 text-[#aaa] text-sm px-3.5 py-1.5 rounded-full border border-[#333] bg-black/60 hover:text-white hover:border-[#666] transition-all">
          ← Back to People
        </Link>
        <div className="relative z-10 p-10 pt-20 max-w-140">
          <h1 className="text-[clamp(3rem,7vw,4rem)] leading-none tracking-[3px] font-black text-white mb-1"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {actor.name}
          </h1>
          <p className="text-[11px] tracking-[4px] uppercase text-[#555] mb-5">
            {actor.known_for_department}
          </p>

          {/* Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {actor.birthday && (
              <span className="px-3 py-1 rounded-full border border-[#333] text-[#888] text-xs">
                {actor.birthday}
              </span>
            )}
            {actor.place_of_birth && (
              <span className="px-3 py-1 rounded-full border border-[#333] text-[#888] text-xs">
                {actor.place_of_birth}
              </span>
            )}
            {actor.deathday && (
              <span className="px-3 py-1 rounded-full border border-red-900/40 bg-red-900/15 text-red-400 text-xs">
                ✝ {actor.deathday}
              </span>
            )}
          </div>

          <p className="text-[13.5px] text-[#888] leading-[1.75] mb-7">{bio}</p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={() => toggle("movies")}
              className={`px-5 py-2 rounded text-sm font-medium transition-all cursor-pointer ${activeSection === "movies"
                  ? "bg-red-600 text-white"
                  : "bg-transparent border border-red-600 text-red-500 hover:bg-red-600/10"
                }`}>
              ▶ Movies
            </button>
            <button onClick={() => toggle("photos")}
              className={`px-5 py-2 rounded text-sm font-medium transition-all cursor-pointer border ${activeSection === "photos"
                  ? "border-red-600/40 bg-red-600/10 text-red-400"
                  : "border-[#333] bg-white/5 text-[#bbb] hover:bg-white/10 hover:text-white"
                }`}>
              ⊞ Photos
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 px-10 mt-4">
        {[
          { l: "Popularity", v: Math.round(actor.popularity) },
          { l: "Department", v: actor.known_for_department || "—" },
          { l: "Gender", v: actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "—" },
          { l: "Born", v: actor.birthday?.slice(0, 4) ?? "—" },
        ].map((s) => (
          <div key={s.l} className="bg-[#111] border border-[#1e1e1e] rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-[2px] text-[#444] mb-1">{s.l}</div>
            <div className="text-[19px] font-medium text-[#ddd]">{s.v}</div>
          </div>
        ))}
      </div>

      {/* ── Movies Grid ── */}
      {activeSection === "movies" && (
        <div className="px-10 mt-6">
          <div className="text-[10px] uppercase tracking-[4px] text-[#444] mb-4">Known For</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
            {movies.map((m) => (
              <div key={m.id} onClick={() => navigate(`/movie/${m.id}`)}
                className="group relative rounded-md overflow-hidden aspect-[2/3] bg-[#111] cursor-pointer transition-transform duration-200 hover:scale-105">
                <img src={`https://image.tmdb.org/t/p/w342${m.poster_path}`} alt={m.title}
                  className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[11px] text-white font-medium leading-tight">{m.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Photos Grid ── */}
      {activeSection === "photos" && (
        <div className="px-10 mt-6">
          <div className="text-[10px] uppercase tracking-[4px] text-[#444] mb-4">Photos</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
            {photos.map((p, i) => (
              <div key={i} onClick={() => setSelectedPhoto(`https://image.tmdb.org/t/p/original${p.file_path}`)}
                className="aspect-[2/3] rounded-md overflow-hidden cursor-pointer bg-[#111] transition-transform duration-200 hover:scale-105">
                <img src={`https://image.tmdb.org/t/p/w300${p.file_path}`} alt=""
                  className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Photo Modal ── */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/93 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedPhoto(null)}>
          <button onClick={() => setSelectedPhoto(null)}
            className="fixed top-5 right-5 w-9 h-9 rounded-full bg-[#1a1a1a] border border-[#333] text-[#ccc] text-xl flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white transition-all cursor-pointer">
            ×
          </button>
          <img src={selectedPhoto} alt="" className="max-w-[88%] max-h-[88vh] rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
}