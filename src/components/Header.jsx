import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
const Header = () => {
  return (
    <header className='container'>
            <h1>COINHUNTERS</h1>
            <ul>
                <Link to='/leader'>
                    <li>leaderBoard</li>
                </Link>
            </ul>
        
    </header>
  )
}

export default Header