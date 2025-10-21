<p align="center">
  <img src="https://mentor-ia-phi.vercel.app/MentorIA_banner_300kb.svg" alt="MentorIA Banner" width="500">
</p>

# 🤖 MentorIA — Agente Educacional em Computação

O **MentorIA** é um agente de **Inteligência Artificial Educacional** desenvolvido no **Instituto Federal de Brasília (IFB)**.  
Seu propósito é apoiar o ensino e a aprendizagem de Computação, integrando tecnologias de IA generativa, bancos vetoriais e fluxos automatizados para criar experiências interativas e pedagógicas.

---

## 🎯 Objetivo

O MentorIA foi criado para integrar **Inteligência Artificial** às práticas educacionais de forma **crítica, ética e inovadora**, oferecendo suporte a estudantes e docentes em contextos de ensino presencial, remoto ou híbrido.

O agente é capaz de:
- Explicar conceitos teóricos e práticos de Computação de forma contextualizada;
- Propor exemplos aplicados, desafios e exercícios;
- Responder dúvidas técnicas com base em uma base vetorial de conhecimento;
- Apoiar o desenvolvimento de competências e o protagonismo estudantil;
- Integrar-se a sistemas educacionais e ambientes virtuais de aprendizagem (AVA, portais, etc.).

---

## 🏗️ Arquitetura do Projeto

O MentorIA é implementado sobre a plataforma **n8n**, utilizando componentes modulares de IA para:
- Receber mensagens de usuários via **Webhooks**;
- Processar e interpretar mensagens com modelos da **OpenAI**;
- Consultar uma **base vetorial Supabase** que armazena documentos e conteúdos educacionais;
- Gerar respostas pedagógicas com **contexto dinâmico** e **memória conversacional**;
- Retornar as respostas ao front-end (ex.: interface React com chatbot).

Essa arquitetura permite criar fluxos **RAG (Retrieval-Augmented Generation)** customizados, com base em repositórios institucionais e materiais didáticos.

---

## 🧩 Tecnologias Utilizadas

| Tecnologia | Função Principal |
|-------------|------------------|
| **n8n** | Plataforma de automação que orquestra o fluxo do agente de IA |
| **OpenAI API** | Geração de linguagem natural e embeddings semânticos |
| **Supabase** | Armazenamento vetorial e busca semântica |
| **LangChain** | Framework de integração entre IA e base de conhecimento |
| **React** | Front-end e interface de interação com o agente |
| **react-chatbot-kit@^2.2.2** | Componente de chat utilizado na interface principal |
| **Vercel** | Hospedagem e deploy do front-end do MentorIA |

---

## 🧠 Funcionamento do Agente

O MentorIA atua como um **assistente pedagógico virtual**, que:
1. Recebe mensagens enviadas por estudantes ou professores;
2. Analisa o conteúdo e consulta o conhecimento relevante no Supabase;
3. Gera uma resposta educacional via modelo da OpenAI;
4. Retorna o conteúdo de forma amigável ao usuário;
5. Mantém o contexto das últimas interações para favorecer continuidade pedagógica.

---

## 🚀 Instalação e Execução

### 🔧 Pré-requisitos
- Node.js 18+  
- Instância funcional do **n8n**  
- Chave de API da **OpenAI**  
- Instância **Supabase** com tabela `documents` configurada para embeddings  
- Projeto **React** com dependência:
  ```bash
  npm install react-chatbot-kit

---

## 👨‍🏫 Equipe de Desenvolvimento

O projeto MentorIA é uma iniciativa do Instituto Federal de Brasília (IFB) e conta com a colaboração de docentes e pesquisadores da área de Computação.

### Equipe :

Prof. Dr. Leandro Vaguetti;

Prof. Dr. Rodrigo Duran;

Equipe de Apoio (IFB)	Desenvolvimento e testes	Discentes dos cursos de Computação e participantes dos grupos de pesquisa em IA e Educação.

## 📘 Propósito Educacional

O MentorIA faz parte das iniciativas do IFB voltadas ao uso crítico, ético e inclusivo da Inteligência Artificial na Educação, com foco em:

Formação integral e omnilateral;

Integração entre ensino, pesquisa e extensão;

Acessibilidade e inclusão digital;

Aproximação entre teoria, prática e inovação tecnológica.

## 📚 Licença

Este projeto é distribuído sob a licença MIT.
O uso é livre para fins educacionais, desde que mantidos os créditos aos autores e à instituição.

## 🌐 Links Importantes

Repositório GitHub: vaguettibfd/MentorIA

Instituto Federal de Brasília (IFB): https://www.ifb.edu.br

Demo do Projeto: https://mentor-ia-phi.vercel.app
  

