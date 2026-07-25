import { RpcId } from '@lvce-editor/constants'
import { createLazyRpc } from '../CreateLazyRpc/CreateLazyRpc.ts'

const rpc = createLazyRpc(RpcId.FindWidgetWorker)

export const { dispose, invoke, invokeAndTransfer, onDidReset, reset, setFactory } = rpc

export const createInstance = async (instanceId: string, rendererUid: number, x: number, y: number, width: number, height: number, editorUid: number): Promise<void> => {
  await invoke('FindWidget.createInstance', instanceId, rendererUid, x, y, width, height, editorUid)
}

export const loadContentInstance = async (instanceId: string): Promise<void> => {
  await invoke('FindWidget.loadContentInstance', instanceId)
}

export const diffInstance = async (instanceId: string): Promise<readonly number[]> => {
  return invoke('FindWidget.diffInstance', instanceId)
}

export const renderInstance = async (instanceId: string, diffResult: readonly number[]): Promise<readonly (readonly any[])[]> => {
  return invoke('FindWidget.renderInstance', instanceId, diffResult)
}

export const disposeInstance = async (instanceId: string): Promise<void> => {
  await invoke('FindWidget.disposeInstance', instanceId)
}
