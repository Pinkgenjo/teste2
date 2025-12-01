# API REST - Sistema de Séries

API REST simples para o sistema de séries, desenvolvida com Node.js, Express e TypeScript.

## 🚀 Instalação Rápida

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar a API

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

## 📡 Endpoints

- `GET /series` - Lista todas as séries
- `GET /series/:id` - Busca série por ID
- `POST /series` - Cria nova série
- `PUT /series/:id` - Atualiza série
- `DELETE /series/:id` - Deleta série
- `GET /health` - Verifica se a API está funcionando

## 📝 Formato de Dados

### Criar/Atualizar Série

```json
{
  "titulo": "Breaking Bad",
  "numeroTemporadas": 5,
  "dataLancamentoTemporada": "2008-01-20",
  "diretor": "Vince Gilligan",
  "produtora": "Sony Pictures Television",
  "categoria": "Drama",
  "dataAssistiu": "2023-05-15"
}
```

## 💾 Armazenamento

Os dados são salvos em `src/data/series.json` (formato JSON simples).

## 🔧 Scripts

- `npm run dev` - Roda em modo desenvolvimento com hot-reload
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Roda a versão compilada

## 🌐 CORS

A API está configurada para aceitar requisições de `http://localhost:3000` (frontend Next.js).

Para alterar, edite `src/server.ts`:

```typescript
app.use(cors({
  origin: 'http://localhost:3000', // Altere aqui
  credentials: true
}))
```

