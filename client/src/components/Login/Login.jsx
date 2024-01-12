import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/redux'
import { userLogin } from '../../api/apiServies'

function Login({}) {

    const [loginForm,setLoginForm]=useState({email:'',password:''})
    const dispatch=useDispatch()

    const navigate=useNavigate()

    const handleChange=(event)=>{

      setLoginForm((prev)=>{
        return{
          ...prev,
          [event.target.name]:event.target.value
        }
      })

    }

    const handleLoginSubmit=()=>{

        dispatch(userLogin(loginForm))

    }

  return (

    <div className="max-w-md mx-auto p-6 bg-slate-300 rounded-md shadow-md m mt-16">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form >
        <label className="block mb-4">
          Email:
          <input
            type="email"
            name="email"
            className="mt-1 p-2 border rounded w-full"
            value={loginForm.email}
            onChange={handleChange}
            autoComplete='username'
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            name="password"
            className="mt-1 p-2 border rounded w-full"
            value={loginForm.password}
            onChange={handleChange}
            autoComplete='current-password'
          />
        </label>
        <div className='flex' >
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
          onClick={handleLoginSubmit}
        >
          Login
        </button>
        <Link to='/signup' className='ml-3 mt-1' >Create an Account</Link>
        </div>
      </form>
    </div>

  )
}

export default Login