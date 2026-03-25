import { Link } from "react-router";



export default function DisplayHomeData({ movie }) {

    return (
        <>
            <Link to={`/movie/${movie.id}`}>



                <div className=" text-white p-2  max-w-xs min-h-137.5   overflow-hidden   ">
                    <img className='w-100'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                    />
                    <h3 className="mt-2 text-white  hover:text-gray-300 font-bold">{movie.title}</h3>
                    <p className="text-sm text-white   hover:text-gray-300  line-clamp-3 ">
                        {movie.overview.split(" ").splice(0, 8).join(" ")}
                    </p>
                </div>





            </Link>


        </>
    )
}
