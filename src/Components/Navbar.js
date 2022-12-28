import React from 'react'
import {FaCoins} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate= useNavigate();
  return (
    <div>
        <div className="navbar" onClick={()=>navigate('/')}>
            <FaCoins className='icon'/>
            <h1>Crypto <span className='purple'>Hunter</span></h1>
        </div>
    </div>
  )
}

export default Navbar