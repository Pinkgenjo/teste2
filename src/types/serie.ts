export interface Serie {
  id?: number
  titulo: string
  numeroTemporadas: number
  dataLancamentoTemporada: string
  diretor: string
  produtora: string
  categoria: string
  dataAssistiu: string
}

export interface SerieFormData {
  titulo: string
  numeroTemporadas: number
  dataLancamentoTemporada: string
  diretor: string
  produtora: string
  categoria: string
  dataAssistiu: string
}

