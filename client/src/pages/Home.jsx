import React from 'react'
import Header from '../components/Header/Header'
import './Home.css'
import { useSelector } from 'react-redux'

function Home() {

  const { username, email, image } = useSelector(state => state.userData)

  const path = `http://localhost:3100/uploads/${image}`

  return (
    <>
      <Header />
      <div className='homeMaindiv' >
        <div className='flex justify-center' >
          <h1 className='welcomeH1' >Welcome {username}</h1>
        </div>
        
        <div className='insideMain bg-slate-100' >
          <div className='imageDiv rounded-3xl' style={{ backgroundImage: `url(${path})`, backgroundSize: 'cover' }}  >
          </div>
          <div className='contentDiv' >
            <div className='ml-8 mt-8 flex justify-center' >
              <h2 className='font-bold ' >username :  </h2>
              <h2 className='font-bold ' >{username}</h2>
            </div>
            <div className='ml-8 mt-1 flex justify-center' >
              <h2 className='font-bold ' >email    :  </h2>
              <h2 className='font-bold ' >{email}</h2>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home