# 🚀 Início Rápido - API

## Opção Mais Rápida: Usar a API Exemplo

Uma API completa já está pronta na pasta `api-exemplo`. Siga estes passos:

### 1. Instalar dependências da API

```powershell
cd E:\emer2\api-exemplo
npm install
```

### 2. Rodar a API

```powershell
npm run dev
```

Você verá:
```
🚀 API rodando em http://localhost:3001
```

### 3. Testar a API

Abra o navegador e acesse:
- http://localhost:3001/series (deve retornar `[]`)
- http://localhost:3001/health (deve retornar `{"status":"OK"}`)

### 4. Rodar o Frontend

Em outro terminal:

```powershell
cd E:\emer2
npm run dev
```

Agora o frontend em `http://localhost:3000` conseguirá se conectar à API!

## ✅ Verificação

1. ✅ API rodando em `http://localhost:3001`
2. ✅ Frontend rodando em `http://localhost:3000`
3. ✅ Arquivo `.env.local` existe com `NEXT_PUBLIC_API_URL=http://localhost:3001`

## 📝 Próximos Passos

1. Acesse `http://localhost:3000` no navegador
2. Vá para "Cadastrar Série" e teste criar uma série
3. Vá para "Listar Séries" e veja a série cadastrada

## 🔧 Solução de Problemas

### Porta 3001 já está em uso

Altere a porta no arquivo `api-exemplo/src/server.ts`:

```typescript
const PORT = 3002  // Mude para outra porta
```

E atualize o `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### Erro ao instalar dependências

Certifique-se de ter Node.js instalado:

```powershell
node --version
npm --version
```

Se não tiver, baixe em: https://nodejs.org/

## 📚 Mais Informações

Consulte `COMO_CRIAR_API.md` para entender como a API funciona ou criar sua própria.

