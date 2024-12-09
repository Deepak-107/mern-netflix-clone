import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const ConnectDB = async ()=>{
   try{
  const conn =  await mongoose.connect(ENV_VARS.MONGO_URI,)
  console.log(conn.connection.host);
   }
   catch(e){
    console.error(e.message);
    process.exit(1);  
   }
}
