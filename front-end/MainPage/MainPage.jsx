import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MainPage.css'
import '../Icons/icons.js'

function MainPage() {
    return (
        <> 
            <div className="general-div">
                <div className="content-div">

                    <div className="elements-left">
                        <div className="div-title" style={{'display': 'flex'}}>
                            <img src="../imgs/Furia_Esports_logo.png" className="logo-furia" /> 
                            <h1>Furia</h1>
                        </div>

                        <h1>Bem-vindo ao FURIA CS Chat Bot!</h1>
                        <p style={{'fontFamily': 'Oswald'}}>Converse com nosso bot para receber as últimas notícias, partidas e muito mais</p>
                        <button>Start Chat</button>
                    </div>

                    <div className="elements-right"></div>
                </div>
            </div>

            <div className="footer">
                <div className="footer-esquer">
                    <p>© 2025 FURIA Esports. Todos os direitos reservados.</p>
                    <p>Desenvolvido por: Luan M. Pedrosa</p>
                </div>

                <div className="footer-centro">
                    <img src="./imgs/Logo-Furia-navbar-white.svg" className="logoFuria-footer" style={{'width': '75px'}}/>
                </div>

                {/* Falta adicionar link que leva para a página das redes */}
                <div className="footer-direita">
                    <FontAwesomeIcon  className="icon-x" icon="fa-brands fa-x-twitter" />
                    <FontAwesomeIcon className="icon-instagram" icon="fa-brands fa-instagram" />
                    <FontAwesomeIcon className="icon-yt" icon="fa-brands fa-youtube" />
                    <FontAwesomeIcon className="icon-twitch" icon="fa-brands fa-twitch" />
                    <FontAwesomeIcon className="icon-ttk" icon="fa-brands fa-tiktok" />
                    <FontAwesomeIcon className="icon-discord" icon="fa-brands fa-discord" />
                </div>
            </div>
        </>
    )
}

export default MainPage