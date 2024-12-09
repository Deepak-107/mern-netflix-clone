import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content.js"
import axios from "axios";
import {Link} from "react-router-dom"
import { SMALL_IMG_BASE_URL } from "../utils/constants.js";
import {ChevronLeft , ChevronRight } from "lucide-react"

const MovieSlider = ({category}) => {
  const {contentType} = useContentStore();
  const [content , setContent ] = useState([]);
  const [showArrow , setShowArrow] = useState(false);
  const sliderRef = useRef(null)
  const formattedContent = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName = category.replaceAll("_" , " ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1);

useEffect (()=>{
  const getContent = async ()=> {
    const response = await axios.get(`/api/V1/${contentType}/${category}`);
    setContent(response.data.content)
      
 }
getContent()
}, [contentType, category]);

  const scrollLeft = ()=> {
   if(sliderRef.current) {
    sliderRef.current.scrollBy({left: -sliderRef.current.offsetWidth ,behavior : "smooth"})
     }
  }
  const scrollRight = ()=> {
    sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth ,behavior : "smooth"})
  }
  return (
    <div className="text-white bg-black relative px-5 md:px-20" onMouseEnter={()=> setShowArrow(true)} 
    onMouseLeave={()=>setShowArrow(false)} >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContent}
      </h2>
    <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
        {content.map((item)=> (
        <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
          <div className="rounded-lg overflow-hidden">
          <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt="Movie image" className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
          </div>
          <p className="text-center mt-2 text-white">{item.name || item.title}</p>
        </Link>
        ))}
    </div>
     {showArrow && (
      <>
    <button
      className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
      size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
      '
      onClick={scrollLeft}
    >
      <ChevronLeft size={24} />
    </button>
      <button
        className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
        size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
        '
        onClick={scrollRight}
      >
        <ChevronRight size={24} />
      </button>
      </>
      )}
    </div>
  )
}

export default MovieSlider