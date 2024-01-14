import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/redux'

function Header() {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userToken')
        dispatch(logout())
        navigate('/')
    }
    return (

        <div className='headerMain' >
            <nav className='navBar' >
                <div className='dummy' ></div>
                <div className='header' >
                <h3 className='heading' ><Link to={'/'} >Home</Link></h3>
                <h3 className='heading' ><Link to={'/profile'} >Profile</Link></h3>
                </div>
                <div className='logoutDiv'>
                    <button onClick={handleLogout} className='logout' >Logout</button>
                </div>
            </nav>
        
        </div>

    )
}

export default Header