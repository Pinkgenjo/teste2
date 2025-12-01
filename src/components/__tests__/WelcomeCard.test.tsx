import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WelcomeCard } from '../WelcomeCard'
import { ThemeProvider } from '../ThemeProvider'

describe('WelcomeCard', () => {
  it('deve renderizar o componente corretamente', () => {
    render(
      <ThemeProvider>
        <WelcomeCard />
      </ThemeProvider>
    )

    expect(screen.getByText('Cadastrar Séries')).toBeInTheDocument()
    expect(screen.getByText('Listar Séries')).toBeInTheDocument()
    expect(screen.getByText('Gerenciar')).toBeInTheDocument()
    expect(screen.getByText('Informações')).toBeInTheDocument()
  })

  it('deve exibir todas as descrições das funcionalidades', () => {
    render(
      <ThemeProvider>
        <WelcomeCard />
      </ThemeProvider>
    )

    expect(
      screen.getByText(/Adicione novas séries com todas as informações importantes/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Visualize todas as séries cadastradas e gerencie-as/i)
    ).toBeInTheDocument()
  })
})

