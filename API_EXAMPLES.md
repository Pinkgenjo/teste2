# Exemplos de Respostas da API

Este arquivo contém exemplos de como a API deve responder para que o frontend funcione corretamente.

## GET /series

Retorna uma lista de todas as séries.

**Resposta esperada:**

```json
[
  {
    "id": 1,
    "titulo": "Breaking Bad",
    "numeroTemporadas": 5,
    "dataLancamentoTemporada": "2008-01-20",
    "diretor": "Vince Gilligan",
    "produtora": "Sony Pictures Television",
    "categoria": "Drama",
    "dataAssistiu": "2023-05-15"
  },
  {
    "id": 2,
    "titulo": "Game of Thrones",
    "numeroTemporadas": 8,
    "dataLancamentoTemporada": "2011-04-17",
    "diretor": "David Benioff",
    "produtora": "HBO",
    "categoria": "Fantasia",
    "dataAssistiu": "2023-06-20"
  }
]
```

## GET /series/:id

Retorna uma série específica.

**Resposta esperada:**

```json
{
  "id": 1,
  "titulo": "Breaking Bad",
  "numeroTemporadas": 5,
  "dataLancamentoTemporada": "2008-01-20",
  "diretor": "Vince Gilligan",
  "produtora": "Sony Pictures Television",
  "categoria": "Drama",
  "dataAssistiu": "2023-05-15"
}
```

## POST /series

Cria uma nova série.

**Request Body:**

```json
{
  "titulo": "Stranger Things",
  "numeroTemporadas": 4,
  "dataLancamentoTemporada": "2016-07-15",
  "diretor": "Matt Duffer",
  "produtora": "Netflix",
  "categoria": "Ficção Científica",
  "dataAssistiu": "2023-07-10"
}
```

**Resposta esperada (201 Created):**

```json
{
  "id": 3,
  "titulo": "Stranger Things",
  "numeroTemporadas": 4,
  "dataLancamentoTemporada": "2016-07-15",
  "diretor": "Matt Duffer",
  "produtora": "Netflix",
  "categoria": "Ficção Científica",
  "dataAssistiu": "2023-07-10"
}
```

## PUT /series/:id

Atualiza uma série existente.

**Request Body (todos os campos são opcionais para atualização parcial):**

```json
{
  "titulo": "Stranger Things - Atualizado",
  "numeroTemporadas": 5
}
```

**Resposta esperada (200 OK):**

```json
{
  "id": 3,
  "titulo": "Stranger Things - Atualizado",
  "numeroTemporadas": 5,
  "dataLancamentoTemporada": "2016-07-15",
  "diretor": "Matt Duffer",
  "produtora": "Netflix",
  "categoria": "Ficção Científica",
  "dataAssistiu": "2023-07-10"
}
```

## DELETE /series/:id

Deleta uma série.

**Resposta esperada (204 No Content ou 200 OK):**

Sem corpo de resposta, apenas status code de sucesso.

## Tratamento de Erros

A API deve retornar erros no seguinte formato:

**400 Bad Request:**

```json
{
  "message": "Campos obrigatórios faltando",
  "errors": {
    "titulo": "Título é obrigatório"
  }
}
```

**404 Not Found:**

```json
{
  "message": "Série não encontrada"
}
```

**500 Internal Server Error:**

```json
{
  "message": "Erro interno do servidor"
}
```

## CORS

A API deve permitir requisições do frontend configurando os headers CORS apropriados:

```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

