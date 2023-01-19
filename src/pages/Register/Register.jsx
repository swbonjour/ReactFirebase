import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../utils/firebaseAuth'
import { uploadData } from '../../utils/firebaseStorage'
import './Register.scss'

export const Register = () => {
    const [err, setErr] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const img = e.target[3].files[0];

        const user = await createUser(email, password);
        if(typeof user == 'boolean') {
            setErr(true);
            return;
        } else {
            setErr(false);
        }
        await uploadData(username, img, user);
        navigate('/ReactFirebase/home');
    }
    
  return (
    <section className="register_container">
        <div className="register_content">
            <div className="register_content-data">
                <p className="logo">Socket Chat</p>
                <p className="title">Registration</p>
                <form action="" className="register_form" onSubmit={handleSubmit}>
                    <input type="text" placeholder='nickname'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <label>
                        upload img
                        <input type="file" />
                    </label>
                    <button>sign up</button>
                    {err && <p className='title'>Something went wrong</p>}
                </form>
            </div>
            <div className="register_content-img">
            </div>
        </div>
    </section>
  )
}
