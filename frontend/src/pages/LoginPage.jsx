import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  const [email , setEmail ] = useState('')
  const [password , setPassword ] = useState('');
  const {login} = useAuthStore()

  const handleLogin =(e)=>{
   e.preventDefault();
   login({email, password})
  }
  return (
    <>
      <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl flex items-center justify-between mx-auto p-4">
        <Link>
           <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex items-center justify-center mt-20 mx-3">
       <div className="w-full bg-black/60 max-w-md space-y-6 p-4 rounded-lg shadow-md">
        <h1 className="text-center text-white text-2xl font-bold mb-3">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
        <div>
        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">Email</label>
        <input type="email" className="w-full px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline focus:ring p-1.5" placeholder="abc@example.com" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div> 
        <div>
        <label htmlFor="password" className="text-sm font-medium text-gray-300 block">password</label>
        <input type="password" className="w-full px-3 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline focus:ring p-1.5" placeholder="enter your password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div> 
          <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">Log in</button>
        </form>
          <div className="text-center text-gray-400"> 
          Don't have an account? &nbsp;
          <Link className="text-red-600 hover:underline transition duration-1000 ease-in" to={"/signup"}>Sign up</Link>
        </div>
       </div>
      </div>
    </div>
   </>
  )
}
export default LoginPage