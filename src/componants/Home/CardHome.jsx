import { Link } from "react-router";

 export default function CardHome({ movies }) {

  return (
<>
       <div className="flex items-baseline justify-between px-10 mb-5">
        <h2 className="text-[1.2rem] tracking-[2px] md:text-[1.5rem] font-medium"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Trending Today
        </h2>
        <span className="text-[11px] text-[#444] uppercase tracking-[2px]">{movies.length} movies</span>
      </div>

       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3.5 px-10 pb-20">
        {movies.map((movie, i) => {
          const year     = movie.release_date?.slice(0, 4) || "";
          const score    = Math.round(movie.vote_average * 10) / 10;
          const overview = movie.overview.split(" ").slice(0, 7).join(" ") + "…";

          return (
            <Link key={movie.id} to={`/movie/${movie.id}`}
              className="group relative rounded-lg overflow-hidden bg-[#111] block transition-transform duration-250 hover:scale-105">

             <div className="absolute top-10 left-1 z-10 w-10 h-6 rounded-full bg-blue-600/95 flex items-center justify-center text-[10px] font-semibold text-white">
                {year}
              </div>
              <div className="absolute top-2 left-2 z-10 w-6 h-6 rounded-full bg-red-600/85 flex items-center justify-center text-[10px] font-semibold text-white">
                {i + 1}
              </div>

               <div className="absolute top-2 right-2 z-10 bg-black/75 border border-[#333] rounded px-1.5 py-0.5 text-[10px] text-yellow-400 font-medium">
                ★ {score}
              </div>
 
              {movie.poster_path
                ? <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={movie.title}
                    className="w-full aspect-2/3 object-cover block" loading="lazy" />
                : <div className="w-full aspect-2/3 bg-[#1a1a1a]" />
              }

              
              <div className="absolute inset-0 bg-linear-to-t from-black to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-2.5 pb-4">
                <div className="text-[18px] font-medium text-white leading-tight mb-3">{movie.title}</div>
                <div className="text-[14px] text-white leading-[1.4]">{overview}</div>
              </div>

              {/* Bottom */}
              {/* <div className="px-2.5 py-2 pb-3  hover:text-[#111] bg-[#111]">
                <div className=" text-[13px] font-medium text-[#ddd] leading-tight">{movie.title}</div>
                <div className="text-[10px] text-[#555] mt-0.5">{year}</div>
              </div> */}
            </Link>
          );
        })}
      </div>




</>  )
}
