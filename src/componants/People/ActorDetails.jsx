import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ActorDetails() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchActor() {
      try {
        const { data: actorData } = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=4783682a696f279ea3f036ea2a5a0021&language=en-US`
        );
        setActor(actorData);




      } catch (err) {
        console.error(err);
      }
    }
    fetchActor();
  }, [id]);
  async function actorMovies() {
    const { data: creditsData } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=4783682a696f279ea3f036ea2a5a0021&language=en-US`
    );
    setMovies(creditsData.cast);
    setImages([])



  }
  function actorMoviesHide() {
    setMovies([])
  }

  async function actorPhoto() {

    const { data: imagesData } = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=4783682a696f279ea3f036ea2a5a0021`
    );
    setImages(imagesData.profiles);
    setMovies([])


  }
  function actorPhotoHide() {
    setImages([])
  }






  if (!actor) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="p-8 text-white">
      <Link to="/people" className="  p-4 bg-black w-fit rounded-2xl mb-4 block">Back to People</Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
          alt={actor.name}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
          {actor.birthday && <p>Birthday: {actor.birthday}</p>}
          {actor.deathday && <p>Death: {actor.deathday}</p>}
          {actor.place_of_birth && <p>Place of Birth: {actor.place_of_birth}</p>}
          <p className="mt-4">{actor.biography}</p>
          <div className=" flex  gap-3">
            {movies.length > 0 ? <button className="p-4 bg-black w-fit rounded-2xl mt-4   flex justify-end items-end  " onClick={actorMoviesHide} > hide movies</button>
              : <button className="p-4 bg-black w-fit rounded-2xl mt-4   flex justify-end items-end  " onClick={actorMovies} > movies</button>
            }
            {images.length > 0 ? <button className="p-4 bg-black w-fit rounded-2xl mt-4   flex justify-end items-end  " onClick={actorPhotoHide} > hide photo</button>
              : <button className="p-4 bg-black w-fit rounded-2xl mt-4   flex justify-end items-end  " onClick={actorPhoto} > Photo</button>
            }
          </div>
        </div>
      </div>

      {movies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl mt-8 mb-4">Known For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-lg mb-2"
                />
                <span className="font-semibold">{movie.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl mb-4">Photo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((image, i) => (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w300${image.file_path}`}
                alt={image.file_path}
                className="rounded-lg cursor-pointer hover:scale-105 transition"
                onClick={() => setSelectedImage(`https://image.tmdb.org/t/p/original${image.file_path}`)} // ← اضغط لفتح
              />
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Actor Full"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}