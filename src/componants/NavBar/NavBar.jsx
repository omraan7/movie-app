// NavBar.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "4783682a696f279ea3f036ea2a5a0021";

const links = [
  { to: "/",        label: "Home"     },
  { to: "/people",  label: "People"   },
  { to: "/Tvshows", label: "TV Shows" },
  // { to: "/contact", label: "Contact"  },
];

export default function NavBar() {
  const [open,       setOpen]       = useState(false);
  const [query,      setQuery]      = useState("");
  const [results,    setResults]    = useState([]);
  const [searching,  setSearching]  = useState(false);
  const [showDrop,   setShowDrop]   = useState(false);
  const timerRef   = useRef(null);
  const wrapRef    = useRef(null);
  const navigate   = useNavigate();

 
  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const search = useCallback(async (q) => {
    if (!q || q.length < 2) { setResults([]); setShowDrop(false); return; }
    setSearching(true);
    setShowDrop(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        { params: { api_key: API_KEY, language: "en-US", query: q, page: 1 } }
      );
      setResults((data.results || []).filter(m => m.poster_path).slice(0, 7));
    } catch (err) {
      setResults([]);
      console.log(err);
      
    } finally {
      setSearching(false);
    }
  }, []);

  function handleInput(e) {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(timerRef.current);
    if (!q.trim()) { setResults([]); setShowDrop(false); return; }
    timerRef.current = setTimeout(() => search(q.trim()), 350);
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
    setShowDrop(false);
  }

  function goToMovie(id) {
    clearSearch();
    setOpen(false);
    navigate(`/movie/${id}`);
  }

  const activeClass = ({ isActive }) =>
    `text-[12px] uppercase tracking-[1px] transition-colors duration-200 relative pb-0.5
     after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-red-600 after:transition-all after:duration-250
     ${isActive ? "text-white after:w-full" : "text-[#777] hover:text-white after:w-0 hover:after:w-full"}`;

  const drawerClass = ({ isActive }) =>
    `block px-4 py-2.5 text-[13px] uppercase tracking-[1.5px] rounded-md transition-all duration-200
     ${isActive
       ? "text-white bg-red-600/10 border-l-2 border-red-600 pl-[calc(1rem-2px)]"
       : "text-[#777] hover:text-white hover:bg-red-600/10 hover:border-l-2 hover:border-red-600 hover:pl-[calc(1rem-2px)]"}`;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0d0d0d]/97 border-b border-[#1a1a1a] h-15 flex items-center justify-between gap-6 px-10">

        {/* Logo */}
        <NavLink to="/" className=" hidden md:flex font-black text-[1.4rem] tracking-[3px] text-white no-underline shrink-0"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          OMRAN<span className="text-red-600">'S</span> MOVIES
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7 list-none shrink-0">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} className={activeClass} end={l.to === "/"}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Search ── */}
        <div className="relative flex-1 max-w-[320px]" ref={wrapRef}>
          <div className="flex items-center bg-[#111] border border-[#222] rounded-md overflow-hidden transition-colors focus-within:border-[#444]">
            {/* Icon */}
            <div className="px-2.5 text-[#555] flex items-center shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <input
              type="text"
              value={query}
              onChange={handleInput}
              onFocus={() => results.length > 0 && setShowDrop(true)}
              placeholder="Search movies..."
              autoComplete="off"
              className="bg-transparent border-none outline-none text-[#ddd] text-[13px] py-2.5 pr-2 w-full placeholder-[#444] font-[DM_Sans]"
            />

            {query && (
              <button onClick={clearSearch}
                className="px-2.5 text-[#555] hover:text-[#aaa] text-lg cursor-pointer bg-transparent border-none shrink-0">
                ×
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDrop && (
            <div className="z-9999 absolute top-[calc(100%+8px)] left-0 right-0 bg-[#111] border border-[#222] rounded-lg max-h-100 overflow-y-auto
              scrollbar-thin scrollbar-thumb-[#333]">

              {searching ? (
                <div className="flex gap-1.5 justify-center py-6">
                  {[0,1,2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"
                      style={{ animationDelay: `${i*0.2}s` }} />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-[#444] text-[13px]">
                  No results for "{query}"
                </div>
              ) : (
                <>
                  <div className="px-3 py-2 text-[10px] text-[#444] tracking-[3px] uppercase border-b border-[#1a1a1a]">
                    Results for "{query}"
                  </div>
                  {results.map(m => (
                    <div key={m.id} onClick={() => goToMovie(m.id)}
                      className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#1a1a1a] transition-colors">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${m.poster_path}`}
                        alt={m.title}
                        className="w-9 h-13.5 object-cover rounded shrink-0 bg-[#1a1a1a]"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] text-[#ddd] font-medium truncate">{m.title}</div>
                        <div className="text-[11px] text-[#555] mt-0.5">
                          {m.release_date?.slice(0, 4) || "—"}
                        </div>
                      </div>
                      <div className="text-[11px] text-red-500 shrink-0">
                        ★ {Math.round(m.vote_average * 10) / 10}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(o => !o)}
          className="md:hidden flex flex-col gap-1.25 cursor-pointer p-1 bg-transparent border-none"
          aria-label="Toggle menu">
          <span className={`w-5.5 h-[1.5px] bg-[#aaa] rounded transition-all duration-300 ${open ? "rotate-45 translate-x-1.5 translate-y-1.5" : ""}`} />
          <span className={`w-5.5 h-[1.5px] bg-[#aaa] rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`w-5.5 h-[1.5px] bg-[#aaa] rounded transition-all duration-300 ${open ? "-rotate-45 translate-x-1.5 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 top-15 bg-black/60 z-40 md:hidden"
          onClick={() => setOpen(false)} />
      )}

      {/* Drawer */}
      <div className={`fixed top-15 left-0 h-full w-60 bg-[#0d0d0d] border-r border-[#1a1a1a] z-50 transition-transform duration-350 ease-in-out md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="px-6 pt-8">
          <div className="text-[10px] text-[#333] tracking-[3px] uppercase mb-4">Navigation</div>
          <ul className="flex flex-col gap-2 list-none">
            {links.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} className={drawerClass} onClick={() => setOpen(false)} end={l.to === "/"}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}