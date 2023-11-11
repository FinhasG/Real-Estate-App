import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData]=useState({});
  const [error, setError]=useState(null);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();

  const handleChange=(e)=>{
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]:e.target.value
    })
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
   try {
    setLoading(true)
    const res=await fetch('/api/auth/login',{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    //console.log(data);
    setError(data.message)
    if(data.success===false){
      
      setLoading(false);
     
      return;
    }
    setLoading(false)
    navigate('/')
   } catch (error) {
    setLoading(false)
    setError(error.message)
   
   }
  }
  //console.log(error)

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg outline-none"
          onChange={handleChange}
        />
        <button disabled={loading}
          className="bg-slate-500 text-center p-2 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading?'loading...':'Login'}
        </button>
      </form>
      <div className="flex gap-3 mt-3 ml-3">
        <p>I don't have an account ?</p>
        <Link to={'/signup'}>
        <span className="text-blue-600">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4 ml-3">{error}</p>}
    </div>
  );
};

export default Login;
