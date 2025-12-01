'use client'

import { ThemeProvider } from './ThemeProvider'
import { Navbar } from './Navbar'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '64px' }}>
        {children}
      </main>
    </ThemeProvider>
  )
}

