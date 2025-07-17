import type { FileSystemWorkerApi } from '../FileSystemWorkerApi/FileSystemWorkerApi.ts'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'
import * as RpcId from '../RpcId/RpcId.ts'

export const { invoke, invokeAndTransfer, set, dispose } = RpcFactory.create<FileSystemWorkerApi>(RpcId.FileSystemWorker)

export const remove = async (dirent: string): Promise<void> => {
  return invoke('FileSystem.remove', dirent)
}

export const readDirWithFileTypes = async (uri: string): Promise<readonly any[]> => {
  return invoke('FileSystem.readDirWithFileTypes', uri)
}

export const getPathSeparator = async (root: string): Promise<string> => {
  // @ts-ignore
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
  // @ts-ignore
  return invoke('FileSystem.exists', uri)
}

export const getFolderSize = async (uri: string): Promise<number> => {
  // @ts-ignore
  return invoke('FileSystem.getFolderSize', uri)
}
