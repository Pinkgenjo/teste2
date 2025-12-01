'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material'
import { Edit, Delete, Add } from '@mui/icons-material'
import axios from 'axios'
import { Serie } from '@/types/serie'
import EditarSerieDialog from '@/components/EditarSerieDialog'

export default function ListagemPage() {
  const router = useRouter()
  const [series, setSeries] = useState<Serie[]>([])
  const [filteredSeries, setFilteredSeries] = useState<Serie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingSerie, setEditingSerie] = useState<Serie | null>(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  useEffect(() => {
    fetchSeries()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = series.filter(serie =>
        serie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serie.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serie.director.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSeries(filtered)
    } else {
      setFilteredSeries(series)
    }
  }, [searchTerm, series])

  const fetchSeries = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/series`)
      setSeries(response.data)
      setFilteredSeries(response.data)
      setError('')
    } catch (err) {
      setError('Erro ao carregar séries')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta série?')) {
      return
    }

    try {
      await axios.delete(`${apiUrl}/series/${id}`)
      fetchSeries()
    } catch (err) {
      setError('Erro ao excluir série')
      console.error(err)
    }
  }

  const handleEdit = (serie: Serie) => {
    setEditingSerie(serie)
  }

  const handleCloseEdit = () => {
    setEditingSerie(null)
    fetchSeries()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Minhas Séries
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/cadastro')}
          >
            Nova Série
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Buscar por título, categoria ou diretor"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />

        {filteredSeries.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            {searchTerm ? 'Nenhuma série encontrada' : 'Nenhuma série cadastrada ainda'}
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Título</strong></TableCell>
                  <TableCell><strong>Temporadas</strong></TableCell>
                  <TableCell><strong>Categoria</strong></TableCell>
                  <TableCell><strong>Diretor</strong></TableCell>
                  <TableCell><strong>Produtora</strong></TableCell>
                  <TableCell><strong>Lançamento</strong></TableCell>
                  <TableCell><strong>Assistido em</strong></TableCell>
                  <TableCell align="center"><strong>Ações</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSeries.map((serie) => (
                  <TableRow key={serie.id} hover>
                    <TableCell>{serie.title}</TableCell>
                    <TableCell>{serie.seasons}</TableCell>
                    <TableCell>{serie.category}</TableCell>
                    <TableCell>{serie.director}</TableCell>
                    <TableCell>{serie.production}</TableCell>
                    <TableCell>{formatDate(serie.releaseDate)}</TableCell>
                    <TableCell>{formatDate(serie.watchedAt)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(serie)}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(serie.id!)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {editingSerie && (
        <EditarSerieDialog
          serie={editingSerie}
          open={!!editingSerie}
          onClose={handleCloseEdit}
        />
      )}
    </Container>
  )
}