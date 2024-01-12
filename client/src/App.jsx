import './App.css'
import { useNavigate, Route, Routes, redirect } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import { useEffect, useState } from 'react'
import axios from './api/axios'
import Profile from './pages/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { userAuthentication } from './api/apiServies'



function App() {
  const userAuth = useSelector(state => state.userAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userAuthentication())
    return () => {
    }
  }, [])

  return (
    <>

      <Routes>
        {userAuth ?
          <>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
          </>

          :
          <>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </>
        }

      </Routes>

    </>
  )
}

export default App
