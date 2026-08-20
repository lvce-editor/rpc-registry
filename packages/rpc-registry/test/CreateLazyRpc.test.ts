import type { Rpc } from '@lvce-editor/rpc'
import { expect, jest, test } from '@jest/globals'
import { createLazyRpc } from '../src/parts/CreateLazyRpc/CreateLazyRpc.ts'

const createRpc = (invoke: Rpc['invoke'] = async () => undefined): Rpc => {
  return {
    dispose: jest.fn<() => Promise<void>>(async () => {}),
    invoke,
    invokeAndTransfer: async () => undefined,
    send: (): void => {},
  }
}

test('coalesces concurrent launches', async () => {
  const rpc = createRpc(async () => 'ok')
  const factory = jest.fn<() => Promise<Rpc>>(async () => rpc)
  const lazyRpc = createLazyRpc(98_001)
  lazyRpc.setFactory(factory)

  await expect(Promise.all([lazyRpc.invoke('one'), lazyRpc.invoke('two')])).resolves.toEqual(['ok', 'ok'])
  expect(factory).toHaveBeenCalledTimes(1)
})

test('reset disposes the active rpc and relaunches on demand', async () => {
  const first = createRpc(async () => 'first')
  const second = createRpc(async () => 'second')
  let factoryCallCount = 0
  const factory = jest.fn<() => Promise<Rpc>>(async () => (factoryCallCount++ === 0 ? first : second))
  const lazyRpc = createLazyRpc(98_002)
  lazyRpc.setFactory(factory)

  await expect(lazyRpc.invoke('value')).resolves.toBe('first')
  await lazyRpc.reset(new Error('disconnected'))
  await expect(lazyRpc.invoke('value')).resolves.toBe('second')

  expect(first.dispose).toHaveBeenCalledTimes(1)
  expect(factory).toHaveBeenCalledTimes(2)
})

test('reset supersedes a pending launch', async () => {
  let resolve!: (value: Rpc) => void
  // Promise.withResolvers requires Node 22, while this package supports Node 16.
  // eslint-disable-next-line unicorn/prefer-promise-with-resolvers
  const promise = new Promise<Rpc>((resolvePromise) => {
    resolve = resolvePromise
  })
  const stale = createRpc()
  const current = createRpc(async () => 'current')
  let factoryCallCount = 0
  const factory = jest.fn<() => Promise<Rpc>>(() => (factoryCallCount++ === 0 ? promise : Promise.resolve(current)))
  const lazyRpc = createLazyRpc(98_003)
  lazyRpc.setFactory(factory)

  const pendingInvoke = lazyRpc.invoke('value')
  await lazyRpc.reset()
  resolve(stale)

  await expect(pendingInvoke).rejects.toThrow('Lazy RPC launch was superseded')
  await expect(lazyRpc.invoke('value')).resolves.toBe('current')
  expect(stale.dispose).toHaveBeenCalledTimes(1)
})

test('notifies reset listeners', async () => {
  const lazyRpc = createLazyRpc(98_004)
  const listener = jest.fn()
  const unsubscribe = lazyRpc.onDidReset(listener)
  const reason = new Error('worker closed')

  await lazyRpc.reset(reason)
  unsubscribe()
  await lazyRpc.reset(new Error('ignored'))

  expect(listener).toHaveBeenCalledTimes(1)
  expect(listener).toHaveBeenCalledWith(reason)
})
