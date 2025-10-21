// Chat.jsx
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './ifbbot.css';

//import BotAvatar from './avatar1.svg';
//import UserAvatar from './avatar2.svg';

//==== Gera SessionId =======
function getTurno() {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return "manha";
  if (hora >= 12 && hora < 18) return "tarde";
  return "noite";
}

// Função principal para gerar o sessionId
function generateSessionId() {
  // Captura data e hora no formato ISO compacto
  //const data = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14); 

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  const data = `${ano}${mes}${dia}`; // Ex: 20251021

  const turno = getTurno();

  // Identifica o navegador (browser)
  const browser = (() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("chrome") && !ua.includes("edge")) return "chrome";
    if (ua.includes("firefox")) return "firefox";
    if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
    if (ua.includes("edge")) return "edge";
    if (ua.includes("opera") || ua.includes("opr")) return "opera";
    return "outro";
  })();

  // Cria um hash simples a partir das informações
  const base = `${data}-${turno}-${browser}`;
  const hash = btoa(base).replace(/[^a-zA-Z0-9]/g, "").slice(0, 12);

  // SessionId final (ex: 20251021T0830_MANHA_CHROME_abcd1234)
  // return `${data}_${turno}_${browser}_${hash}`;
  return `${data}_${turno}_${browser}`;
}


// Exemplo de uso:
const sessionId = generateSessionId();
console.log("Session ID gerado:", sessionId);
//===== fim SessionId =======


// === Configuração do chatbot ===
const config = {
  botName: 'MentorIA - IFB',

  initialMessages: [
    {
      type: 'bot',
      id: '1',
      message:
        '👋 Olá! Eu sou o MentorIA, seu mentor virtual em Computação. Posso explicar conceitos, revisar código e mostrar como a tecnologia evolui. O que você gostaria de aprender hoje? 💻 ',
    },
  ],

  customStyles: {
    botMessageBox: { backgroundColor: '#98A92C' },
    chatButton: { backgroundColor: '#509E2F' },
  },

  // === Avatares customizados ===
  customComponents: {
    botAvatar: (props) => (
      <img
        src={`${import.meta.env.BASE_URL}MentorIA_avatar.svg`}
        alt="MentorIA"
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '2px solid #98A92C',
          padding: 3,
        }}
      />
    ),
    userAvatar: (props) => (
      <img
        src={`${import.meta.env.BASE_URL}ifb_estudante_avatar.svg`}
        alt="Estudante IFB"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: '2px solid #509E2F',
          padding: 3,
        }}
      />
    ),
  },
};

// === Funções do chatbot ===
const MessageParser = ({ children, actions }) => {
  const parse = (message) => actions.handleUserMessage(message);
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { parse })
  );
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleUserMessage = async (message) => {
    try {
      /*
             Para ativar o cors termporatiamente clicando acessando o 
             link a seguir antes de rodar a aplicação no stackblitz
             : https://cors-anywhere.herokuapp.com/corsdemo
        */
      const response = await fetch(
        'https://cors-anywhere.herokuapp.com/http://200.130.152.78:5678/webhook/aula5',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
          },
          body: JSON.stringify({ 
            sessionId : sessionId,
            user_message: message }),
        }
      );

      const data = await response.json();
      console.log(data[0]);
      const botReply =
        data[0].output || 'Não consegui entender sua solicitação.';
      //const botReply = data;
      const botMessage = createChatBotMessage(botReply);

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    } catch (error) {
      console.error('Erro ao conectar com o webhook:', error);
      const botMessage = createChatBotMessage(
        'Erro ao conectar com o agente de IA 😢'
      );
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { actions: { handleUserMessage } })
  );
};



export default function Chat() {
  return (
   
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      minHeight: '100vh', // ocupa toda a altura da tela
      margin: 0,
      paddingTop: '1px',
      boxSizing: 'border-box',
      //backgroundColor: '#f8f9f6', // opcional, fundo neutro
    }}
   >
      <img
        src={`${import.meta.env.BASE_URL}MentorIA_banner_300kb.svg`}
        alt="Banner MentorIA"
        style={{
          display: 'block',
          margin: '0 auto 0 auto',
          width: '65%',
          maxWidth: '900px',
          height: 'auto',
        }}
      />
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText="Ensino de Computação - IFB"
        placeholderText="Digite sua dúvida..."
      />
      <a
        href="https://cors-anywhere.herokuapp.com/corsdemo"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: '10px',
          color: '#509E2F',
          fontWeight: 'bold',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        🔗 Clique aqui caso não responda adequadamente
      </a>
    </div>
  );
}
