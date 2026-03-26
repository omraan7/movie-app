import { Link } from "react-router";


export default function NotFound() {
  return (
<>
<div className="relative">
  <Link to="/" className="absolute top-6 left-6 z-999 text-sm text-[#aaa] px-3.5 py-1.5 rounded-full border border-[#333] bg-black/60 hover:text-white hover:border-[#555] transition-all">
          ← Back
        </Link>   
         <div className="flex justify-center items-center h-screen font-bold text-3xl text-white">NotFound</div>


</div>
</>  )
}
