import { expect, test } from '@jest/globals'
import * as Index from '../src/parts/Main/Main.ts'

test('cache worker routes all cache storage commands', async () => {
  const cacheItem = { body: 'body', headers: { 'content-type': 'text/plain' }, status: 200, statusText: 'OK' }
  const bucketOptions = { quota: 1024 }
  const request = new URL('https://example.com/item')
  const headers = [['content-type', 'text/plain']] as const
  using mockRpc = Index.CacheWorker.registerMockRpc({
    'Cache.getCacheStorageItem': (request: string | URL) => (request === '/missing' ? null : cacheItem),
    'Cache.removeCacheStorageItem': () => true,
    'Cache.setCacheStorageItem': () => ({ success: true }),
  })

  await expect(Index.CacheWorker.getCacheStorageItem(request, 'cache', 'bucket', bucketOptions)).resolves.toBe(cacheItem)
  await expect(Index.CacheWorker.getCacheStorageItem('/missing')).resolves.toBeNull()
  await expect(Index.CacheWorker.removeCacheStorageItem(request)).resolves.toBe(true)
  await expect(Index.CacheWorker.setCacheStorageItem(request, 'body', 'cache', headers, 'bucket', bucketOptions)).resolves.toEqual({ success: true })

  expect(mockRpc.invocations).toEqual([
    ['Cache.getCacheStorageItem', request, 'cache', 'bucket', bucketOptions],
    ['Cache.getCacheStorageItem', '/missing', undefined, undefined, undefined],
    ['Cache.removeCacheStorageItem', request, undefined, undefined, undefined],
    ['Cache.setCacheStorageItem', request, 'body', 'cache', headers, 'bucket', bucketOptions],
  ])
})

test('cache worker routes IndexedDB file handle commands', async () => {
  const key = 'handle'
  const handle = { kind: 'directory' }
  const fileHandle = { name: 'root' }
  using mockRpc = Index.CacheWorker.registerMockRpc({
    'IndexedDb.addIndexedDbFileHandle': () => undefined,
    'IndexedDb.getIndexedDbFileHandle': (requestKey: string) => (requestKey === 'missing' ? undefined : fileHandle),
    'IndexedDb.removeIndexedDbFileHandle': () => undefined,
  })

  await expect(Index.CacheWorker.addIndexedDbFileHandle(key, handle, 'database')).resolves.toBeUndefined()
  await expect(Index.CacheWorker.getIndexedDbFileHandle(key)).resolves.toBe(fileHandle)
  await expect(Index.CacheWorker.getIndexedDbFileHandle('missing')).resolves.toBeUndefined()
  await expect(Index.CacheWorker.removeIndexedDbFileHandle(key, 'database')).resolves.toBeUndefined()

  expect(mockRpc.invocations).toEqual([
    ['IndexedDb.addIndexedDbFileHandle', key, handle, 'database'],
    ['IndexedDb.getIndexedDbFileHandle', key, undefined],
    ['IndexedDb.getIndexedDbFileHandle', 'missing', undefined],
    ['IndexedDb.removeIndexedDbFileHandle', key, 'database'],
  ])
})

test('cache worker routes OPFS commands and propagates failures', async () => {
  const writeContent = 'contents'
  using mockRpc = Index.CacheWorker.registerMockRpc({
    'Opfs.readFile': () => 'file contents',
    'Opfs.removeFile': () => undefined,
    'Opfs.writeFile': () => undefined,
  })

  await expect(Index.CacheWorker.readFile('file.txt')).resolves.toBe('file contents')
  await expect(Index.CacheWorker.writeFile('file.txt', writeContent)).resolves.toBeUndefined()
  await expect(Index.CacheWorker.removeFile('file.txt')).resolves.toBeUndefined()

  expect(mockRpc.invocations).toEqual([
    ['Opfs.readFile', 'file.txt'],
    ['Opfs.writeFile', 'file.txt', writeContent],
    ['Opfs.removeFile', 'file.txt'],
  ])
})

test('cache worker has an independent rpc', () => {
  const blob = {} as Blob
  using blobRpc = Index.BlobWorker.registerMockRpc({
    'Blob.blobToBinaryString': () => 'blob',
  })
  using cacheRpc = Index.CacheWorker.registerMockRpc({
    'Opfs.readFile': () => 'cache',
  })

  expect(Index.BlobWorker.invoke('Blob.blobToBinaryString', blob)).toBe('blob')
  expect(Index.CacheWorker.invoke('Opfs.readFile', 'file.txt')).toBe('cache')
  expect(blobRpc.invocations).toEqual([['Blob.blobToBinaryString', blob]])
  expect(cacheRpc.invocations).toEqual([['Opfs.readFile', 'file.txt']])
})

test('cache worker propagates rpc rejections', async () => {
  const error = new Error('storage failed')
  using mockRpc = Index.CacheWorker.registerMockRpc({
    'Opfs.readFile': () => Promise.reject(error),
  })

  await expect(Index.CacheWorker.readFile('missing.txt')).rejects.toBe(error)
  expect(mockRpc.invocations).toEqual([['Opfs.readFile', 'missing.txt']])
})
