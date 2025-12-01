import axios, { AxiosError } from 'axios'
import { Serie } from '@/types/serie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError | any) => {
    // Verifica se é erro de conexão recusada
    const isConnectionRefused = 
      error.code === 'ECONNREFUSED' || 
      error.message?.includes('ERR_CONNECTION_REFUSED') ||
      error.message?.includes('Network Error') ||
      (error.response === undefined && error.request !== undefined)
    
    if (isConnectionRefused) {
      const customError = new Error(
        `Não foi possível conectar à API em ${API_BASE_URL}. Verifique se a API está rodando.`
      ) as any
      customError.isConnectionError = true
      customError.apiUrl = API_BASE_URL
      return Promise.reject(customError)
    }
    
    // Verifica se é erro de timeout
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      const customError = new Error(
        'A requisição demorou muito para responder. Verifique se a API está acessível.'
      ) as any
      customError.isTimeoutError = true
      return Promise.reject(customError)
    }
    
    return Promise.reject(error)
  }
)

export const serieService = {
  // Listar todas as séries
  getAll: async (): Promise<Serie[]> => {
    const response = await api.get<Serie[]>('/series')
    return response.data
  },

  // Buscar série por ID
  getById: async (id: number): Promise<Serie> => {
    const response = await api.get<Serie>(`/series/${id}`)
    return response.data
  },

  // Criar nova série
  create: async (serie: Omit<Serie, 'id'>): Promise<Serie> => {
    const response = await api.post<Serie>('/series', serie)
    return response.data
  },

  // Atualizar série
  update: async (id: number, serie: Partial<Serie>): Promise<Serie> => {
    const response = await api.put<Serie>(`/series/${id}`, serie)
    return response.data
  },

  // Deletar série
  delete: async (id: number): Promise<void> => {
    await api.delete(`/series/${id}`)
  },

  // Buscar séries
  search: async (query: string): Promise<Serie[]> => {
    const response = await api.get<Serie[]>(`/series?search=${query}`)
    return response.data
  },
}

