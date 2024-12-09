import express from "express"
import {getTrendingTV,
        getTVTrailer,
        getTVDetails ,
        getSimilarTV,
        getTVsByCategory } 
        from '../controllers/tv.controller.js';
const router = express.Router();

router.get("/trending" , getTrendingTV)
router.get("/:id/trailers" , getTVTrailer)
router.get("/:id/details" , getTVDetails)
router.get("/:id/similar" , getSimilarTV)
router.get("/:category" , getTVsByCategory)

export default router;