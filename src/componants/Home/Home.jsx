import axios from 'axios'
import  {  useEffect, useState } from 'react'
import { Oval } from "react-loader-spinner";
 

import DisplayHomeData from '../DisplayHomeData/DisplayHomeData'
 

export default function Home() {
  // https://api.themoviedb.org/3/discover/movie?api_key=4783682a696f279ea3f036ea2a5a0021&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

  // 4783682a696f279ea3f036ea2a5a0021
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getMovies() {
      const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
        params: {
          api_key: "4783682a696f279ea3f036ea2a5a0021",
          language: "en-US",
          page: 1
        }

      })
      setMovies(data.results)
      setLoading(false)
    }
    getMovies()
  }, [])
  return (
    <>
    {loading && (
  <div className="flex justify-center items-center h-screen">
    <Oval
      height={50}
      width={50}
      color="#5e597c"
      secondaryColor="#ccc"
    />
  </div>
)}

    <div className="flex flex-wrap justify-center    bg-black text-xl pb-5   ">
      {movies.map((movie) => (
        <DisplayHomeData key={movie.id} movie={movie} />
      ))}
    </div>
   
    </>

  )
}
