import React from 'react'
import { AiFillInstagram, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
export const Footer = () => {
    return (
        <>
            <footer>
                <div>
                    <h2> Food Depot</h2>
                    <p>Our aim is to provide quality food and to serve our people.</p>
                    <br />
                    <em>We give rewards for geniune feedback.</em>
                    <strong>All rights reservered @fooddepot</strong>
                </div>
                <aside>
                    <h4>Follow us</h4>
                    <a href="https://www.instagram.com/_vibhor_bhatnagar_/">
                        <AiFillInstagram />
                    </a>
                    <a href="https://www.linkedin.com/in/vibhor-bhatnagar-/">
                        <AiFillLinkedin />
                    </a>
                    <a href="https://github.com/vibhor376">
                        <AiFillGithub />
                    </a>

                </aside>
            </footer>
        </>
    )
}

export default Footer;