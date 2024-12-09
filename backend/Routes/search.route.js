import express from 'express';
import {searchPerson , searchMovie ,searchTv, searchHistory, removeItemFormHistory }from "../controllers/search.controller.js"

const router = express.Router();

router.get("/person/:query", searchPerson)
router.get("/movie/:query", searchMovie)
router.get("/tv/:query", searchTv)

router.get("/history", searchHistory);
router.delete("/history/:id", removeItemFormHistory)

export default router;

