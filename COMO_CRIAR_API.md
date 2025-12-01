# Como Criar e Rodar a API em localhost

Este guia mostra como criar uma API REST simples para o sistema de séries.

## Opção 1: API com Node.js + Express (Recomendado)

### Passo 1: Criar a estrutura da API

Crie uma nova pasta para a API (fora da pasta `emer2` ou em uma subpasta):

```bash
# No PowerShell, vá para o diretório pai
cd E:\
mkdir api-series
cd api-series
```

### Passo 2: Inicializar o projeto

```bash
npm init -y
```

### Passo 3: Instalar dependências

```bash
npm install express cors
npm install --save-dev @types/express @types/cors typescript ts-node nodemon
```

### Passo 4: Criar arquivo `package.json` com scripts

Edite o `package.json` e adicione:

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### Passo 5: Criar estrutura de pastas

```
api-series/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   └── series.ts
│   └── data/
│       └── series.json
├── package.json
└── tsconfig.json
```

### Passo 6: Criar `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Passo 7: Criar o servidor (`src/server.ts`)

```typescript
import express from 'express'
import cors from 'cors'
import seriesRoutes from './routes/series'

const app = express()
const PORT = 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/series', seriesRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API está funcionando' })
})

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`)
})
```

### Passo 8: Criar as rotas (`src/routes/series.ts`)

```typescript
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const dataFile = path.join(__dirname, '../data/series.json')

// Garantir que o arquivo existe
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([], null, 2))
}

// Ler séries do arquivo
const readSeries = (): any[] => {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Escrever séries no arquivo
const writeSeries = (series: any[]) => {
  fs.writeFileSync(dataFile, JSON.stringify(series, null, 2))
}

// GET /series - Listar todas as séries
router.get('/', (req: Request, res: Response) => {
  const series = readSeries()
  res.json(series)
})

// GET /series/:id - Buscar série por ID
router.get('/:id', (req: Request, res: Response) => {
  const series = readSeries()
  const id = parseInt(req.params.id)
  const serie = series.find((s) => s.id === id)
  
  if (!serie) {
    return res.status(404).json({ message: 'Série não encontrada' })
  }
  
  res.json(serie)
})

// POST /series - Criar nova série
router.post('/', (req: Request, res: Response) => {
  const series = readSeries()
  const { titulo, numeroTemporadas, dataLancamentoTemporada, diretor, produtora, categoria, dataAssistiu } = req.body
  
  // Validação básica
  if (!titulo || !numeroTemporadas || !dataLancamentoTemporada || !diretor || !produtora || !categoria || !dataAssistiu) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }
  
  const newId = series.length > 0 ? Math.max(...series.map((s) => s.id)) + 1 : 1
  const newSerie = {
    id: newId,
    titulo,
    numeroTemporadas: Number(numeroTemporadas),
    dataLancamentoTemporada,
    diretor,
    produtora,
    categoria,
    dataAssistiu,
  }
  
  series.push(newSerie)
  writeSeries(series)
  
  res.status(201).json(newSerie)
})

// PUT /series/:id - Atualizar série
router.put('/:id', (req: Request, res: Response) => {
  const series = readSeries()
  const id = parseInt(req.params.id)
  const index = series.findIndex((s) => s.id === id)
  
  if (index === -1) {
    return res.status(404).json({ message: 'Série não encontrada' })
  }
  
  const updatedSerie = { ...series[index], ...req.body, id }
  series[index] = updatedSerie
  writeSeries(series)
  
  res.json(updatedSerie)
})

// DELETE /series/:id - Deletar série
router.delete('/:id', (req: Request, res: Response) => {
  const series = readSeries()
  const id = parseInt(req.params.id)
  const index = series.findIndex((s) => s.id === id)
  
  if (index === -1) {
    return res.status(404).json({ message: 'Série não encontrada' })
  }
  
  series.splice(index, 1)
  writeSeries(series)
  
  res.status(204).send()
})

export default router
```

### Passo 9: Criar pasta de dados

Crie a pasta `src/data` e um arquivo vazio `series.json`:

```bash
mkdir src\data
echo [] > src\data\series.json
```

### Passo 10: Rodar a API

```bash
npm run dev
```

A API estará disponível em `http://localhost:3001`

## Opção 2: API com JSON Server (Mais Rápido)

### Passo 1: Instalar JSON Server globalmente

```bash
npm install -g json-server
```

### Passo 2: Criar arquivo `db.json`

Crie um arquivo `db.json` em qualquer pasta:

```json
{
  "series": []
}
```

### Passo 3: Rodar o servidor

```bash
json-server --watch db.json --port 3001 --host localhost
```

A API estará disponível em `http://localhost:3001`

**Endpoints automáticos:**
- `GET /series` - Lista todas
- `GET /series/:id` - Busca por ID
- `POST /series` - Cria nova
- `PUT /series/:id` - Atualiza
- `DELETE /series/:id` - Deleta

## Opção 3: Usar uma API Online (Para Testes)

Você pode usar serviços como:
- **JSONPlaceholder** (mas não tem os campos específicos)
- **MockAPI** (https://mockapi.io) - permite criar APIs customizadas
- **Postman Mock Server**

## Verificar se a API está funcionando

Abra o PowerShell e teste:

```powershell
# Testar se a API está respondendo
Invoke-WebRequest -Uri "http://localhost:3001/series" -Method GET

# Ou no navegador, acesse:
# http://localhost:3001/series
```

## Configurar o Frontend

Certifique-se de que o arquivo `.env.local` existe na pasta `emer2`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Depois, reinicie o servidor Next.js:

```bash
cd E:\emer2
npm run dev
```

## Solução de Problemas

### Porta 3001 já está em uso

Altere a porta no código da API (ex: 3002) e atualize o `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

### CORS Error

Se usar a Opção 1 (Express), o `cors()` já está configurado. Se ainda tiver problemas, adicione:

```typescript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

### API não responde

1. Verifique se a API está rodando (veja o console)
2. Teste no navegador: `http://localhost:3001/series`
3. Verifique se a porta está correta no `.env.local`

