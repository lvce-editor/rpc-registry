export interface WidgetLifecycleAttachRequest {
  readonly commands: readonly (readonly any[])[]
  readonly editorUid: number
  readonly instanceId: string
  readonly intentSequence: number
  readonly kind: string
  readonly rendererUid: number
}

export interface WidgetLifecycleRemoveRequest {
  readonly editorUid: number
  readonly instanceId: string
  readonly intentSequence: number
  readonly kind: string
  readonly rendererUid: number
}
