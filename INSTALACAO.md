# Guia de Instalação Rápida

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Importante:** Substitua `http://localhost:3001` pela URL real da sua API REST.

### 3. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em: **http://localhost:3000**

### 4. Executar Testes (Opcional)

```bash
npm test
```

## Estrutura de Rotas

- `/` - Página inicial
- `/sobre` - Página sobre o sistema
- `/cadastro` - Cadastro de novas séries
- `/listagem` - Listagem, edição e exclusão de séries

## Endpoints da API Esperados

A API deve fornecer os seguintes endpoints:

- `GET /series` - Lista todas as séries
- `GET /series/:id` - Busca série por ID
- `POST /series` - Cria nova série
- `PUT /series/:id` - Atualiza série
- `DELETE /series/:id` - Deleta série

## Formato de Dados da API

### Criar/Atualizar Série

```json
{
  "titulo": "Nome da Série",
  "numeroTemporadas": 3,
  "dataLancamentoTemporada": "2023-01-15",
  "diretor": "Nome do Diretor",
  "produtora": "Nome da Produtora",
  "categoria": "Drama",
  "dataAssistiu": "2023-06-20"
}
```

### Resposta da API (com ID)

```json
{
  "id": 1,
  "titulo": "Nome da Série",
  "numeroTemporadas": 3,
  "dataLancamentoTemporada": "2023-01-15",
  "diretor": "Nome do Diretor",
  "produtora": "Nome da Produtora",
  "categoria": "Drama",
  "dataAssistiu": "2023-06-20"
}
```

## Solução de Problemas

### Erro ao conectar com a API

1. Verifique se a API está rodando
2. Confirme a URL no arquivo `.env.local`
3. Verifique se a API aceita requisições CORS do frontend

### Erro ao executar testes

Certifique-se de que todas as dependências foram instaladas:

```bash
npm install
```

