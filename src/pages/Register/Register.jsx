import React from 'react'
import './Register.scss'

export const Register = () => {
  return (
    <section className="register_container">
        <div className="register_content">
            <div className="register_content-data">
                <p className="logo">Socket Chat</p>
                <p className="title">Registration</p>
                <form action="" className="register_form">
                    <input type="text" placeholder='nickname'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <label>
                        upload img
                        <input type="file" />
                    </label>
                    <button>sign up</button>
                </form>
            </div>
            <div className="register_content-img">
            </div>
        </div>
    </section>
  )
}
