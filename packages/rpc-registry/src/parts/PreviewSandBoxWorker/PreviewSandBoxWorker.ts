import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(3212)

export const terminate = async (): Promise<void> => {
  return invoke('SandBox.terminate')
}

export const handleInput = async (uid: number, hdId: string, value: string): Promise<void> => {
  return invoke('SandBox.handleInput', uid, hdId, value)
}

export const handleKeyDown = async (uid: number, hdId: string, key: string): Promise<void> => {
  return invoke('SandBox.handleKeyDown', uid, hdId, key)
}

export const handleKeyUp = async (uid: number, hdId: string, key: string): Promise<void> => {
  return invoke('SandBox.handleKeyUp', uid, hdId, key)
}

export const initialize = async (uid: number, content: string, scripts: readonly string[]): Promise<void> => {
  return invoke('SandBox.initialize', uid, content, scripts)
}
