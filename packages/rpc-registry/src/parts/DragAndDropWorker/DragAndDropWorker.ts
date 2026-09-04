import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export interface DroppedFile {
  readonly handle: FileSystemHandle | undefined
  readonly kind: 'directory' | 'file'
  readonly name: string
  readonly path: string
  readonly uri: string
}

export interface DroppedItems {
  readonly files: readonly DroppedFile[]
  readonly strings: readonly string[]
  readonly uris: readonly string[]
}

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.DragAndDropWorker)

export const getDroppedItemsByDropId = async (dropId: number, isElectron: boolean): Promise<DroppedItems> => {
  return invoke('DragAndDrop.getDroppedItemsByDropId', dropId, isElectron)
}

export const getDroppedUrisByDropId = async (dropId: number, isElectron: boolean): Promise<readonly string[]> => {
  return invoke('DragAndDrop.getDroppedUrisByDropId', dropId, isElectron)
}

export const getDroppedFilesByDropId = async (dropId: number): Promise<readonly File[]> => {
  return invoke('DragAndDrop.getDroppedFilesByDropId', dropId)
}

export const discardDrop = async (dropId: number): Promise<void> => {
  await invoke('DragAndDrop.discardDrop', dropId)
}
