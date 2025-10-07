<div align="center">
  <img src="/public/images/SabiaLogo.png" height="50px">
  <h1>🌟 Sabia Educ - Frontend</h1>
  <p><em>Plataforma educacional inclusiva para crianças e jovens com necessidades especiais</em></p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
</div>

---

## 🎯 Sobre o Projeto

**Sabia Educ** é uma plataforma digital inclusiva desenvolvida para auxiliar crianças e jovens com deficiências cognitivas (TEA, TDAH, dislexia e outros) no ambiente escolar. O frontend foi construído com **Next.js**, oferecendo uma experiência intuitiva para professores, responsáveis e alunos.

### ✨ Principais Características

- 🎨 **Interface Inclusiva**: Design pensado para acessibilidade e usabilidade
- 🎮 **Atividades Interativas**: Quiz, Drag-and-Drop e Memory Games
- 📊 **Acompanhamento de Progresso**: Dashboard completo para estudantes
- 🔐 **Autenticação Segura**: Sistema de login com JWT
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 15 | Framework React para produção |
| **React** | 18 | Biblioteca para interfaces de usuário |
| **JavaScript** | ES6+ | Linguagem de programação |
| **CSS Modules** | - | Estilização componentizada |
| **Axios** | - | Cliente HTTP para API |

---

## 📁 Estrutura do Projeto

```
sabia-frontend/
├── 📁 public/
│   └── 📁 assets/              → Imagens, ícones e logos
├── 📁 src/
│   ├── 📁 app/                 → Páginas do Next.js (App Router)
│   │   ├── 📁 aluno/          → Páginas do dashboard do aluno
│   │   │   ├── 📁 atividade/    → Página de atividade (quiz, jogo, etc)
│   │   ├── 📁 professor/          → Página de autenticação
│   │   ├── 📁 login/          → Página de autenticação
│   │   └── 📁 register/       → Página de cadastro
│   ├── 📁 components/         → Componentes reutilizáveis
├── 📄 package.json
└── 📄 README.md
```

---

## ⚡ Funcionalidades

### 🔐 **Autenticação**
- ✅ Login e logout com JWT
- ✅ Registro de novos usuários
- ✅ Proteção de rotas privadas

### 🎓 **Dashboard do Aluno**
- ✅ Visualização de progresso
- ✅ Lista de atividades disponíveis
- ✅ Histórico de desempenho

### 🎮 **Atividades Interativas**
- ✅ **Quiz**: Perguntas e respostas temáticas
- ✅ **Memory Game**: Jogo da memória personalizado
- ✅ Feedback instantâneo para respostas

### 🎨 **Design Inclusivo**
- ✅ Cores e contrastes acessíveis
- ✅ Tipografia clara e legível
- ✅ Botões e elementos amigáveis
- ✅ Interface responsiva

### 📊 **Acompanhamento de Progresso**
- ✅ Visualização de progresso em tempo real
- ✅ Relatórios detalhados para professores

---

## 🌐 Integração com API

O frontend consome os seguintes endpoints do backend:

| Recurso | Endpoint | Método | Descrição |
|---------|----------|--------|-----------|
| **Autenticação** | `/auth/login` | `POST` | Realiza login e retorna JWT |
| **Usuários** | `/auth/register` | `POST` | Cadastra novo usuário |
| **Atividades** | `/activities` | `GET` | Lista todas as atividades |
| **Atividade** | `/activities/:id` | `GET` | Retorna atividade específica |
| **Progresso** | `/progress` | `GET` | Lista progresso do usuário |
| **Progresso** | `/progress` | `POST` | Cria novo registro de progresso |
| **Progresso** | `/progress/:id` | `PUT` | Atualiza progresso existente |

---

## 🚀 Como Executar

### 📋 Pré-requisitos

- Node.js 18+ instalado
- Backend da aplicação rodando na porta 5000

Acesse [https://github.com/mariccardoso/PF-backend-sabia.git](https://github.com/mariccardoso/PF-backend-sabia.git) e siga as instruções para configurar o backend.

### 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/mariccardoso/PF-frontend-sabia-educ.git
   ```

2. **Acesse o diretório**
   ```bash
   cd PF-frontend-sabia-educ
   ```

3. **Instale as dependências**
   ```bash
   npm install
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

---

## 🏗️ Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-----------|
| **Desenvolvimento** | `npm run dev` | Inicia servidor de desenvolvimento |
| **Build** | `npm run build` | Gera build de produção |
| **Iniciar** | `npm start` | Inicia aplicação em produção |
| **Lint** | `npm run lint` | Executa verificação de código |

---

## 🎨 Boas Práticas Implementadas

### 🏗️ **Arquitetura**
- ✅ **Componentização**: Cada funcionalidade isolada em componentes
- ✅ **Hooks Customizados**: Lógica reutilizável (`useAuth`, `useFetch`)
- ✅ **Modularidade**: Organização clara por responsabilidade

### 🔒 **Qualidade**
- ✅ **Tratamento de Erros**: Feedback claro para falhas
- ✅ **Validação**: Verificação de dados de entrada
- ✅ **Segurança**: Proteção de rotas e dados sensíveis

### ♿ **Acessibilidade**
- ✅ **Design Inclusivo**: Cores e contrastes adequados
- ✅ **Navegação**: Interface intuitiva para todos os usuários
- ✅ **Responsividade**: Adaptação para diferentes dispositivos

---

## 🤝 Como Contribuir

Contribuições são sempre bem-vindas! Siga os passos abaixo:

### 📝 **Processo de Contribuição**

1. **Fork** do repositório
2. **Clone** seu fork localmente
   ```bash
   git clone https://github.com/seu-usuario/PF-frontend-sabia.git
   ```
3. **Crie** uma branch para sua feature
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
4. **Faça** suas alterações e commit
   ```bash
   git commit -m 'feat: adiciona nova funcionalidade'
   ```
5. **Push** para sua branch
   ```bash
   git push origin feature/nova-funcionalidade
   ```
6. **Abra** um Pull Request

### 📋 **Padrões de Commit**

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` alteração na documentação
- `style:` formatação, sem alteração de código
- `refactor:` refatoração de código
- `test:` adição ou modificação de testes

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👩‍💻 Autora

<div align="center">
  <img src="https://github.com/mariccardoso.png" width="100px" style="border-radius: 50%">
  <br>
  <strong>Mariana Cardoso</strong>
  <br>
  <em>Desenvolvedora Frontend</em>
  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mariccardoso)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mariccardoso)
</div>

---

<div align="center">
  <p><strong>Feito com ❤️ e dedicação para uma educação mais inclusiva</strong></p>
  <p><em>Sabia Educ - Transformando vidas através da tecnologia educacional</em></p>
</div>