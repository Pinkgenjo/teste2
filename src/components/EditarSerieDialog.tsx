'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material'
import axios from 'axios'
import { Serie } from '@/types/serie'

interface EditarSerieDialogProps {
  serie: Serie
  open: boolean
  onClose: () => void
}

interface SerieForm {
  title: string
  seasons: number
  releaseDate: string
  director: string
  production: string
  category: string
  watchedAt: string
}

export default function EditarSerieDialog({ serie, open, onClose }: EditarSerieDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SerieForm>()

  useEffect(() => {
    if (serie) {
      reset({
        title: serie.title,
        seasons: serie.seasons,
        releaseDate: serie.releaseDate,
        director: serie.director,
        production: serie.production,
        category: serie.category,
        watchedAt: serie.watchedAt
      })
    }
  }, [serie, reset])

  const onSubmit = async (data: SerieForm) => {
    setLoading(true)
    setError('')
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      await axios.put(`${apiUrl}/series`, {
        ...data,
        id: serie.id,
        seasons: Number(data.seasons)
      })
      
      onClose()
    } catch (err) {
      setError('Erro ao atualizar série. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Série</DialogTitle>
      
      <DialogContent>
        <Box component="form" id="edit-form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Título"
            margin="normal"
            {...register('title', { required: 'Título é obrigatório' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          
          <TextField
            fullWidth
            label="Número de Temporadas"
            type="number"
            margin="normal"
            {...register('seasons', { 
              required: 'Número de temporadas é obrigatório',
              min: { value: 1, message: 'Deve ter pelo menos 1 temporada' }
            })}
            error={!!errors.seasons}
            helperText={errors.seasons?.message}
          />
          
          <TextField
            fullWidth
            label="Data de Lançamento"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register('releaseDate', { required: 'Data de lançamento é obrigatória' })}
            error={!!errors.releaseDate}
            helperText={errors.releaseDate?.message}
          />
          
          <TextField
            fullWidth
            label="Diretor"
            margin="normal"
            {...register('director', { required: 'Diretor é obrigatório' })}
            error={!!errors.director}
            helperText={errors.director?.message}
          />
          
          <TextField
            fullWidth
            label="Produtora"
            margin="normal"
            {...register('production', { required: 'Produtora é obrigatória' })}
            error={!!errors.production}
            helperText={errors.production?.message}
          />
          
          <TextField
            fullWidth
            label="Categoria"
            margin="normal"
            {...register('category', { required: 'Categoria é obrigatória' })}
            error={!!errors.category}
            helperText={errors.category?.message}
          />
          
          <TextField
            fullWidth
            label="Data em que Assistiu"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...register('watchedAt', { required: 'Data em que assistiu é obrigatória' })}
            error={!!errors.watchedAt}
            helperText={errors.watchedAt?.message}
          />
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>
          Cancelar
        </Button>
        <Button 
          type="submit" 
          form="edit-form" 
          variant="contained" 
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}