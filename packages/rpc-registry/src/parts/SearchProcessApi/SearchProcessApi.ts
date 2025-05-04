import type { SearchResult } from '../SearchResult/SearchResult.ts'

export interface SearchProcessApi {
  readonly 'TextSearch.search': (options: any) => Promise<readonly SearchResult[]>
}
