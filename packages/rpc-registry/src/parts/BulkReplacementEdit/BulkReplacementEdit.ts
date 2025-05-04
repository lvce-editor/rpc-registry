import type { TextEdit } from '../TextEdit/TextEdit.ts'

export interface BulkReplacementEdit {
  readonly uri: string
  readonly changes: readonly TextEdit[]
}
