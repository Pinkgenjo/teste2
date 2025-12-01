'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material'
import {
  Edit,
  Delete,
  Search,
  Add,
  Refresh,
} from '@mui/icons-material'
import { Serie } from '@/types/serie'
import { serieService } from '@/services/api'
import { EditarSerieDialog } from '@/components/EditarSerieDialog'

export default function ListagemPage() {
  const router = useRouter()
  const [series, setSeries] = useState<Serie[]>([])
  const [filteredSeries, setFilteredSeries] = useState<Serie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serieToDelete, setSerieToDelete] = useState<Serie | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [serieToEdit, setSerieToEdit] = useState<Serie | null>(null)

  const loadSeries = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await serieService.getAll()
      setSeries(data)
      setFilteredSeries(data)
    } catch (err: any) {
      let errorMessage = 'Erro ao carregar séries. Verifique se a API está rodando.'
      
      if (err.isConnectionError) {
        errorMessage = `Não foi possível conectar à API em ${err.apiUrl || 'http://localhost:3001'}. Verifique se a API está rodando.`
      } else if (err.isTimeoutError) {
        errorMessage = 'A requisição demorou muito para responder. Verifique se a API está acessível.'
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSeries()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSeries(series)
    } else {
      const filtered = series.filter(
        (serie) =>
          serie.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          serie.diretor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          serie.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
          serie.produtora.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSeries(filtered)
    }
  }, [searchTerm, series])

  const handleDeleteClick = (serie: Serie) => {
    setSerieToDelete(serie)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (serieToDelete?.id) {
      try {
        await serieService.delete(serieToDelete.id)
        await loadSeries()
        setDeleteDialogOpen(false)
        setSerieToDelete(null)
      } catch (err: any) {
        let errorMessage = 'Erro ao excluir série. Tente novamente.'
        
        if (err.isConnectionError) {
          errorMessage = `Não foi possível conectar à API em ${err.apiUrl || 'http://localhost:3001'}. Verifique se a API está rodando.`
        } else if (err.isTimeoutError) {
          errorMessage = 'A requisição demorou muito para responder. Verifique se a API está acessível.'
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message
        } else if (err.message) {
          errorMessage = err.message
        }
        
        setError(errorMessage)
        setDeleteDialogOpen(false)
      }
    }
  }

  const handleEditClick = (serie: Serie) => {
    setSerieToEdit(serie)
    setEditDialogOpen(true)
  }

  const handleEditClose = () => {
    setEditDialogOpen(false)
    setSerieToEdit(null)
  }

  const handleEditSuccess = () => {
    loadSeries()
    handleEditClose()
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1">
          Listagem de Séries
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/cadastro')}
          >
            Nova Série
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={loadSeries}
            disabled={loading}
          >
            Atualizar
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Buscar por título, diretor, categoria ou produtora..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredSeries.length === 0 ? (
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            {searchTerm
              ? 'Nenhuma série encontrada com os critérios de busca.'
              : 'Nenhuma série cadastrada ainda.'}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Título</strong></TableCell>
                <TableCell><strong>Temporadas</strong></TableCell>
                <TableCell><strong>Data Lançamento</strong></TableCell>
                <TableCell><strong>Diretor</strong></TableCell>
                <TableCell><strong>Produtora</strong></TableCell>
                <TableCell><strong>Categoria</strong></TableCell>
                <TableCell><strong>Data Assistiu</strong></TableCell>
                <TableCell align="center"><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSeries.map((serie) => (
                <TableRow key={serie.id} hover>
                  <TableCell>{serie.titulo}</TableCell>
                  <TableCell>{serie.numeroTemporadas}</TableCell>
                  <TableCell>{formatDate(serie.dataLancamentoTemporada)}</TableCell>
                  <TableCell>{serie.diretor}</TableCell>
                  <TableCell>{serie.produtora}</TableCell>
                  <TableCell>{serie.categoria}</TableCell>
                  <TableCell>{formatDate(serie.dataAssistiu)}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(serie)}
                      aria-label="editar"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(serie)}
                      aria-label="excluir"
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

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir a série{' '}
            <strong>{serieToDelete?.titulo}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {serieToEdit && (
        <EditarSerieDialog
          open={editDialogOpen}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
          serie={serieToEdit}
        />
      )}
    </Container>
  )
}

