import React from 'react'
import { motion } from "framer-motion";
import me from "../../assets/dp.png";
const Founder = () => {
    return (
        <section className="founder">
            <motion.div initial={{
                x: "-100%",
                opacity: 0,
            }}
                whileInView={{
                    x: 0,
                    opacity: 1,
                }}
            >
                <img src={me} alt="Founder" height={200} width={200} />
                <h3>Vibhor Bhatnagar</h3>
                <p>
                    I'm a competitive programmer with a strong passion for solving complex problems and optimizing algorithms. My expertise lies in web development, specifically working with the MERN stack.
                </p>
            </motion.div>
        </section>
    )
}
export default Founder;