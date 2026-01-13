import type { MockRpc } from '@lvce-editor/rpc'
import { RpcId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.FileSystemWorker)

export const remove = async (dirent: string): Promise<void> => {
  return invoke('FileSystem.remove', dirent)
}

export const readDirWithFileTypes = async (uri: string): Promise<readonly any[]> => {
  return invoke('FileSystem.readDirWithFileTypes', uri)
}

export const getPathSeparator = async (root: string): Promise<string> => {
  return invoke('FileSystem.getPathSeparator', root)
}

export const getRealPath = async (path: string): Promise<string> => {
  return invoke('FileSystem.getRealPath', path)
}

export const stat = async (dirent: string): Promise<any> => {
  return invoke('FileSystem.stat', dirent)
}

export const createFile = async (uri: string): Promise<void> => {
  return invoke('FileSystem.writeFile', uri, '')
}

export const readFile = async (uri: string): Promise<string> => {
  return invoke('FileSystem.readFile', uri)
}

export const writeFile = async (uri: string, content: string): Promise<void> => {
  return invoke('FileSystem.writeFile', uri, content)
}

export const mkdir = async (uri: string): Promise<void> => {
  return invoke('FileSystem.mkdir', uri)
}

export const rename = async (oldUri: string, newUri: string): Promise<void> => {
  return invoke('FileSystem.rename', oldUri, newUri)
}

export const copy = async (oldUri: string, newUri: string): Promise<void> => {
  return invoke('FileSystem.copy', oldUri, newUri)
}

export const exists = async (uri: string): Promise<boolean> => {
  return invoke('FileSystem.exists', uri)
}

export const getFolderSize = async (uri: string): Promise<number> => {
  return invoke('FileSystem.getFolderSize', uri)
}

export const readFileAsBlob = async (uri: string): Promise<Blob> => {
  return invoke('FileSystem.readFileAsBlob', uri)
}

export const appendFile = async (uri: string, text: string): Promise<string> => {
  return invoke('FileSystem.appendFile', uri, text)
}

export const watchFile = async (watchId: number, uri: string, rpcId: number): Promise<void> => {
  await invoke('FileSystem.watchFile', watchId, uri, rpcId)
}

export const unwatchFile = async (watchId: number): Promise<void> => {
  await invoke('FileSystem.unwatchFile', watchId)
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
