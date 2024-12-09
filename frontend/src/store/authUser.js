import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore = create((set)=>({
   user:null,
   isSigningUp: false,
   isCheckingAuth : true,
   isLoggingOut : false, 
   isLoggingIn:false,
   signup: async (credentials)=>{
   set({isSigningUp:true})
    try {
      const response = await axios.post("/api/V1/auth/SignUp",credentials)
      set({user:response.data.user, isSigningUp:false})
      toast.success("Account created successful")
    } catch (error) {
      toast.error(error.response.data.message || "an error occured")
      set({isSigningUp:false, user:null})
    }
   },
   login: async (credentials)=>{
    set({isLoggingIn:true})
    try {
      const response = await axios.post("/api/V1/auth/SignIn",credentials);
      set({user: response.data.user , isLoggingIn: false})
      toast.success("Logged In Successfully")
    } catch ( error) {
      set({user:null , isLoggingIn : false})
     toast.error(error.response.data.message|| "LogIn failed"  )
    }
   },
   logout: async ()=>{
    set ({isLoggingOut:true})
    try {
       await axios.post("/api/V1/auth/LogOut");
       set({user:null, isLoggingOut : false})
     } catch (error) {
       set({isLoggingOut:false})
       toast.error(error.response.data.message || "an error occurred");
       toast.success("Logged Out Successfully")
     }
   },

   authcheck: async ()=>{
    set({isCheckingAuth: true})
     try {
       const response = await axios.get("/api/V1/auth/authcheck");
     set ({user: response.data.user, isCheckingAuth:false})
       
     } catch (error) {
       set({isCheckingAuth:false ,user:null})
     }
   }
  
}))