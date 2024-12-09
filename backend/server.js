import express from "express"
import cookieParser from "cookie-parser";
import path from "path";

import { protectRoute } from "./middleware/protectRoute.js";
import { ConnectDB } from "./config/MongoDb.js";
import { ENV_VARS} from "./config/envVars.js";
import authRouters from './Routes/auth.route.js';
import movieRoutes from './Routes/movie.route.js';
import searchRoutes from './Routes/search.route.js';
import tvRoutes from "./Routes/tv.route.js"

const app = express();
const PORT = ENV_VARS.PORT;
const __dirName = path.resolve()
//middleWares
app.use(express.json());
app.use(cookieParser())

app.use("/api/V1/auth", authRouters);
app.use("/api/V1/movie", protectRoute, movieRoutes);
app.use("/api/V1/tv", protectRoute, tvRoutes);
app.use("/api/V1/search", protectRoute, searchRoutes);

if(ENV_VARS.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirName , "/frontend/dist")));

    app.get("*" , (req, res) => {
       res.sendFile(path.resolve(__dirName , "frontend" ,"dist" , "index.html"))
    } )
}

app.listen(PORT, ()=>{
  console.log('server is listening to:)'+ PORT);
  ConnectDB()
})
