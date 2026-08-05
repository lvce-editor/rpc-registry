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

export const getDroppedItems = async (itemIds: readonly number[], isElectron: boolean): Promise<DroppedItems> => {
  return invoke('DragAndDrop.getDroppedItems', itemIds, isElectron)
}
