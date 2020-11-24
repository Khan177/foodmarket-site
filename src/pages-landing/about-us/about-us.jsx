import React from 'react';
import "./about-us.css";
import About from "./about-us.png";

const AboutUs = () => {
    return(
        <div className="about-us">
            <div className="about-us-first">
                <h1 style={{ fontWeight: 'bold' }}>О нас</h1>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className="about-us-second">
                <img src={ About } alt=""/>
            </div>
        </div>
    )
}

export default AboutUs;