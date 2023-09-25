import React from 'react'
import {BiDonateBlood, BiUserCircle} from 'react-icons/bi';
import {useSelector} from 'react-redux';
import { useNavigate , useLocation , Link } from 'react-router-dom';

const Header = () => {
const {user} = useSelector((state) => state.auth)
const navigate =useNavigate()
const location = useLocation()
//logout handler 

const handleLogout = () => {
    localStorage.clear()
    alert('logout successful')
    navigate('/login')
    
}

  return (
    <>
        <nav className='navbar '>
            <div className='container-fluid'>
                <div className='navbar-brand'><BiDonateBlood color='red'/>Blood Bank</div>
                <ul className='navbar-nav'>
<li className='nav-item'>
    <p className='nav-link'>
       <BiUserCircle/> Welcome {" "}{(user && user.name) ||( user?.hospitalName) || (user?.organisationName)} &nbsp;
       <span className='badge bg-secondary'>{user?.role}</span>
    </p>
</li>


    {
       ( location.pathname === '/' || location.pathname === '/donar' || location.pathname === '/hospital') ? (
      <li className='nav-item '>
    <Link to='/analytics' className='nav-link'>
      Analytics
    </Link>
</li>      
        ) :(
             <li className='nav-item'>
    <Link to='/' className='nav-link'>
      Home
    </Link>
</li>
        )
    }


<li className='nav-item '>
    <button className='btn btn-danger' onClick={handleLogout}>
        Logout
    </button>
</li>
                </ul>

            </div>
        </nav>
    </>
  )
}

export default Header