import axios from "axios";
import { useEffect, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [rating, setRating] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  useEffect(() => {
    async function getMovieDetails() {
      // Movie Details
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4783682a696f279ea3f036ea2a5a0021&language=en-US`
      );
      setMovie(data);

      // Release Dates for Rating
      const { data: releaseData } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=4783682a696f279ea3f036ea2a5a0021`
      );
      const usRelease = releaseData.results.find((r) => r.iso_3166_1 === "US");
      if (usRelease) {
        const certified = usRelease.release_dates.find((d) => d.certification);
        if (certified) setRating(certified.certification);
        if (certified) setReleaseDate(certified.release_date.split("T")[0]);
      }

      // Trailer
      const { data: videoData } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=4783682a696f279ea3f036ea2a5a0021&language=en-US`
      );
      const trailerVideo = videoData.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(trailerVideo);
    }

    getMovieDetails();
  }, [id]);

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval height={50} width={50} color="#5e597c" secondaryColor="#ccc" />
      </div>
    );

  // Genres
  const genres = movie.genres.map((g) => g.name).join(" and ");

  // Duration
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const duration = `${hours}h ${minutes}m`;

  return (
    <div className="relative w-full min-h-screen text-white">
      {/* Background Image with Blur */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path
            })`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center md:items-start md:justify-start p-8 md:p-20">
        {/* Poster */}
        <div className="w-64 md:w-1/4 shrink-0 rounded-lg shadow-xl overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="mt-6 md:mt-0 md:ml-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>

          {/* Info Row */}
          <div className="flex flex-wrap gap-4 mb-6">
            {rating && (
              <span className=" px-2 py-1 rounded text-sm md:text-md">
                {rating}
              </span>
            )}
            {releaseDate && (
              <span className=" px-2 py-1 rounded text-sm md:text-md">
                {releaseDate}
              </span>
            )}
            {genres && (
              <span className=" px-2 py-1 rounded text-sm md:text-md">
                {genres}
              </span>
            )}
            {duration && (
              <span className=" px-2 py-1 rounded text-sm md:text-md">
                {duration}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            {trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="px-6 py-2 transition cursor-pointer flex justify-center items-center gap-2  border border-white   rounded font-semibold hover:bg-red-700"
              >
                <CiPlay1 size={20} />
                Play Trailer
              </button>
            )}

            <button className="px-6 py-2  border border-white rounded font-semibold hover:bg-white hover:text-black transition cursor-pointer">
              Add to List
            </button>
          </div>
        <p className="text-md  mt-8 md:text-lg leading-relaxed mb-4">{movie.overview}</p>
        </div>

      </div>

      {/* Trailer Modal */}
      {showTrailer && trailer && (
        <div className="fixed top-0 left-0 w-full h-full bg-blue-950/40 flex justify-center items-center z-50">
          <div className="relative w-[60%] h-[70%]">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-0 right-0 text-white text-3xl font-bold z-50"
            >
              &times;
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="Trailer"
              frame="0"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}