import React, { useEffect } from 'react'
import Signup from '../components/Signup/Signup'
import Header from '../components/Header/Header'
import { userAuthentication } from '../api/apiServies'
import { useDispatch } from 'react-redux'

function Profile() {

  const dispatch=useDispatch()

  useEffect(() => {
    
    dispatch(userAuthentication())
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
    <Header/>
    <Signup/>
    </>
  )
}

export default Profile