import React from 'react'
import { Link } from "react-router-dom"
import { RiFindReplaceFill } from "react-icons/ri"
import me from "../../assets/dp.png"
const About = () => {
    return (
        <section className='about'>
            <main>
                <h1>About Us</h1>
                <article>
                    <h4>Food Depot</h4>
                    <p>
                        We are Food Enthusiasts. And we provide the best quality fast food on the Earth.
                    </p>
                    <p>Explore the menu here.</p>
                    <Link to="/">
                        <RiFindReplaceFill />
                    </Link>
                </article>
                <div>
                    <h2>Founder</h2>
                    <article>
                        <div>
                            <img src={me} alt="Founder" />
                            <h3>Vibhor Bhatnagar</h3>
                        </div>
                        <p>Hi I am Vibhor Bhatnagar, the founder of Food Depot. The God of Taste...</p>
                    </article>
                </div>
            </main>
        </section>
    )
}

export default About