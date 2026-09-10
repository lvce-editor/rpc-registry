import type { Rpc } from '@lvce-editor/rpc'
import { beforeEach, expect, jest, test } from '@jest/globals'
import { RpcId } from '@lvce-editor/constants'

const rpc: Rpc = {
  dispose: jest.fn<() => Promise<void>>(async () => {}),
  invoke: jest.fn<Rpc['invoke']>(),
  invokeAndTransfer: jest.fn<Rpc['invokeAndTransfer']>(),
  send: jest.fn(),
}
const createRenderer = jest.fn<(options: { commandMap: object }) => Promise<Rpc>>(async () => rpc)
const createEditor = jest.fn<(options: { commandMap: object; send: (port: MessagePort) => Promise<void> }) => Promise<Rpc>>(async () => rpc)

// This tests transport creation itself, before a registry mock RPC can be registered.
// eslint-disable-next-line jest/no-restricted-jest-methods
jest.unstable_mockModule('@lvce-editor/rpc', () => ({
  createMockRpc: jest.fn(),
  LazyTransferMessagePortRpcParent: { create: createEditor },
  WebWorkerRpcClient: { create: createRenderer },
}))

const RendererWorker = await import('../src/parts/RendererWorker/RendererWorker.ts')
const EditorWorker = await import('../src/parts/EditorWorker/EditorWorker.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

test('initializes renderer RPC with the worker command map and registers it', async () => {
  const commandMap = { ping: (): string => 'pong' }
  await RendererWorker.initializeRendererWorkerForWorker(commandMap)
  expect(createRenderer).toHaveBeenCalledWith({ commandMap })
  await RendererWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test.each([undefined, 9113])('initializes editor RPC with source id %s', async (sourceId) => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeEditorWorker(sourceId)
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToEditorWorker',
    port,
    'HandleMessagePort.handleMessagePort',
    sourceId ?? RpcId.TestWorker,
  )
  await EditorWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('propagates renderer initialization failures', async () => {
  createRenderer.mockRejectedValueOnce(new Error('connection failed'))
  await expect(RendererWorker.initializeRendererWorkerForWorker({})).rejects.toThrow('connection failed')
})
