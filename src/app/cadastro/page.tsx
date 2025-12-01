'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Snackbar
} from '@mui/material'
import axios from 'axios'

interface SerieForm {
  title: string
  seasons: number
  releaseDate: string
  director: string
  production: string
  category: string
  watchedAt: string
}

export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<SerieForm>()

  const onSubmit = async (data: SerieForm) => {
    setLoading(true)
    setError('')
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
      await axios.post(`${apiUrl}/series`, {
        ...data,
        seasons: Number(data.seasons)
      })
      
      setSuccess(true)
      reset()
      
      setTimeout(() => {
        router.push('/listagem')
      }, 1500)
    } catch (err) {
      setError('Erro ao cadastrar série. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastrar Nova Série
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
            placeholder="Ex: Drama, Comédia, Ação"
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
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => router.push('/listagem')}
              fullWidth
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Série cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  )
}