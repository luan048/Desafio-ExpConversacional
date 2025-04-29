import React from "react";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './MainPage.css'
import '../Icons/icons.js'

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

    const chatMessagesRef = useRef(null)

    const respostaEscolhasUser = userInput.trim().toLowerCase()

    const showTyping = () => {
        return new Promise(resolve => {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: '...' }
            ])
    
            setTimeout(() => {
                setMessages(prev => prev.slice(0, -1))
                resolve()
            }, 1000)
        })
    }

    // Função de desbloqueio e inicio chat
    const startChat = async() => {
        setChatBloqueado(false)
        setChatStarted(true)

        await showTyping()
        // Inicia as duas primeiras mensagens
        setMessages([
            { sender: 'bot', text: 'Fala, Furioso! Preparado pra viver a FURIA hoje?' },
            { sender: 'bot', text: 'Bora começar. Agora me diz, qual seu nome completo?' }
        ])
        setStep(1)
    }
    //

    

    const escolhaUser = async () => {
        const newMessages = [...messages, { sender: 'user', text: userInput }]
        const email = userInput.trim()
        setUserEmail(email)
        setMessages(newMessages)
    
        await showTyping()
        setMessages([
            ...newMessages,
            { sender: 'bot', text: `Valeu, ${userName}!` }
        ])
    
        await showTyping()
        setMessages([
            ...newMessages,
            { sender: 'bot', text: 'Agora vamos continuar nossa conversa. Me diz ai, o que você gostaria de saber sobre a furia?' },
            { text: 'Calendário de jogos' },
            { text: 'Resultados Recentes' },
            { text: 'Loja Furiosa' },
            { text: 'História da Furia' },
            { text: 'História time de CS da Furia' }
        ])
        setStep(3)
    }    

    const fetchCalendarData = async() => {
        try{
            const response = await fetch('http://localhost:3000/api/get-calendar')
            const data = await response.json()

            await showTyping()
            if(data && data.length) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { sender: 'bot', text: 'Aqui está o calendário de jogos:' },
                    ...data.map(row => ({text: `${row[2]} dia ${row[0]} às ${row[1]}` })),
                ])
                
                await showTyping()
                setMessages(prevMessages => [
                    ...prevMessages,
                    {sender: 'bot', text: 'Saiba mais sobre os jogos (Digite sua opção)'},
                    {text: 'Somente jogos de hoje'},
                    {text: 'Voltar'}
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

    const filtrarJogosHoje = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/get-calendar')
            const data = await response.json()
    
            const hoje = new Date()
            const diaHoje = hoje.getDate()
            const mesHoje = hoje.getMonth() + 1
            const anoHoje = hoje.getFullYear()
    
            const jogosHoje = data.filter(row => {
                const [dia, mes, ano] = row[0].split('/').map(Number)
                return dia === diaHoje && mes === mesHoje && (ano ? ano === anoHoje : true)
            })
    
            await showTyping()
            // Não estão retornando a mensagem digitado pelo usuário
            if (jogosHoje.length > 0) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {sender: 'bot', text: 'Aqui estão os jogos de hoje:'},
                    ...jogosHoje.map(row => ({ text: `${row[2]} às ${row[1]}`})),
                    {text: '(Digite voltar para iniciar um novo chat)'}
                ])
            } 
            else {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {sender: 'bot', text: 'Não encontramos jogos para hoje.' },
                    {text: '(Digite voltar para iniciar um novo chat)'}
                ])
            }
        } 
        catch (error) {
            console.error('Erro ao buscar jogos de hoje:', error)
        }
    }
    

    const fetchLastResults = async() => {
        try{
            const response = await fetch('http://localhost:3000/api/get-results')
            const data = await response.json()

            await showTyping()
            if(data && data.length) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    {sender: 'bot', text: 'Aqui está o resultado dos último jogos:'},
                    ...data.map(row => ({text: `${row[1]} do dia ${row[0]}`})),
                    {sender: 'bot', text: 'Fique por dentro dos próximos jogos (Digite sua opção)'},
                    {text: 'Próximos jogos'},
                    {text: 'Voltar'}
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
            console.log('Erro ao tentar buscar os último resulados: ', error);
        }
    }
    
    const encaminhamentoLoja = async(input) => {
        const newMessages = [...messages, {sender: 'user', text: input}]
        await showTyping()
        setMessages([
            ...newMessages
        ])
        const resposta = input.trim().toLowerCase()
        
        if (resposta.includes("furia")) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ok, vou te encaminhar para os produtos furia. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/produtos?filtro=Categoria__Furia'
            }, 2000)
        } 
        else if ((resposta.includes("camisetas") || resposta.includes("camiseta")) && !resposta.includes("furia")) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ok, vou te encaminhar para os produtos camisetas. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/produtos?filtro=Categoria__Camisetas'
            }, 2000)
        } 
        else if ((resposta.includes("moletons") || resposta.includes("moletom")) && !resposta.includes("furia")) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ok, vou te encaminhar para os produtos moletons. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/produtos?filtro=Categoria__Moletons'
            }, 2000)
        } 
        else if ((resposta.includes("calças") || resposta.includes("calça")) && !resposta.includes("furia")) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ok, vou te encaminhar para os produtos calças. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/produtos?filtro=Categoria__Calças'
            }, 2000)
        } 
        else if ((resposta.includes("shorts") || resposta.includes("short")) && !resposta.includes("furia")) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ok, vou te encaminhar para os produtos shorts. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/produtos?filtro=Categoria__Shorts'
            }, 2000)
        } 
        else if ((resposta.includes("bonés") || resposta.includes("boné")) && !resposta.includes("furia")) {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ok, vou te encaminhar para os produtos bonés. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/produtos?filtro=Categoria__Bonés'
            }, 2000)
        } 
        else {
            setMessages(prev => [
                ...prev,
                { sender: 'bot', text: 'Ainda não tenho esse produto cadastrado, mas vou te mandar para o nosso site. Obrigado e um até logo!' }
            ])
        
            setTimeout(() => {
                window.location.href = 'https://www.furia.gg/'
            }, 3000)
        }
        
    }
    
    const filtroProdutoLoja = async() => {
        const newMessages = [...messages, {sender: 'user', text: userInput}]
        await showTyping()
        setMessages([
            ...newMessages,
            {sender: 'bot', text: 'Certo, vou te encaminhar para nossa loja, mas antes disso, o que você procura? (Digite sua opção)'},
            {text: 'Furia'},
            {text: 'Camisetas'},
            {text: 'Moletons'},
            {text: 'Calças'},
            {text: 'Shorts'},
            {text: 'Bonés'},
        ])
    }

    const contarHistoriaFuria = async() => {
        await showTyping()
        setMessages([
            ...messages,
            {sender: 'bot', text: 'A trajetória do time de CS da FURIA teve início em 2017, quando a organização foi criada em Uberlândia-MG pelos fundadores André Akkari, Jaime Pádua e Cris Guedes. Sob a liderança de Nicholas Nogueira, o Guerri, o primeiro elenco de Counter-Strike começou seus treinamentos e rapidamente passou a competir em torneios oficiais, demonstrando seu talento desde o princípio. Já em 2018, a FURIA recebeu o prêmio de Organização do Ano no Gamers Club Awards, e, em 2020, levantou o troféu da ESL Pro League Season 12, consolidando sua posição no cenário internacional. Desde então, a organização vem se destacando, conquistando novos títulos e expandindo sua presença em outras modalidades de esports! 🏆🔥'},
            {text: '(Digite voltar para iniciar um novo chat)'}
        ])
        setStep(5)
    }

    const contarHistoriaTimeCS = async() => {
        await showTyping()
        setMessages([
            ...messages,
            {sender: 'bot', text: 'A trajetória da FURIA teve início em 2017, quando André Akkari, Jaime Pádua e Cris Guedes fundaram a organização em Uberlândia-MG. Seu primeiro time de Counter-Strike foi montado rapidamente e passou a competir, mudando-se para os Estados Unidos com o objetivo de conquistar espaço internacional. Desde então, a FURIA vem se destacando no cenário dos esports, acumulando conquistas e expandindo suas atividades para modalidades como League of Legends e VALORANT. Em 2020, a organização inaugurou um novo escritório em São Paulo e venceu a ESL Pro League. A FURIA segue crescendo, lançando linhas de roupas e participando de projetos sociais. A pantera, símbolo da organização, reflete toda a garra e determinação da equipe em se tornar uma referência mundial nos esports! 🐾🔥'},
            {text: '(Digite voltar para iniciar um novo chat)'}
        ])
        setStep(6)
    }

    const handleSendMessage = () => {
        if (respostaEscolhasUser === '') return

        if(respostaEscolhasUser === 'voltar') {
            escolhaUser()
            setStep(2)
            setUserInput('')
            return
        }

        if(respostaEscolhasUser === 'somente jogos de hoje') {
            filtrarJogosHoje()
            setUserInput('')
            return
        }

        if(respostaEscolhasUser.includes("próximo" || respostaEscolhasUser.includes("próximos") && respostaEscolhasUser.includes("jogo") || respostaEscolhasUser.includes("jogos"))) {
            fetchCalendarData()
            setUserInput('')
            return
        }

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

            if(respostaEscolhasUser.includes("calendário")) {
                fetchCalendarData()
            }
            else if(respostaEscolhasUser.includes("resultado") || respostaEscolhasUser.includes("resultados")) {
                fetchLastResults()
            }
            else if(respostaEscolhasUser.includes("loja") || respostaEscolhasUser.includes("loja furiosa")) {
                filtroProdutoLoja()
                setStep(4)
                setUserInput('')
                return
            }
            else if(respostaEscolhasUser.includes("história")) {
                contarHistoriaFuria()
            }
            else if(respostaEscolhasUser.includes("história" && respostaEscolhasUser.includes("cs"))) {
                contarHistoriaTimeCS()
            }
            else {
                const newMessages = [...messages, {sender: 'user', text: userInput}]

                setMessages([
                    ...newMessages,
                    {sender: 'bot', text: 'Operação inválida. Digite voltar se quiser continuar'}
                ])
            }
            setStep(4)
        }
        else if(step === 4) {
            encaminhamentoLoja(userInput)
            setStep(5)
        }

        setUserInput('')
    }

    useEffect(() => {
        if(chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
        }
    }, [messages])

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
                            <div className="chat-messages" ref={chatMessagesRef}>
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