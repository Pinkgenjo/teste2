'use client'

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { label: 'Início', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Cadastrar Série', path: '/cadastro' },
    { label: 'Listar Séries', path: '/listagem' },
  ]

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Séries
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              href={item.path}
              variant={pathname === item.path ? 'outlined' : 'text'}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

