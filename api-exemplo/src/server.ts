import express from 'express'
import cors from 'cors'
import seriesRoutes from './routes/series'

const app = express()
const PORT = 3001

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

// Routes
app.use('/series', seriesRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API está funcionando' })
})

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`)
  console.log(`📡 Endpoints disponíveis:`)
  console.log(`   GET    http://localhost:${PORT}/series`)
  console.log(`   GET    http://localhost:${PORT}/series/:id`)
  console.log(`   POST   http://localhost:${PORT}/series`)
  console.log(`   PUT    http://localhost:${PORT}/series/:id`)
  console.log(`   DELETE http://localhost:${PORT}/series/:id`)
})

