<div align="center"> <img src="./assets/img/SabiaLogo.png" height="150px"> </div>
🎲 Introdução

Qual o projeto?: Uma plataforma digital inclusiva voltada para auxiliar crianças e jovens com deficiências cognitivas (TEA, TDAH, dislexia e outros) no ambiente escolar.
O frontend é desenvolvido em Next.js, voltado para professores, responsáveis e alunos, consumindo a API backend em Node.js/Express.

⚒ Tecnologias Utilizadas

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge" /> | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge" /> | <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge" /> | <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge" />

🖥 Estrutura do Frontend

O frontend foi organizado para modularidade, escalabilidade e UX intuitiva:

sabia-frontend
├── public
│   ├── assets            → Imagens, ícones e logos
├── src
│   ├── components        → Componentes reutilizáveis (Botões, Cards, Modal, Quiz, etc.)
│   ├── pages             → Páginas do Next.js
│   ├── services          → Funções de integração com API (axios)
│   ├── styles            → Arquivos CSS/SCSS globais e módulos
│   ├── hooks             → Hooks customizados
└── package.json

⚙ Funcionalidades Implementadas

Autenticação de usuários: login e logout com JWT, integração com backend.

Dashboard do aluno: exibe progresso e atividades disponíveis.

Atividades temáticas: Quiz, Drag-and-Drop e Memory Game.

Feedback instantâneo: respostas corretas/incorretas destacadas.

Consumo de API: integração com endpoints de atividades, progresso e usuários.

Responsivo: interface adaptada para desktop e mobile.

Acessibilidade: cores, fontes e botões amigáveis para estudantes com dificuldades cognitivas.

🔁 Fluxo de Consumo da API

O frontend consome os endpoints do backend conforme abaixo:

Recurso	Endpoint	Método	Descrição
Usuários	/auth/login	POST	Faz login e recebe token JWT
Usuários	/auth/register	POST	Cria novo usuário
Atividades	/activities	GET	Lista todas as atividades
Atividades	/activities/:id	GET	Retorna atividade específica
Progresso	/progress	GET	Lista progressos do usuário
Progresso	/progress	POST	Cria novo progresso
Progresso	/progress/:id	PUT	Atualiza progresso existente
🚀 Como Executar

Clone o repositório:

git clone https://github.com/mariccardoso/PF-frontend-sabia.git


Acesse o diretório do projeto:

cd PF-frontend-sabia


Instale as dependências:

npm install


Crie o arquivo .env.local com a URL do backend:

NEXT_PUBLIC_API_URL=http://localhost:5000


Inicie o servidor de desenvolvimento:

npm run dev


Acesse em http://localhost:3000

🧠 Boas Práticas e Arquitetura

Componentização: cada funcionalidade tem seu componente isolado.

Hooks customizados: lógica de chamadas API reutilizável (useFetch, useAuth, etc.).

Modularidade: pastas separadas por responsabilidade.

Tratamento de erros: feedback de falhas de requisição e autenticação.

Design inclusivo: cores, contrastes e tipografia pensados para acessibilidade.

🤝 Contribuições

Contribuições são super bem-vindas! Para colaborar:

Faça um fork do repositório.

Crie sua branch: git checkout -b feature/NovaFuncionalidade

Commit: git commit -m 'feat: adiciona nova funcionalidade'

Push: git push origin feature/NovaFuncionalidade

Crie um Pull Request 🚀

Feito com ❤ por Mariana Dev