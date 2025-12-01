import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

const router = express.Router()
const dataFile = path.join(__dirname, '../data/series.json')

// Garantir que o arquivo existe
if (!fs.existsSync(dataFile)) {
  const dir = path.dirname(dataFile)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
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
  if (!titulo || numeroTemporadas === undefined || !dataLancamentoTemporada || !diretor || !produtora || !categoria || !dataAssistiu) {
    return res.status(400).json({ 
      message: 'Todos os campos são obrigatórios',
      campos: { titulo, numeroTemporadas, dataLancamentoTemporada, diretor, produtora, categoria, dataAssistiu }
    })
  }
  
  const newId = series.length > 0 ? Math.max(...series.map((s) => s.id || 0)) + 1 : 1
  const newSerie = {
    id: newId,
    titulo: String(titulo),
    numeroTemporadas: Number(numeroTemporadas),
    dataLancamentoTemporada: String(dataLancamentoTemporada),
    diretor: String(diretor),
    produtora: String(produtora),
    categoria: String(categoria),
    dataAssistiu: String(dataAssistiu),
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

