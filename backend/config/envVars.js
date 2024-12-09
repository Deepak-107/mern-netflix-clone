import dotenv from "dotenv"

dotenv.config()

export const ENV_VARS = {
     MONGO_URI : process.env.MONGO_URI,
     PORT : process.env.PORT || 1111,
     JWT_SECRET : process.env.JWT_SECRET,
     ENV_VARS : process.env.NODE_ENV,
     TMDB_API_KEY: process.env.TMDB_API_KEY
}