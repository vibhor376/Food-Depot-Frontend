import React from 'react'
import { IoFastFoodOutline } from "react-icons/io5"
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { AiOutlineLogout } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
export const Header = ({ isAuthenticated = true }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("auth-token");
        dispatch(logout());
        toast.success("Logged out Successfully");
        navigate("/");
    }
    return (
        <nav>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}><IoFastFoodOutline /></motion.div>
            <div>
                <Link to="/"> Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">
                    <FiShoppingCart />
                </Link>
                <Link to={localStorage.getItem("auth-token") ? "/me" : "/login"}>
                    {localStorage.getItem("auth-token") ? <FaUser /> : <FiLogIn />}
                </Link>
                {localStorage.getItem("auth-token") ? <AiOutlineLogout onClick={logoutHandler} /> : null}
            </div>
        </nav>
    )
}

export default Header;