import { Container, Typography, Box, Paper, Divider } from '@mui/material'
import { Info as InfoIcon } from '@mui/icons-material'

export default function Sobre() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <InfoIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Sobre o Sistema
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" paragraph>
          Este sistema foi desenvolvido para gerenciar séries de televisão,
          permitindo que você cadastre, visualize, edite e exclua informações
          sobre suas séries favoritas.
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Funcionalidades:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Cadastro de Séries:</strong> Adicione novas séries com
              informações como título, número de temporadas, data de lançamento,
              diretor, produtora, categoria e data em que assistiu.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Listagem:</strong> Visualize todas as séries cadastradas
              em uma interface organizada e fácil de navegar.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Edição:</strong> Atualize informações de séries já
              cadastradas.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" paragraph>
              <strong>Exclusão:</strong> Remova séries que não deseja mais
              manter no sistema.
            </Typography>
          </li>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Desenvolvido com Next.js, React, Material-UI e Axios para consumo de
          API REST.
        </Typography>
      </Paper>
    </Container>
  )
}

