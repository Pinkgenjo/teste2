import { Container, Typography, Box, Paper } from '@mui/material'
import { WelcomeCard } from '@/components/WelcomeCard'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bem-vindo ao Sistema de Séries
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Gerencie suas séries favoritas de forma fácil e intuitiva
        </Typography>
      </Box>
      <WelcomeCard />
    </Container>
  )
}

