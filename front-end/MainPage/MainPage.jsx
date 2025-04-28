import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MainPage.css'
import '../Icons/icons.js'
import { text } from "@fortawesome/fontawesome-svg-core";

function MainPage() {
    // Variaveis de desbloqueio e inicio do chat
    const [chatStarted, setChatStarted] = useState(false)
    const [chatBloqueado, setChatBloqueado] = useState(true)
    //
    const [messages, setMessages] = useState([])
    const [step, setStep] = useState(0)

    const [userInput, setUserInput] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')

    // Função de desbloqueio e inicio chat
    const startChat = () => {
        setChatBloqueado(false)
        setChatStarted(true)

        // Inicia as duas primeiras mensagens
        setMessages([
            { sender: 'bot', text: 'Fala, Furioso! Preparado pra viver a FURIA hoje?' },
            { sender: 'bot', text: 'Bora começar. Agora me diz, qual seu nome completo?' }
        ])
        setStep(1)
    }
    //

    const escolhaUser = () => {
        const newMessages = [...messages, {sender: 'user', text: userInput}]

        const email = userInput.trim()
        setUserEmail(email)

        setMessages([
            ...newMessages,
            { sender: 'bot', text: `Valeu, ${userName}! Acabei de guardar aqui.` },
            {sender: 'bot', text: 'Agora vamos continuar nossa conversa. Me diz ai, o que você gostaria de saber sobre a furia?'},
            {text: 'Calendário de jogos'},
            {text: 'Resultados Recentes'},
            {text: 'Loja Furiosa'},
            {text: 'Noticias'},
            {text: 'Curiosidades'}
        ])
        setStep(3)
    }

    const fetchCalendarData = async() => {
        try{
            const response = await fetch('http://localhost:3000/api/get-calendar')
            const data = await response.json()

            if(data && data.length) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: 'Aqui está o calendário de jogos:' },
                    ...data.map(row => ({text: `${row[2]} dia ${row[0]} às ${row[1]}` })),
                ])
            }
            else {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: 'Desculpe, não encontrei o calendário de jogos.' },
                ])
            }
        }
        catch(error) {
            console.log('Erro ao tentar buscar no calendário: ', error);
            
        }
    }

    const handleSendMessage = () => {
        if (userInput.trim() === '') return

        const newMessages = [...messages, { sender: 'user', text: userInput }]

        if (step === 1) {
            const name = userInput.trim()
            const firstName = name.split(' ')[0]
            setUserName(firstName)

            setMessages([
                ...newMessages,
                { sender: 'bot', text: `Legal, ${firstName}! Agora me diz, qual seu email?` }
            ])
            setStep(2)
        }
        else if (step === 2) {
            escolhaUser()
        }
        else if(step === 3) {
            const newMessages = [...messages, {sender: 'user', text: userInput}]

            setMessages([
                ...newMessages,
            ])    
            if(userInput.trim().toLowerCase().includes("calendário")) {
                fetchCalendarData()
            }
            setStep(4)
        }

        setUserInput('')
    }

    // Atualizar Scroll a cada nova mensagem
    // const messagesEndRef = useRef(null)

    // const scrollToBottom = () => {
    //     if (messagesEndRef.current) {
    //         messagesEndRef.current.scrollIntoView({behavior: "smooth"})
    //     }
    // }

    // useEffect(() => {
    //     scrollToBottom()
    // }, [messages])

    //

    return (
        <>
            <div className="general-div">
                <div className="content-div">

                    {/* ELEMENTOS DO LADO ESQUERDO */}
                    <div className="elements-left">
                        <div className="div-title" style={{ 'display': 'flex', 'marginBottom': '15px', 'marginLeft': '20px' }}>
                            <img src="../imgs/Furia_Esports_logo.png" style={{ 'width': '70px' }} />
                            <h1 style={{ 'marginTop': '15px', 'marginLeft': '10px', 'fontSize': '38px' }}>Furia</h1>
                        </div>

                        <h1 style={{ 'fontSize': '38px', 'marginBottom': '10px' }}>Bem-vindo ao FURIA CS Chat Bot!</h1>
                        <p style={{ 'fontFamily': 'Oswald', 'marginBottom': '20px' }}>Converse com nosso bot para conhecer ainda mais nossa tropa do CS, receber as últimas notícias, partidas, <br />
                            calendário e te deixar mais pertinho da nossa comunidade e loja oficial. <br />
                            <span style={{ 'fontWeight': 'bold' }}>Vem com a gente e sinta a energia furiosa de verdade! #GOFURIA</span></p>
                        <button onClick={startChat} className={'button-start'}>Start Chat</button>
                    </div>

                    {/* ELEMENTOS DO LADO DIREITO */}
                    <div className="elements-right">
                        <div className="title-chat">
                            <FontAwesomeIcon icon="fa-brands fa-rocketchat" style={{ 'fontSize': '40px' }} /><p style={{ 'fontSize': '20px', 'marginTop': '8px', 'marginLeft': '15px' }}>Bot da Tropa</p>
                        </div>

                        <div className="content-chat" style={{ opacity: chatBloqueado ? 0.4 : 1 }}>
                            {chatBloqueado && <div className="overlay-bloqueado"></div>}

                            {/* CHAT MESSAGES */}
                            <div className="chat-messages">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`message-${msg.sender || 'sem-sender'}`}>
                                        {msg.sender === 'bot' && <img src="../imgs/Furia_Esports_logo.png" className="logo-bot-chat" />}
                                        <div className={`div-mensagemBot${msg.sender ? '' : '-semSender'}`}>
                                            <span className="mensagens">{msg.text}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/*  */}
                        </div>

                        <div className="div-input-chat">
                            <input type="text" placeholder="Mensagem" className="input-mensg" 
                                value={userInput} 
                                onChange={e => setUserInput(e.target.value)} 
                                onKeyDown={e => e.key === 'Enter' && handleSendMessage()} 
                                disabled={chatBloqueado}
                            />
                            
                            <div className={chatBloqueado ? 'div-icon-sendDisabled' : 'div-icon-send'}>
                                <img src="../imgs/icon-send.png" className="icon-send" onClick={!chatBloqueado ? handleSendMessage : undefined}/>
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
                    <img src="./imgs/Logo-Furia-navbar-white.svg" className="logoFuria-footer" style={{ 'width': '75px' }} />
                </div>

                {/* Falta adicionar link que leva para a página das redes */}
                <div className="footer-direita">
                    <FontAwesomeIcon className="icon-x" icon="fa-brands fa-x-twitter" onClick={() => window.open('https://x.com/FURIA')} />
                    <FontAwesomeIcon className="icon-instagram" icon="fa-brands fa-instagram" onClick={() => window.open('https://www.instagram.com/furiagg/')} />
                    <FontAwesomeIcon className="icon-yt" icon="fa-brands fa-youtube" onClick={() => window.open('https://www.youtube.com/@FURIAggCS')} />
                    <FontAwesomeIcon className="icon-twitch" icon="fa-brands fa-twitch" onClick={() => window.open('https://www.twitch.tv/furiatv')} />
                    <FontAwesomeIcon className="icon-ttk" icon="fa-brands fa-tiktok" onClick={() => window.open('https://www.tiktok.com/@furiagg?lang=en')} />
                    <FontAwesomeIcon className="icon-discord" icon="fa-brands fa-discord" onClick={() => window.open('https://discord.com/invite/furia')} />
                </div>
            </div>
        </>
    )
}

export default MainPage