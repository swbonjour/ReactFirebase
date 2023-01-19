import { signInWithEmailAndPassword } from 'firebase/auth';
import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../utils/firebaseAuth';
import "./Login.scss"

export const Login = () => {
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
           await signInWithEmailAndPassword(auth, email, password); 
           setErr(false);
           navigate('/ReactFirebase/home');
        } catch (error) {
           setErr(true); 
        }
    }

  return (
    <section className="login_container">
        <div className="login_content">
            <div className="login_content-data">
                <p className="logo">Socket Chat</p>
                <p className="title">Login</p>
                <form action="" className="login_form" onSubmit={handleSubmit}>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <button>sign in</button>
                </form>
                <p className="register">Don't have an account? <Link to='/ReactFirebase/register'>Register</Link></p>
                {err && <p className="title">Something went wrong</p>}
            </div>
                <div className="login_content-img">
            </div>
        </div>
    </section>
  )
}
