import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import Founder from './Founder';
import Menu from './Menu';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/user';
export const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch])

  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0, opacity: 1
    },
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
  return (
    <>
      <section className="home">
        <div>
          <motion.h1
            {...options}
          >Food Depot</motion.h1>
          <motion.p
            {...options} transition={{ delay: 0.2 }}
          >Give yourself a treat!!</motion.p>
        </div>
        <motion.a
          initial={{
            // x: "-490%",
            y: "-350%",
            opacity: 0,
          }}
          whileInView={{
            // x: "-330%",
            y: "-220%",
            opacity: 1,
          }}
          transition={{ delay: 0.5 }}

          href="#menu"> Explore Menu</motion.a>
      </section >
      <Founder />
      <Menu />
    </>
  )
}

export default Home;
