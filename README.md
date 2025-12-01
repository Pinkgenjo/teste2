# Sistema de Séries - Frontend

Sistema de gerenciamento de séries desenvolvido com Next.js, React, Material-UI e Axios.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com roteamento
- **React 18** - Biblioteca para construção de interfaces
- **Material-UI (MUI)** - Biblioteca de componentes UI
- **Axios** - Cliente HTTP para consumo de API REST
- **React Hook Form** - Gerenciamento de formulários
- **TypeScript** - Tipagem estática
- **Vitest** - Framework de testes

## 📋 Funcionalidades

- ✅ Página inicial com apresentação do sistema
- ✅ Página "Sobre" com informações do sistema
- ✅ Cadastro de séries com formulário completo
- ✅ Listagem de séries com busca
- ✅ Edição de séries
- ✅ Exclusão de séries
- ✅ Testes unitários

## 🛠️ Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure a URL da API:

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Substitua `http://localhost:3001` pela URL da sua API REST.

## 🏃 Executando o Projeto

### Modo de Desenvolvimento

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Build de Produção

```bash
npm run build
npm start
```

## 🧪 Testes

Execute os testes unitários:

```bash
npm test
```

Execute os testes com interface:

```bash
npm run test:ui
```

## 📁 Estrutura do Projeto

```
emer2/
├── src/
│   ├── app/              # Páginas do Next.js
│   │   ├── page.tsx      # Página inicial
│   │   ├── sobre/        # Página sobre
│   │   ├── cadastro/     # Página de cadastro
│   │   └── listagem/     # Página de listagem
│   ├── components/       # Componentes React
│   │   ├── Navbar.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── WelcomeCard.tsx
│   │   └── EditarSerieDialog.tsx
│   ├── services/         # Serviços de API
│   │   └── api.ts
│   ├── types/            # Tipos TypeScript
│   │   └── serie.ts
│   └── test/             # Configuração de testes
│       └── setup.ts
├── package.json
├── tsconfig.json
├── next.config.js
└── vitest.config.ts
```

## 📝 Campos do Formulário

O formulário de cadastro/edição de séries contém os seguintes campos obrigatórios:

- **Título**: Nome da série
- **Número de Temporadas**: Quantidade de temporadas
- **Data de Lançamento da Temporada**: Data de lançamento
- **Diretor**: Nome do diretor
- **Produtora**: Nome da produtora
- **Categoria**: Categoria da série (ex: Drama, Comédia, Ação)
- **Data em que Assistiu**: Data em que você assistiu a série

## 🔌 Integração com API

O sistema consome uma API REST que deve fornecer os seguintes endpoints:

- `GET /series` - Lista todas as séries
- `GET /series/:id` - Busca série por ID
- `POST /series` - Cria nova série
- `PUT /series/:id` - Atualiza série
- `DELETE /series/:id` - Deleta série

### Formato de Dados

```typescript
interface Serie {
  id?: number
  titulo: string
  numeroTemporadas: number
  dataLancamentoTemporada: string
  diretor: string
  produtora: string
  categoria: string
  dataAssistiu: string
}
```

## 🎨 Personalização

O tema do Material-UI pode ser personalizado no arquivo `src/components/ThemeProvider.tsx`.

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

