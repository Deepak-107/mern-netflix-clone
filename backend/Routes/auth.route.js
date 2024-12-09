import  express  from "express";
import  {authCheck, login, logOut, signup,}  from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const Router = express.Router();

//Routers
Router.post("/SignUp" , signup);
Router.post("/SignIn" , login)
Router.post("/LogOut" , logOut)

Router.get("/authcheck" ,protectRoute, authCheck)

export default Router;