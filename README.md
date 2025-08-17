# 📋 Todo Frontend

Uma aplicação moderna de gerenciamento de tarefas construída com **React**, **TypeScript** e **Tailwind CSS**.

## 🚀 Tecnologias Utilizadas

### Core
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS v4** - Framework CSS utility-first

### Estado e Formulários
- **Zustand** - Gerenciamento de estado global
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas e inferência de tipos

### Navegação e UX
- **React Router DOM** - Roteamento SPA
- **React Hot Toast** - Notificações toast
- **SweetAlert2** - Modais de confirmação
- **React Icons** - Ícones (Font Awesome)

### API e Dados
- **Axios** - Cliente HTTP com interceptors
- **LocalStorage** - Persistência com TTL (10 minutos)

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── AppHeader.tsx    # Header com navegação
│   ├── button.tsx       # Botão customizado
│   ├── input.tsx        # Input com toggle de senha
│   ├── cardTask.tsx     # Card de tarefa
│   ├── pagination.tsx   # Componente de paginação
│   └── Layout.tsx       # Layout principal
├── pages/               # Páginas da aplicação
│   ├── auth/            # Autenticação
│   │   ├── login.tsx    # Tela de login
│   │   └── register.tsx # Tela de registro
│   ├── tasks/           # Tarefas
│   │   ├── index.tsx    # Lista de tarefas
│   │   ├── taskDetails.tsx # Detalhes da tarefa
│   │   ├── taskForm.tsx # Criar/editar tarefa
│   │   └── searchBar.tsx # Barra de busca
│   └── profile/         # Perfil
│       └── index.tsx    # Tela de perfil
├── store/               # Estado global
│   ├── authStore.ts     # Estado de autenticação
│   └── taskStore.ts     # Estado de tarefas
├── lib/                 # Serviços e utilitários
│   ├── axios.ts         # Cliente API configurado
│   ├── authService.ts   # Serviços de autenticação
│   └── taskService.ts   # Serviços de tarefas
├── schemas/             # Validação Zod
│   ├── auth.ts          # Schemas de autenticação
│   └── tasks.ts         # Schemas de tarefas
└── routes/              # Configuração de rotas
    └── routes.tsx       # Rotas públicas/privadas
```

### Padrões Arquiteturais

#### 🔄 Inversão de Dependência
- **Services** abstraem chamadas de API
- **Stores** dependem de interfaces, não implementações
- Facilita testes e manutenção

#### 🛡️ Proteção de Rotas
- **RouteGuard** unificado para rotas públicas/privadas
- Redirecionamentos automáticos baseados no estado de autenticação

#### 📦 Gerenciamento de Estado
- **Zustand** para estado global simples
- **Persistência** com TTL de 10 minutos no localStorage
- **Otimização** evita requisições desnecessárias

## 🎯 Funcionalidades

### 🔐 Autenticação
- [x] **Login** com email e senha
- [x] **Registro** de novos usuários
- [x] **Logout** com confirmação
- [x] **Refresh token** automático
- [x] **Perfil do usuário** (visualizar/editar/deletar)

### ✅ Gerenciamento de Tarefas
- [x] **Listar tarefas** com paginação
- [x] **Buscar tarefas** por título
- [x] **Criar nova tarefa**
- [x] **Editar tarefa** existente
- [x] **Deletar tarefa** com confirmação
- [x] **Marcar como concluída**
- [x] **Seleção múltipla** para deletar várias tarefas
- [x] **Detalhes da tarefa** em tela separada
- [x] **Níveis de urgência** (Padrão, Importante, Urgente, Crítica)

### 🎨 Interface e UX
- [x] **Design responsivo** com Tailwind CSS
- [x] **Layout consistente** (card branco em fundo cinza)
- [x] **Navegação intuitiva** entre telas
- [x] **Feedback visual** com toasts e modais
- [x] **Estados de loading** e disabled
- [x] **Validação em tempo real** com mensagens em português
- [x] **Persistência local** para melhor performance

### 🔧 Funcionalidades Técnicas
- [x] **Interceptors HTTP** para token refresh automático
- [x] **Validação robusta** com Zod
- [x] **Tratamento de erros** centralizado
- [x] **Cache inteligente** com expiração
- [x] **Type safety** completo
- [x] **Componentes reutilizáveis**

## 🚦 Como Executar

### Pré-requisitos
- Node.js 20+
- NPM ou Yarn
- API backend rodando em `http://localhost:3000`

### Instalação
```bash
# Clone o repositório
git clone <url-do-repo>
cd todo-front

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Build para Produção
```bash
npm run build
npm run preview
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build
- `npm run lint` - Executa linting

## 📱 Telas da Aplicação

### Autenticação
- **Login**: Formulário com email/senha e toggle de visualização
- **Registro**: Formulário com nome/email/senha

### Dashboard
- **Lista de Tarefas**: Cards com urgência visual, paginação e busca
- **Detalhes**: Visualização completa da tarefa
- **Formulário**: Tela unificada para criar/editar tarefas

### Perfil
- **Visualização**: Dados do usuário
- **Edição**: Atualizar informações
- **Exclusão**: Deletar conta com confirmação

## 🎨 Design System

### Componentes
- **Button**: 3 variantes (default, success, danger) com estados disabled
- **Input**: Com toggle de senha e validação visual
- **Layout**: Container centralizado consistente
- **AppHeader**: Navegação inteligente entre telas

### Cores e Estilos
- **Primária**: Tons de azul para navegação
- **Sucesso**: Verde para ações positivas
- **Perigo**: Vermelho para ações destrutivas
- **Urgência**: Bordas coloridas (cinza → amarelo → laranja → vermelho)

## 🔒 Segurança

- **Tokens JWT** com refresh automático
- **Rotas protegidas** por autenticação
- **Validação client-side** com Zod
- **Sanitização** de inputs
- **Confirmação** para ações críticas

## ⚡ Performance

- **Lazy loading** de componentes
- **Cache local** com TTL de 10 minutos
- **Evita requisições** desnecessárias
- **Otimização** de re-renders
- **Bundle splitting** automático do Vite

## 🎯 Próximos Passos

- [ ] Testes unitários e E2E
- [ ] Dark mode
- [ ] Drag & drop para reordenar tarefas
- [ ] Filtros avançados
- [ ] Notificações push
- [ ] PWA (Progressive Web App)
- [ ] Internacionalização (i18n)

## 🤝 Contribuição

Este projeto foi desenvolvido como exercício de aprendizado, demonstrando:
- **Arquitetura moderna** de frontend
- **Boas práticas** de desenvolvimento React
- **Integração completa** frontend/backend
- **UX/UI profissional** com Tailwind CSS

---

**Desenvolvido com ❤️ e muito ☕**