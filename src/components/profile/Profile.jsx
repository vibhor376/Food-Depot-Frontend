import React, { useEffect } from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import me from "../../assets/dp.png";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loadUser, logout } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector(state => state.auth)
    const options = {
        initial: {
            y: "-100%",
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        }
    }
    const logoutHandler = () => {
        // console.log("clicked");
        localStorage.removeItem("auth-token");
        dispatch(logout());
        toast.success("Logged out Successfully")
        navigate("/");
    }
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])

    // if (user) console.log(user);
    return (
        <section className='profile'>
            {
                !loading && <main>
                    {
                        user.role === "admin" && <motion.img src={me} alt="User" {...options} />
                    }
                    <motion.h5 {...options} transition={{ delay: 0.2 }}>{user.name} </motion.h5>
                    {
                        user.role === 'admin' && <motion.div {...options}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to="/admin/dashboard"
                                style={{
                                    backgroundColor: "rgb(40, 40, 40)",
                                    borderRadius: 0,
                                }}
                            >
                                <MdDashboard />
                                Dashboard
                            </Link>
                        </motion.div>
                    }
                    <motion.div
                        initial={{
                            x: "-100vw",
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 1
                        }}
                        transition={{ delay: 0.6 }} >
                        <Link to="/myorders">Orders</Link>
                    </motion.div>
                    <motion.button
                        onClick={logoutHandler}
                        initial={{
                            x: "-100vw",
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            opacity: 1
                        }}
                        transition={{ delay: 0.8 }}>
                        Logout
                    </motion.button>
                </main>
            }
        </section>
    )
}

export default Profile;