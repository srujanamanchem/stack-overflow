import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import logo from '../../assets/logo.png'
import search from '../../assets/search.svg'
import './Navbar.css'
import Avatar from '../../Components/Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'
// import Button from '../../Components/Button/Button'
const Navbar = () => {
    const dispatch = useDispatch()
    const User = useSelector(state=>state.currentUserReducer)
    const navigate = useNavigate()
    // console.log(User)

    useEffect(()=>{
        const token = User?.token
        if(token){
            const decodeToken = decode(token)
            if(decodeToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    }, [dispatch])

    const handleLogout = ()=>{
        dispatch({type:"LOGOUT"})
        navigate('/')
        dispatch(setCurrentUser(null)) 
    }

  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to="/" className='nav-item nav-logo'>
                <img src={logo} alt="logo" width="120"/>
            </Link>
            <Link to="/" className='nav-item nav-btn'>About</Link>
            <Link to="/" className='nav-item nav-btn'>Products</Link>
            <Link to="/" className='nav-item nav-btn'>For Teams</Link>
            <form>
                <input type="text" placeholder="Search.."/>
                <img src={search} alt="search" width="18" className='search-icon'/>
            </form>
            {User === null ?
            <Link to="/Auth" className='nav-item nav-links'>Log in</Link> :
            <>
            <Avatar backgroundColor="#009dff" px="12px" py="5px" borderRadius = "50%" color="white">
                <Link to={`/Users/${User?.result?._id}`} style={{color: "white", textDecoration:"none"}}> 
                    {User.result.name.charAt(0).toUpperCase()} 
                </Link>
            </Avatar> 
            <button className='nav-item nav-links' onClick = {handleLogout}> Log out</button>
            </>
        }
        </div>
    </nav>
  )
}

export default Navbar
