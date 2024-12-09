import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { useContentStore } from "../store/content.js";
import axios from "axios"
import Navbar from "../components/Navbar.jsx"
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player"

import { formatReleaseDate } from "../../../backend/utils/fromatReleaseDate.js";
import {ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL} from "../utils/constants.js"
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton.jsx";
const WatchPage = () => {
  const {id} = useParams();
  const [trailers , setTrailers] = useState([]);
  const [currentTrailerIndex ,setCurrentTrailerIndex ] = useState(0);
  const [loading , setLoading] = useState(true)
  const [ content , setContent] = useState({});
  const [ similarContent , setSimilarContent] = useState([]);
  const {contentType} = useContentStore();
  const sliderRef= useRef()

useEffect(()=>{
     const getTrailers = async () => {
          try {
        const response = await axios.get(`/api/V1/${contentType}/${id}/trailers`);
        setTrailers(response.data.trailers); 

      } catch (error) {
         if(error.message.includes("404")){
          setTrailers([]);
         }        
      }
     } 
     getTrailers();
  }, [contentType, id])
useEffect(()=>{
     const getSimilarContent = async () => {
          try {
        const response = await axios.get(`/api/V1/${contentType}/${id}/similar`);
        setSimilarContent(response.data.similar); 
      } catch (error) {
         if(error.message.includes("404")){
          setSimilarContent([]);
         }        
      }
     } 
     getSimilarContent();
  }, [contentType, id])
useEffect(()=>{
     const getContentDetail = async () => {
          try {
        const response = await axios.get(`/api/V1/${contentType}/${id}/details`);
        setContent(response.data.content); 
      } catch (error) {
         if(error.message.includes("404")){
          setContent(null);
         }        
      }finally {
         setLoading (false)
      }
     } 
     getContentDetail();
  }, [contentType, id])
  
  const handleNext = () => {
    if(currentTrailerIndex < trailers.length - 1){
      setCurrentTrailerIndex(currentTrailerIndex  + 1 )
     }
  } 
  const handlePrev = () => {
    if(currentTrailerIndex > 0){
     setCurrentTrailerIndex(currentTrailerIndex - 1 )
    }
  } 

  const scrollLeft = ()=> {
    if(sliderRef.current) {
      sliderRef.current.scrollBy({left: -sliderRef.current.offsetWidth ,behavior : "smooth"})
    }
 }
 const scrollRight = ()=> {
   sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth ,behavior : "smooth"})
 }
 if(loading) return(
     <div className="min-h-screen bg-black p-10"> 
       <WatchPageSkeleton/>
      </div>
 )

 if(!content){
   return(
    <div className='bg-black text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
   )
 }
    return <div
   className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
      <Navbar/>
      {trailers.length > 0 && (
    <div className="flex justify-between items-center mb-4">
        <button className={`
        bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${currentTrailerIndex === 0 ? "cursor-not-allowed opacity-50" : ' ' }`}
        disabled={currentTrailerIndex === 0}
        >
          <ChevronRight size={24} onClick={handlePrev}/>
        </button>
        <button className={`
        bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${currentTrailerIndex === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ' ' }`}
        disabled={currentTrailerIndex === trailers.length - 1}
        >
          <ChevronRight size={24} onClick={handleNext}/>
        </button>
          </div>
      ) }
    <div className='aspect-video mb-8 p-2 sm:px-10 md:px-32'>
      {trailers.length > 0 && (
      <ReactPlayer
        controls={true}
        width={"100%"}
        height={"70vh"}
        className='mx-auto overflow-hidden rounded-lg'
        url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex].key}`}
        />
        )}
      {trailers?.length === 0 && (
          <h2 className='text-xl text-center mt-5'>
            No trailers available for{" "}
            <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😥
          </h2>
        )}
      </div>
      
      {/* {movie details} */}
      <div
        className='flex flex-col md:flex-row items-center justify-between gap-20 
      max-w-6xl mx-auto'
      >
        <div className='mb-4 md:mb-0'>
          <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>

          <p className='mt-2 text-lg'>
            {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
            {content?.adult ? (
              <span className='text-red-600'>18+</span>
            ) : (
              <span className='text-green-600'>PG-13</span>
            )}{" "}
          </p>
          <p className='mt-4 text-lg'>{content?.overview}</p>
        </div>
        <img
          src={ORIGINAL_IMG_BASE_URL+content?.poster_path}
          alt='Poster image'
          className='max-h-[600px] rounded-md'
        />
      </div>
      {similarContent.length > 0 && (
        <div className="mt-12 max-w-5xl mx-auto relative">
          <h3 className="text-3xl font-bold mb-4">
            Similar Movies/Tv Shows
          </h3>
          <div className="flex overflow-x-scroll scrollbar-hide gap-4 group pb-4" ref={sliderRef}>
               {similarContent.map((content)=> {
                if(content.poster_path === null) return null;
              return (
                  <Link key={content.id} to={`/watch/${content.id}`}
                  className="w-52 flex-none"
                  >
                  <img src={SMALL_IMG_BASE_URL + content?.poster_path || content?.backdrop_path
                  } alt="poster_path" className="w-full h-auto rounded-md" />  
                  <h4
                  className="mt-2 text-lg font-semibold"
                  >{content.title || content.name}</h4>
                  </Link>
               )})}
               <ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full'
								onClick={scrollLeft}
							/>
          </div>
        </div>
      )}
      </div>
   </div>

}

export default WatchPage