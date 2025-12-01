# Configuração da API

## Erro: ERR_CONNECTION_REFUSED

Se você está vendo o erro `ERR_CONNECTION_REFUSED`, isso significa que o frontend não consegue se conectar à API REST.

## Solução

### 1. Verificar se a API está rodando

Certifique-se de que sua API REST está rodando e acessível na porta configurada.

### 2. Configurar a URL da API

Crie um arquivo `.env.local` na raiz do projeto (mesmo nível do `package.json`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Importante:** 
- Substitua `http://localhost:3001` pela URL real da sua API
- Se sua API estiver em outra porta, altere o número da porta
- Se sua API estiver em outro servidor, use o endereço completo (ex: `http://192.168.1.100:3001`)

### 3. Reiniciar o servidor Next.js

Após criar ou modificar o arquivo `.env.local`:

1. Pare o servidor Next.js (Ctrl+C)
2. Reinicie o servidor:
   ```bash
   npm run dev
   ```

### 4. Verificar CORS

Se sua API estiver em um servidor diferente, certifique-se de que ela está configurada para aceitar requisições do frontend (CORS).

A API deve retornar os seguintes headers:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Endpoints Esperados

A API deve fornecer os seguintes endpoints:

- `GET /series` - Lista todas as séries
- `GET /series/:id` - Busca série por ID
- `POST /series` - Cria nova série
- `PUT /series/:id` - Atualiza série
- `DELETE /series/:id` - Deleta série

## Formato de Dados

Consulte o arquivo `API_EXAMPLES.md` para exemplos de requisições e respostas esperadas.

## Testando a Conexão

Você pode testar se a API está acessível usando:

```bash
# No PowerShell
Invoke-WebRequest -Uri "http://localhost:3001/series" -Method GET

# Ou usando curl (se disponível)
curl http://localhost:3001/series
```

Se a API estiver rodando, você deve receber uma resposta (mesmo que seja um array vazio `[]`).

