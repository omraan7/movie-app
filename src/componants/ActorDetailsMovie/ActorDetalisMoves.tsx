import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Mousewheel } from "swiper/modules"
import "swiper/css"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router"

interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export function CarouselSpacing({ id }: { id: string }) {
  const [cast, setCast] = useState<CastMember[]>([])

  useEffect(() => {
    async function getCredits() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4783682a696f279ea3f036ea2a5a0021&language=en-US`
      )
      setCast(data.cast.slice(0, 10)) 
    }
    getCredits()
  }, [id])

  return (
    <Swiper
      modules={[FreeMode, Mousewheel]}
      spaceBetween={10}
      slidesPerView="auto"
      freeMode={true}
      grabCursor={true}
      mousewheel={{ forceToAxis: true, sensitivity: 1 }}
    >
      {cast.map((actor) => (
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
  )
}