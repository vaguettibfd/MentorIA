// Chat.jsx
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './ifbbot.css';

//import BotAvatar from './avatar1.svg';
//import UserAvatar from './avatar2.svg';

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
          body: JSON.stringify({ user_message: message }),
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
    </div>
  );
}
