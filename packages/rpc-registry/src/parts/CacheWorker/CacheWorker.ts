import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(19_001)

export interface StorageBucketOptions {
  readonly expires?: number
  readonly quota?: number
}

type CacheHeaders = Readonly<Record<string, string>> | Readonly<Headers> | readonly (readonly [string, string])[]
type CacheRequest = string | Readonly<URL> | Readonly<Request>

export interface CacheStorageItem {
  readonly body: string
  readonly headers: Readonly<Record<string, string>>
  readonly status: number
  readonly statusText: string
}

export type CacheStorageWriteResult = { readonly success: true } | { readonly success: false; readonly errorCode: 'CACHE_STORAGE_WRITE_FAILED'; readonly errorMessage: string }

type DatabaseKey = string | number | Readonly<Date> | Readonly<ArrayBuffer> | Readonly<ArrayBufferView<ArrayBuffer>> | readonly DatabaseKey[]

export const getCacheStorageItem = async (
  request: CacheRequest,
  cacheName?: string,
  bucketName?: string,
  bucketOptions?: Readonly<StorageBucketOptions>,
): Promise<CacheStorageItem | null> => {
  return invoke('Cache.getCacheStorageItem', request, cacheName, bucketName, bucketOptions)
}

export const removeCacheStorageItem = async (request: CacheRequest, cacheName?: string, bucketName?: string, bucketOptions?: Readonly<StorageBucketOptions>): Promise<boolean> => {
  return invoke('Cache.removeCacheStorageItem', request, cacheName, bucketName, bucketOptions)
}

export const setCacheStorageItem = async (
  request: CacheRequest,
  value: BodyInit,
  cacheName?: string,
  headers?: Readonly<CacheHeaders>,
  bucketName?: string,
  bucketOptions?: Readonly<StorageBucketOptions>,
): Promise<CacheStorageWriteResult> => {
  return invoke('Cache.setCacheStorageItem', request, value, cacheName, headers, bucketName, bucketOptions)
}

export const addIndexedDbFileHandle = async (key: DatabaseKey, handle: unknown, databaseName?: string): Promise<void> => {
  return invoke('IndexedDb.addIndexedDbFileHandle', key, handle, databaseName)
}

export const getIndexedDbFileHandle = async (key: DatabaseKey, databaseName?: string): Promise<unknown> => {
  return invoke('IndexedDb.getIndexedDbFileHandle', key, databaseName)
}

export const removeIndexedDbFileHandle = async (key: DatabaseKey, databaseName?: string): Promise<void> => {
  return invoke('IndexedDb.removeIndexedDbFileHandle', key, databaseName)
}

export const readFile = async (name: string): Promise<string> => {
  return invoke('Opfs.readFile', name)
}

export const writeFile = async (name: string, content: FileSystemWriteChunkType): Promise<void> => {
  return invoke('Opfs.writeFile', name, content)
}

export const removeFile = async (name: string): Promise<void> => {
  return invoke('Opfs.removeFile', name)
}
