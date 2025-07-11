import type { PositionAtCursor } from '../PositionAtCursor/PositionAtCursor.ts'

export interface EditorWorkerApi {
  readonly 'Editor.getPositionAtCursor': (uid: number) => Promise<PositionAtCursor>
  readonly 'Editor.getWordAt2': (uid: number, rowIndex: number, columnIndex: number) => Promise<string>
  readonly 'Editor.getWordAtOffset2': (uid: number) => Promise<string>
  readonly 'Editor.getWordBefore2': (editorUid: number, rowIndex: number, columnIndex: number) => Promise<string>
  readonly 'Editor.getLines2': (editorUid: number) => Promise<readonly string[]>
  readonly 'Editor.getSelections2': (editorUid: number) => Promise<readonly number[]>
  readonly 'Editor.updateDebugInfo': (key: string) => Promise<void>
}
