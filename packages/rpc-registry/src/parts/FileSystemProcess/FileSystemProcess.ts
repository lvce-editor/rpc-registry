import type { MockRpc } from '@lvce-editor/rpc'
import { RpcId } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.FileSystemProcess)

export const remove = async (uri: string): Promise<void> => {
  return invoke('FileSystem.remove', uri)
}

export const readFile = async (uri: string): Promise<string> => {
  return invoke('FileSystem.readFile', uri)
}

export const appendFile = async (uri: string, text: string): Promise<string> => {
  // @ts-ignore
  return invoke('FileSystem.appendFile', uri, text)
}

export const readDirWithFileTypes = async (uri: string): Promise<readonly any[]> => {
  return invoke('FileSystem.readDirWithFileTypes', uri)
}

export const getPathSeparator = async (root: string): Promise<string> => {
  // @ts-ignore
  return invoke('FileSystem.getPathSeparator', root)
}

export const readJson = async (root: string): Promise<any> => {
  // @ts-ignore
  return invoke('FileSystem.readJson', root)
}

export const getRealPath = async (path: string): Promise<string> => {
  // @ts-ignore
  return invoke('FileSystem.getRealPath', path)
}

export const stat = async (path: string): Promise<any> => {
  // @ts-ignore
  return invoke('FileSystem.stat', path)
}

export const writeFile = async (path: string, content: string): Promise<void> => {
  // @ts-ignore
  return invoke('FileSystem.writeFile', path, content)
}

export const mkdir = async (path: string): Promise<void> => {
  // @ts-ignore
  return invoke('FileSystem.mkdir', path)
}

export const rename = async (oldUri: string, newUri: string): Promise<void> => {
  // @ts-ignore
  return invoke('FileSystem.rename', oldUri, newUri)
}

export const copy = async (oldUri: string, newUri: string): Promise<void> => {
  // @ts-ignore
  return invoke('FileSystem.copy', oldUri, newUri)
}

export const getFolderSize = async (uri: string): Promise<void> => {
  // @ts-ignore
  return invoke('FileSystem.getFolderSize', uri)
}

export const exists = async (uri: string): Promise<boolean> => {
  // @ts-ignore
  return invoke('FileSystem.exists', uri)
}

export const registerMockRpc = (commandMap: Record<string, any>): MockRpc => {
  const mockRpc = createMockRpc({ commandMap })
  set(mockRpc)
  return mockRpc
}
