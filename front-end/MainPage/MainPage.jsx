import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MainPage.css'
import '../Icons/icons.js'

function MainPage() {
    return (
        <> 
            <div className="general-div">
                <div className="content-div">

                    {/* ELEMENTOS DO LADO ESQUERDO */}
                    <div className="elements-left">
                        <div className="div-title" style={{'display': 'flex', 'marginBottom': '15px', 'marginLeft': '20px'}}>
                            <img src="../imgs/Furia_Esports_logo.png" style={{'width': '70px'}}/> 
                            <h1 style={{'marginTop': '20px', 'marginLeft': '10px', 'fontSize': '38px'}}>Furia</h1>
                        </div>

                        <h1 style={{'fontSize': '38px', 'marginBottom': '10px'}}>Bem-vindo ao FURIA CS Chat Bot!</h1>
                        <p style={{'fontFamily': 'Oswald', 'marginBottom': '20px'}}>Converse com nosso bot para conhecer ainda mais nossa tropa do CS, receber as últimas notícias, partidas, <br /> 
                        calendário e te deixar mais pertinho da nossa comunidade e loja oficial. <br />
                        <span style={{'fontWeight': 'bold'}}>Vem com a gente e sinta a energia furiosa de verdade! #GOFURIA</span></p>
                        <button className="button-start">Start Chat</button>
                    </div>

                    {/* ELEMENTOS DO LADO DIREITO */}
                    <div className="elements-right">
                        <div className="title-chat">
                            <FontAwesomeIcon icon="fa-brands fa-rocketchat" style={{'fontSize': '40px'}}/><p style={{'fontSize': '20px', 'marginTop': '8px', 'marginLeft': '15px'}}>Bot da Tropa</p>
                        </div>

                        <div className="content-chat"></div>

                        <div className="div-input-chat">
                            <input type="text" placeholder="Mensagem" className="input-mensg"/>
                            <div className="div-icon-send"> 
                                <img src="../imgs/icon-send.png" className="icon-send" />
                            </div>
                        </div>

                    </div>
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