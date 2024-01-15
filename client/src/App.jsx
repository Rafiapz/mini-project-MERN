import './App.css'
import { useNavigate, Route, Routes, redirect } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import { useEffect, useState } from 'react'
import axios from './api/axios'
import Profile from './pages/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { adminAuthentication, userAuthentication } from './api/apiServies'
import AdminHome from './pages/AdminHome'
import { Toaster } from 'react-hot-toast';
import EditUser from './pages/EditUser'
import CreateUser from './pages/CreateUser'



function App() {
  const userAuth = useSelector(state => state.userAuth.auth)
  const adminAuth=useSelector(state=>state.adminAuth.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userAuthentication())
    dispatch(adminAuthentication())
    return () => {
    }
  }, [])



  return (
    <>
      <Toaster position='top-center' containerClassName='text-red-500' />
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
        {
          adminAuth?
            <>
            <Route path='/admin' element={<AdminHome/>} />
            <Route path='/admin/edit-userByAdmin/:id' element={<EditUser/>} />
            <Route path='/admin/create-user' element={<CreateUser/>} />
            </>
          :
          <>
          <Route path='/admin' element={<LoginPage/>} />
          </>
        }

      </Routes>

    </>
  )
}

export default App
