import React from 'react'
import './Navbar.scss'

export const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar_logo">Socket Chat</div>
        <div className="profile">
            <div className="profile_img"><img src={require('../imgs/profileImg.jpg')} alt="profile" width='40' height='40'/></div>
            <div className="profile_name">Aboba</div>
        </div>
        <button className="logout">Logout</button>
    </div>
  )
}
