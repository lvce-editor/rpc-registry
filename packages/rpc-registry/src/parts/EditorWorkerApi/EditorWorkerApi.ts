interface PositionAtCursor {
  readonly x: number
  readonly y: number
  readonly rowIndex: number
  readonly columnIndex: number
}

export interface EditorWorkerApi {
  readonly 'Editor.getPositionAtCursor': (uid: number) => Promise<PositionAtCursor>
}
