import { Link, useNavigate } from 'react-router-dom'
import './HeaderAdmin.css'

import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/redux'

function HeaderAdmin() {


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        dispatch({
            type:'logoutAdmin'
        })
        navigate('/admin')
    }
    return (

        <div className='headerMain' >
            <nav className='navBar' >
                <div className='dummy' ></div>
                <div className='header' >
                <h3 className='heading' ><Link to={'/admin'} >Home</Link></h3>
                <h3 className='heading' ><Link to={'/admin/create-user'} >Create user</Link></h3>
                </div>
                <div className='logoutDiv'>
                    <button onClick={handleLogout} className='logout' >Logout</button>
                </div>
            </nav>
        
        </div>

    )
}

export default HeaderAdmin