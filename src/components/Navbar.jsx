import { React, useContext } from 'react'
import { AuthContext } from '../utils/context'
import { signOut } from 'firebase/auth'
import { auth } from '../utils/firebaseAuth'
import './Navbar.scss'

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="navbar">
        <div className="navbar_logo">Socket Chat</div>
        <div className="profile">
            <div className="profile_img"><img src={currentUser.photoURL} alt="profile" width='40' height='40'/></div>
            <div className="profile_name">{currentUser.displayName}</div>
        </div>
        <button className="logout" onClick={() => signOut(auth)}>Logout</button>
    </div>
  )
}
