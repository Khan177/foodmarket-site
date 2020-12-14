import React from 'react';
import './footer.css';

const Footer = () => {
    return(
        <footer>
            <div className="header-logo">
                <img style={{ width: '150px' }} src="/assets/logo.png" alt=""/>
            </div>
            {window.innerWidth > 1200 && <div className="header-info">
                <a href="" className="header-phone">+7(777)-777-77-77</a>
                <p>Справочная 24/7</p>
            </div>}
        </footer>
    )
}

export default Footer;