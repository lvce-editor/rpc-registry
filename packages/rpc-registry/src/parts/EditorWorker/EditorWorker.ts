import type { MockRpc } from '@lvce-editor/rpc'
import { RpcId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import type { Change } from '../Change/Change.ts'
import type { PositionAtCursor } from '../PositionAtCursor/PositionAtCursor.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.EditorWorker)

export const sendMessagePortToExtensionHostWorker = async (port: MessagePort): Promise<void> => {
  const command = 'HandleMessagePort.handleMessagePort2'
  await invokeAndTransfer(
    // @ts-ignore
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionHostWorker',
    port,
    command,
    0, // TODO
  )
}

// TODO add tests for this
export const activateByEvent = async (event: string): Promise<void> => {
  // @ts-ignore
  await invoke('ActivateByEvent.activateByEvent', event)
}

export const applyEdit = async (editorUid: number, changes: readonly Change[]): Promise<void> => {
  // @ts-ignore
  await invoke('Editor.applyEdit2', editorUid, changes)
}

export const applyDocumentEdits = async (editorUid: number, changes: readonly Change[]): Promise<void> => {
  // @ts-ignore
  await invoke('Editor.applyDocumentEdits', editorUid, changes)
}

export const applyWorkspaceEdit = async (editorUid: number, changes: readonly any[]): Promise<void> => {
  // @ts-ignore
  await invoke('Editor.applyWorkspaceEdit', editorUid, changes)
}

export const closeWidget = async (editorUid: number, widgetId: number, widgetName: string, focusId: number): Promise<void> => {
  // @ts-ignore
  await invoke('Editor.closeWidget2', editorUid, widgetId, widgetName, focusId)
}

export const getWordAt = async (uid: number, rowIndex: number, columnIndex: number): Promise<string> => {
  // @ts-ignore
  const word = await invoke('Editor.getWordAt2', uid, rowIndex, columnIndex)
  return word
}

export const getLines = async (editorUid: number): Promise<readonly string[]> => {
  const lines = await invoke('Editor.getLines2', editorUid)
  return lines
}

export const getPositionAtCursor = async (parentUid: number): Promise<PositionAtCursor> => {
  const position = await invoke('Editor.getPositionAtCursor', parentUid)
  return position
}

export const getOffsetAtCursor = async (editorId: number): Promise<number> => {
  // @ts-ignore
  return await invoke('Editor.getOffsetAtCursor', editorId)
}

export const getSelections = async (editorUid: number): Promise<readonly number[]> => {
  const selections = await invoke('Editor.getSelections2', editorUid)
  return selections
}

export const getWordAtOffset2 = async (editorUid: number): Promise<string> => {
  return invoke('Editor.getWordAtOffset2', editorUid)
}

export const closeFind2 = async (editorUid: number): Promise<void> => {
  return invoke('Editor.closeFind2', editorUid)
}

export const getWordBefore = async (editorUid: number, rowIndex: number, columnIndex: number): Promise<string> => {
  return invoke('Editor.getWordBefore2', editorUid, rowIndex, columnIndex)
}

export const updateDebugInfo = async (info: any): Promise<void> => {
  await invoke('Editor.updateDebugInfo', info)
}

export const getUri = async (editorUid: number): Promise<string> => {
  // @ts-ignore
  return invoke('Editor.getUri', editorUid)
}

export const getLanguageId = async (editorUid: number): Promise<string> => {
  // @ts-ignore
  return invoke('Editor.getLanguageId', editorUid)
}

export const getProblems = async (): Promise<readonly any[]> => {
  // @ts-ignore
  return invoke('Editor.getProblems')
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
