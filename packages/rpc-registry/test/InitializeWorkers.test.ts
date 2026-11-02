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
  PlainMessagePortRpc: {
    create: async (): Promise<Rpc> => ({
      ...rpc,
      invoke: jest.fn((): Promise<never> => new Promise(() => {})),
    }),
  },
  WebWorkerRpcClient: { create: createRenderer },
}))

const RendererWorker = await import('../src/parts/RendererWorker/RendererWorker.ts')
const AuthProcess = await import('../src/parts/AuthProcess/AuthProcess.ts')
const EditorWorker = await import('../src/parts/EditorWorker/EditorWorker.ts')
const ErrorWorker = await import('../src/parts/ErrorWorker/ErrorWorker.ts')
const FileSystemWorker = await import('../src/parts/FileSystemWorker/FileSystemWorker.ts')
const MainAreaWorker = await import('../src/parts/MainAreaWorker/MainAreaWorker.ts')
const ExtensionManagementWorker = await import('../src/parts/ExtensionManagementWorker/ExtensionManagementWorker.ts')
const OpenerWorker = await import('../src/parts/OpenerWorker/OpenerWorker.ts')
const MainProcess = await import('../src/parts/MainProcess/MainProcess.ts')
const DialogWorker = await import('../src/parts/DialogWorker/DialogWorker.ts')
const DragAndDropWorker = await import('../src/parts/DragAndDropWorker/DragAndDropWorker.ts')

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

test('initializes auth process RPC lazily and rejects calls after peer closure', async () => {
  let resolveReceived!: (port: MessagePort) => void
  // Promise.withResolvers requires Node 22, while this package supports Node 16.
  // eslint-disable-next-line unicorn/prefer-promise-with-resolvers
  const received = new Promise<MessagePort>((resolve) => {
    resolveReceived = resolve
  })
  const invokeAndTransfer = jest.fn(async (_method: string, port: MessagePort, _command: string) => resolveReceived(port))
  RendererWorker.set({
    ...rpc,
    invokeAndTransfer,
  })
  await RendererWorker.initializeAuthProcess()
  expect(invokeAndTransfer).not.toHaveBeenCalled()
  const pendingCall = AuthProcess.invoke('test')
  const port = await received
  expect(invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess',
    expect.anything(),
    'HandleMessagePortForAuthProcess.handleMessagePortForAuthProcess',
  )
  port.close()
  await expect(pendingCall).rejects.toThrow('Auth process connection closed')
  await AuthProcess.dispose()
})

test('initializes main process RPC lazily with source id zero', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeMainProcess()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToMainProcess.sendMessagePortToMainProcess', port, 'HandleElectronMessagePort.handleElectronMessagePort', 0)
  await MainProcess.invoke('test')
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

test('initializes file system RPC with source id 0 and registers it', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeFileSystemWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToFileSystemWorker', port, 'FileSystem.handleMessagePort', 0)
  await FileSystemWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes dialog RPC and registers it', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeDialogWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToDialogWorker', port, 'HandleMessagePort.handleMessagePort')
  await DialogWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes drag and drop RPC and registers it', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeDragAndDropWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToRendererProcess', port, 'DragAndDrop.handleMessagePort')
  await DragAndDropWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes error RPC with source id 0 and registers it', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeErrorWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToErrorWorker', port, 'Errors.handleMessagePort', 0)
  await ErrorWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes worker error RPC with the test worker source id', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeErrorWorkerForWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith('SendMessagePortToExtensionHostWorker.sendMessagePortToErrorWorker', port, 'Errors.handleMessagePort', RpcId.TestWorker)
  await ErrorWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes worker main area RPC with the test worker source id', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeMainAreaWorkerForWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMainAreaWorker',
    port,
    'MainArea.handleTestWorkerMessagePort',
    RpcId.TestWorker,
  )
  await MainAreaWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes extension management RPC and registers it', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeExtensionManagementWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker',
    port,
    'Extensions.handleMessagePort',
    RpcId.TestWorker,
  )
  await ExtensionManagementWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test('initializes opener RPC and registers it', async () => {
  RendererWorker.set(rpc)
  await RendererWorker.initializeOpenerWorkerForWorker()
  expect(createEditor).toHaveBeenCalledWith({ commandMap: {}, send: expect.any(Function) })
  const port = {} as MessagePort
  await createEditor.mock.calls[0][0].send(port)
  expect(rpc.invokeAndTransfer).toHaveBeenCalledWith(
    'SendMessagePortToExtensionHostWorker.sendMessagePortToOpenerWorker',
    port,
    'HandleMessagePort.handleMessagePort',
    RpcId.TestWorker,
  )
  await OpenerWorker.invoke('test')
  expect(rpc.invoke).toHaveBeenCalledWith('test')
})

test.each([
  ['file system', RendererWorker.initializeFileSystemWorker],
  ['error', RendererWorker.initializeErrorWorker],
  ['dialog', RendererWorker.initializeDialogWorker],
  ['drag and drop', RendererWorker.initializeDragAndDropWorker],
])('propagates %s initialization failures', async (_name, initialize) => {
  createEditor.mockRejectedValueOnce(new Error('connection failed'))
  await expect(initialize()).rejects.toThrow('connection failed')
})

test.each([
  ['worker error', RendererWorker.initializeErrorWorkerForWorker],
  ['worker main area', RendererWorker.initializeMainAreaWorkerForWorker],
  ['worker opener', RendererWorker.initializeOpenerWorkerForWorker],
])('propagates %s initialization failures', async (_name, initialize) => {
  createEditor.mockRejectedValueOnce(new Error('connection failed'))
  await expect(initialize()).rejects.toThrow('connection failed')
})

test('propagates renderer initialization failures', async () => {
  createRenderer.mockRejectedValueOnce(new Error('connection failed'))
  await expect(RendererWorker.initializeRendererWorkerForWorker({})).rejects.toThrow('connection failed')
})
