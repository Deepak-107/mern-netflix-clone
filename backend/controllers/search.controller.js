import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/TMDB.services.js";

export async function searchPerson (req, res) {
  const {query} = req.params;
  try {
      const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

    if (response.results.length === 0){
      return res.status(404).send(null)
    }
    
    await User.findByIdAndUpdate(req.user._id,{
    $push:{
      searchHistory: {
        id:response.results[0].id,
        Image:response.results[0].profile_path,
        title: response.results[0].name,
        searchType: "person",
        createdAt : new Date()
      }
      }
    })
    res.status(200).json({
    success: true, 
    content : response.results
    })
    } catch (error) {
      console.log("error in search person controller" , error.message);
      res.status(500).json({
      success:false, message:"internal server error"
      })
    }  
}
export async function searchMovie (req, res) {
 const {query}= req.params;
  try {
    const response = await fetchFromTMDB(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`) 
   
    if(response.results.length === 0){
        res.status(404).send(null)
    }

    await User.findByIdAndUpdate(req.user._id,{
    $push: {
    searchHistory: {
    id: response.results[0].id,
    image: response.results[0].poster_path,
    title: response.results[0].title,
    searchType: "movie",
    createdAt: new Date()
   }
    }})   
    
    res.status(200).json({
    success:true , content: response.results  
    })
  
    
    } catch (error) {
      console.log("error in search movie controller", error.message);
      res.status(500).json({
      success:false, message: "internal server error"
      })
   }  
}
export async function searchTv (req, res) {
  const {query}= req.query
  try {
     const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`)
    
     if(response.results.length === 0){
       res.status(404).send(null)
     }
    await User.findByIdAndUpdate(res.user._id,
    {$push: {
      searchHistory: {
      id: response.results[0].id,
      image: response.results[0].poster_path,
      title: response.results[0].name,
      searchType: "tv",
      createdAt: new Date()
      }
    }})
  
    res.status(200).json({
      success: true, content: response.results
     })
     
   } catch (error) {
    console.log("error in the search TV controller", error.message);
    res.status(500).json({
      success:false, message: "internal server error"
     })
   }  
}

export async function searchHistory (req, res  ){
  try {
     res.status(200).json({
      success:true, content: req.user.searchHistory
     })
  } catch (error) {
    res.status(500).json({
       success: false, message: "internal server error"
    })
  }
}

export async function removeItemFormHistory (req , res){
  let {id} = req.params;

  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { 
        searchHistory : {id: id}
      }
    })
    res.status(200).json({
       success: true, message: 'item removed from the search history successfully'
    })
   } catch (error) {
    console.log("error in the delete history controller", error.message);
    res.status(500).json({
      success:false, message: "internal server error"
    })
   }
}