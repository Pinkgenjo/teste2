'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Save } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { Serie, SerieFormData } from '@/types/serie'
import { serieService } from '@/services/api'

interface EditarSerieDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  serie: Serie
}

export function EditarSerieDialog({
  open,
  onClose,
  onSuccess,
  serie,
}: EditarSerieDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SerieFormData>()

  useEffect(() => {
    if (open && serie) {
      reset({
        titulo: serie.titulo,
        numeroTemporadas: serie.numeroTemporadas,
        dataLancamentoTemporada: serie.dataLancamentoTemporada,
        diretor: serie.diretor,
        produtora: serie.produtora,
        categoria: serie.categoria,
        dataAssistiu: serie.dataAssistiu,
      })
    }
  }, [open, serie, reset])

  const onSubmit = async (data: SerieFormData) => {
    if (!serie.id) return

    setLoading(true)
    setError(null)

    try {
      await serieService.update(serie.id, data)
      onSuccess()
    } catch (err: any) {
      let errorMessage = 'Erro ao atualizar série. Tente novamente.'
      
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Editar Série</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título *"
                {...register('titulo', { required: 'Título é obrigatório' })}
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Número de Temporadas *"
                {...register('numeroTemporadas', {
                  required: 'Número de temporadas é obrigatório',
                  min: { value: 1, message: 'Deve ser pelo menos 1' },
                  valueAsNumber: true,
                })}
                error={!!errors.numeroTemporadas}
                helperText={errors.numeroTemporadas?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data de Lançamento da Temporada *"
                InputLabelProps={{ shrink: true }}
                {...register('dataLancamentoTemporada', {
                  required: 'Data de lançamento é obrigatória',
                })}
                error={!!errors.dataLancamentoTemporada}
                helperText={errors.dataLancamentoTemporada?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Diretor *"
                {...register('diretor', { required: 'Diretor é obrigatório' })}
                error={!!errors.diretor}
                helperText={errors.diretor?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Produtora *"
                {...register('produtora', {
                  required: 'Produtora é obrigatória',
                })}
                error={!!errors.produtora}
                helperText={errors.produtora?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Categoria *"
                {...register('categoria', {
                  required: 'Categoria é obrigatória',
                })}
                error={!!errors.categoria}
                helperText={errors.categoria?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Data em que Assistiu *"
                InputLabelProps={{ shrink: true }}
                {...register('dataAssistiu', {
                  required: 'Data em que assistiu é obrigatória',
                })}
                error={!!errors.dataAssistiu}
                helperText={errors.dataAssistiu?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

