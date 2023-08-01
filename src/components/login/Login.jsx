import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { server } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const onSubmitClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${server}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const res = await response.json();
        if (res.message === "Login successful") {
            localStorage.setItem("auth-token", res.token);
            dispatch(loadUser());
            toast.success("Logged In Successfully");
            navigate("/");
        } else {
            toast.error("Invalid credentials");
            setCredentials({ email: "", password: "", });
        }
    }

    return (
        <>
            <section className='login'>
                <motion.form onSubmit={onSubmitClick}
                    initial={{
                        x: "-100vw",
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.2
                    }}
                    action="">
                    <h2>Login</h2>
                    <input type="email" placeholder='Email' name='email' onChange={onChangeHandler} value={credentials.email} required />
                    <input type="password" placeholder='Password' name='password' onChange={onChangeHandler} value={credentials.password} required minLength={5} />
                    <button type="submit"> Send</button>
                    <Link to="/register">Not a user Register here</Link>
                </motion.form>
            </section>
        </>
    )
}

export default Login