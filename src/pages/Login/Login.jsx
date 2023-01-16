import React from 'react'
import "./Login.scss"
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <section className="login_container">
        <div className="login_content">
            <div className="login_content-data">
                <p className="logo">Socket Chat</p>
                <p className="title">Login</p>
                <form action="" className="login_form">
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <button>sign in</button>
                </form>
                <p className="register">Don't have an account? <Link to='/register'>Register</Link></p>
            </div>
                <div className="login_content-img">
            </div>
        </div>
    </section>
  )
}
