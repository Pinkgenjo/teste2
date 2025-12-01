'use client'

import { Card, CardContent, Typography, Grid, Box } from '@mui/material'
import { Movie, List, Add, Info } from '@mui/icons-material'

export function WelcomeCard() {
  const features = [
    {
      icon: <Add fontSize="large" />,
      title: 'Cadastrar Séries',
      description: 'Adicione novas séries com todas as informações importantes',
    },
    {
      icon: <List fontSize="large" />,
      title: 'Listar Séries',
      description: 'Visualize todas as séries cadastradas e gerencie-as',
    },
    {
      icon: <Movie fontSize="large" />,
      title: 'Gerenciar',
      description: 'Edite ou exclua séries conforme necessário',
    },
    {
      icon: <Info fontSize="large" />,
      title: 'Informações',
      description: 'Acesse informações sobre o sistema',
    },
  ]

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent>
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h6" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

