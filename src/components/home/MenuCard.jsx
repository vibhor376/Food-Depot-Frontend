import React from 'react'
import { motion } from "framer-motion";
const MenuCard = ({ item, burgerSrc, price, title, handler, delay }) => {
    return (
        <motion.div className='menuCard'
            initial={{
                x: "-100%",
                opacity: 0,
            }}
            whileInView={{
                x: 0,
                opacity: 1,
            }}
            transition={{
                delay,
            }}
        >

            <div>Item {item}</div>
            <main>
                <img src={burgerSrc} alt={item} width={300} height={200} />
                <h5>₹{price}</h5>
                <p>{title}</p>
                <button onClick={() => handler(item)}>Add to Cart</button>
            </main>
        </motion.div>
    )
}

export default MenuCard;
