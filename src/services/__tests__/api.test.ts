import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { serieService } from '../api'
import { Serie } from '@/types/serie'

vi.mock('axios')
const mockedAxios = axios as any

describe('serieService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getAll', () => {
    it('deve retornar lista de séries', async () => {
      const mockSeries: Serie[] = [
        {
          id: 1,
          titulo: 'Teste',
          numeroTemporadas: 1,
          dataLancamentoTemporada: '2023-01-01',
          diretor: 'Diretor Teste',
          produtora: 'Produtora Teste',
          categoria: 'Drama',
          dataAssistiu: '2023-01-01',
        },
      ]

      mockedAxios.create.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: mockSeries }),
      })

      const result = await serieService.getAll()
      expect(result).toEqual(mockSeries)
    })
  })

  describe('create', () => {
    it('deve criar uma nova série', async () => {
      const newSerie: Omit<Serie, 'id'> = {
        titulo: 'Nova Série',
        numeroTemporadas: 2,
        dataLancamentoTemporada: '2023-01-01',
        diretor: 'Diretor',
        produtora: 'Produtora',
        categoria: 'Ação',
        dataAssistiu: '2023-01-01',
      }

      const createdSerie: Serie = { ...newSerie, id: 1 }

      mockedAxios.create.mockReturnValue({
        post: vi.fn().mockResolvedValue({ data: createdSerie }),
      })

      const result = await serieService.create(newSerie)
      expect(result).toEqual(createdSerie)
    })
  })

  describe('update', () => {
    it('deve atualizar uma série existente', async () => {
      const updatedData: Partial<Serie> = {
        titulo: 'Série Atualizada',
      }

      const updatedSerie: Serie = {
        id: 1,
        titulo: 'Série Atualizada',
        numeroTemporadas: 2,
        dataLancamentoTemporada: '2023-01-01',
        diretor: 'Diretor',
        produtora: 'Produtora',
        categoria: 'Ação',
        dataAssistiu: '2023-01-01',
      }

      mockedAxios.create.mockReturnValue({
        put: vi.fn().mockResolvedValue({ data: updatedSerie }),
      })

      const result = await serieService.update(1, updatedData)
      expect(result).toEqual(updatedSerie)
    })
  })

  describe('delete', () => {
    it('deve deletar uma série', async () => {
      mockedAxios.create.mockReturnValue({
        delete: vi.fn().mockResolvedValue({}),
      })

      await expect(serieService.delete(1)).resolves.not.toThrow()
    })
  })
})

