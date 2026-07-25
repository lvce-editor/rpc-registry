import { expect, test } from '@jest/globals'
import * as Index from '../src/parts/Main/Main.ts'

test('index', () => {
  expect(typeof Index.FilePermissionProcess.invoke).toBe('function')
  expect(typeof Index.FindWidgetWorker.invoke).toBe('function')
  expect(typeof Index.FindWidgetWorker.createInstance).toBe('function')
  expect(typeof Index.FindWidgetWorker.disposeInstance).toBe('function')
  expect(typeof Index.FindWidgetWorker.reset).toBe('function')
  expect(typeof Index.get).toBe('function')
})

test('sendMessagePortToFilePermissionProcess', async () => {
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess'() {},
  })
  const port = {} as MessagePort

  await Index.RendererWorker.sendMessagePortToFilePermissionProcess(port, Index.RpcId.DialogWorker)

  expect(mockRendererRpc.invocations).toEqual([
    [
      'SendMessagePortToExtensionHostWorker.sendMessagePortToSharedProcess',
      port,
      'HandleMessagePortForFilePermissionProcess.handleMessagePortForFilePermissionProcess',
      Index.RpcId.DialogWorker,
    ],
  ])
})

test('sendMessagePortToDialogWorker', async () => {
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToDialogWorker'() {},
  })
  const port = {} as MessagePort

  await Index.RendererWorker.sendMessagePortToDialogWorker(port)

  expect(mockRendererRpc.invocations).toEqual([['SendMessagePortToExtensionHostWorker.sendMessagePortToDialogWorker', port, 'HandleMessagePort.handleMessagePort']])
})
