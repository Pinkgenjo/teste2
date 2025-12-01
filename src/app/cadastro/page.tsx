'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Save, ArrowBack } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { SerieFormData } from '@/types/serie'
import { serieService } from '@/services/api'

export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SerieFormData>()

  const onSubmit = async (data: SerieFormData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await serieService.create(data)
      setSuccess(true)
      reset()
      setTimeout(() => {
        router.push('/listagem')
      }, 2000)
    } catch (err: any) {
      let errorMessage = 'Erro ao cadastrar série. Tente novamente.'
      
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastrar Nova Série
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Série cadastrada com sucesso! Redirecionando...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
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

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => router.push('/listagem')}
                  disabled={loading}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

