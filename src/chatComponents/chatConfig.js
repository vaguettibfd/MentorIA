// chatConfig.js

const chatConfig = {
    bot: {
      name: 'MentorIA - IFB',
  
      initialMessage:
        '👋 Olá! Eu sou o MentorIA, seu mentor virtual em Computação. Posso explicar conceitos, revisar código e mostrar como a tecnologia evolui. O que você gostaria de aprender hoje? 💻',
    },
  
    interface: {
      headerText: 'Assistente Virtual - Computação',
      placeholderText: 'Digite sua dúvida...',
      loadingText: '🔎 Consultando a base de conhecimento',
    },
  
    images: {
      botAvatar: 'MentorIA_avatar.svg',
      userAvatar: 'ifb_estudante_avatar.svg',
      banner: 'MentorIA_banner_300kb.svg',
    },
  
    backend: {
      webhookUrl:
        'https://n8n.incluc0de.com.br/webhook/mentoria',
    },
  
    colors: {
      botMessageBox: '#98A92C',
      chatButton: '#509E2F',
      botAvatarBorder: '#98A92C',
      userAvatarBorder: '#509E2F',
    },
  };
  
  export default chatConfig;