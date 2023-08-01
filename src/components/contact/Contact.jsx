import React, { useState } from 'react'
import { motion } from "framer-motion";
import burger from "../../assets/burger4.png";
import toast from "react-hot-toast";
const Contact = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const onChangeHandler = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
        // console.log(contact);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const response = await fetch(` https://food-depot-backend.onrender.com/api/v1/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                message: contact.message
            })
        });
        const res = await response.json();
        // console.log(res);
        if (res.success) {
            toast.success(res.success);
            setContact({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        } else {
            toast.error(res.message);
        }
    }

    return (
        <section className='contact'>
            <motion.form
                onSubmit={onSubmitHandler}
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
            >
                <h2>Contact Us</h2>
                <input type="text" placeholder='Name' onChange={onChangeHandler} name='name' value={contact.name} />
                <input type="email" placeholder='Email' onChange={onChangeHandler} name='email' value={contact.email} />
                <input type="text" placeholder='Subject' onChange={onChangeHandler} name="subject" value={contact.subject} />
                <textarea placeholder='Message...' cols="30" rows="10" onChange={onChangeHandler} name="message" value={contact.message}></textarea>
                <button type="submit"> Send</button>
            </motion.form>
            <motion.div
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
                className='formBorder'>
                <motion.div
                    initial={{
                        y: "-100vh",
                        x: "50%",
                        opacity: 0,
                    }}
                    animate={{
                        y: "-50%",
                        x: "50%",
                        opacity: 1
                    }}
                    transition={{
                        delay: 1
                    }}
                >
                    <img src={burger} alt="Burger" />
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Contact;
