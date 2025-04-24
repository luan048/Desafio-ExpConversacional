import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './MainPage.css'
import '../Icons/icons.js'

function MainPage() {
    return (
        <>
        <div className="general-div">
            <div className="nav-bar">
                <img src="./imgs/Logo-Furia-navbar.svg" className="logoFuria-navbar" />
                <FontAwesomeIcon className="icon-twitter" icon="fa-brands fa-twitter" />
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
                <FontAwesomeIcon icon="fa-brands fa-youtube" />
                <FontAwesomeIcon icon="fa-brands fa-twitch" />
                <FontAwesomeIcon icon="fa-brands fa-tiktok" />
                <FontAwesomeIcon icon="fa-brands fa-discord" />
            </div>

        </div>

        <div className="footer"></div>
        </>
    )
}

export default MainPage