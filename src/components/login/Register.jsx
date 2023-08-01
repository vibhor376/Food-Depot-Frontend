import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from '../../redux/store';
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, message } = useSelector(state => state.auth);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });
    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // console.log(credentials);
    }
    const onSubmitClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${server}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const res = await response.json();
        console.log(res);
        if (res.message) {
            localStorage.setItem("auth-token", res.token);
            toast.success("Logged In Successfully");
            navigate("/");
        } else {
            toast.error("Some error occurred");
            setCredentials({ name: "", email: "", password: "", });
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
            navigate("/");
        }
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });

        }
    }, [error, message, dispatch, navigate])

    return (
        <section className='register'>
            <motion.form
                initial={{
                    x: "+100vw",
                    opacity: 0
                }}
                animate={{
                    x: 0,
                    opacity: 1
                }}
                transition={{
                    delay: 0.2
                }}
                action="" onSubmit={onSubmitClick}>
                <h2>REGISTER</h2>
                <input type="text" placeholder='Name' name="name" onChange={onChangeHandler} value={credentials.name} required minLength={3} />
                <input type="email" placeholder='Email' name="email" onChange={onChangeHandler} value={credentials.email} required />
                <input type="password" placeholder='Password' name="password" onChange={onChangeHandler} value={credentials.password} required minLength={5} />
                <button type="submit"> Send</button>
            </motion.form>
        </section>
    )
}

export default Register