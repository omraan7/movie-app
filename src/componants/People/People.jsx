import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function People() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    async function getPeople() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=4783682a696f279ea3f036ea2a5a0021&language=en-US&page=1`
        );

        console.log(data);
        
        const onlyActors = data.results.filter(p => p.known_for_department === "Acting");
        setActors(onlyActors);
      } catch (err) {
        console.error(err);
      }
    }
    getPeople();
  }, []);

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl mb-6">Popular Actors</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {actors.map(actor => (
          <Link to={`/actor/${actor.id}`} key={actor.id} className="flex flex-col items-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="rounded-lg mb-2"
            />
            <span className="font-semibold text-lg text-white">{actor.name}</span>
          </Link  >
        ))}
      </div>
    </div>
  );
}