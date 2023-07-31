import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from './styled'

import * as actions from '../../store/modules/auth/action'
import { FaHome, FaUserAlt, FaSign, FaCircle, FaPowerOff } from 'react-icons/fa'
import history from '../../service/history'
import { useSelector, useDispatch } from 'react-redux'

export default function Header() {
    const dispatch = useDispatch()

    const isLogedIn = useSelector(state => state.auth.isLogedIn)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(actions.loginFeilure())
        history.push('/')
    }

    return (
        <Nav>
            <Link to='/'><FaHome color='#fff' size={24} /></Link>
            <Link to='/registro'><FaUserAlt color='#fff' size={24} /></Link>
            {
                isLogedIn ? (
                    <Link onClick={handleLogout} to='/logout'><FaPowerOff color='#fff' size={24} /></Link>
                ) : (
                    <Link to='/login'><FaSign color='#fff' size={24} /></Link>
                )
            }
            {
                isLogedIn ? (
                    <FaCircle color='green' size={24} />
                ) : (
                    <FaCircle color='red' size={24} />
                )
            }
        </Nav>
    )
}