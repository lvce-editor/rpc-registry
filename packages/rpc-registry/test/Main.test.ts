import { expect, test } from '@jest/globals'
import * as Index from '../src/parts/Main/Main.ts'

test('index', () => {
  expect(typeof Index.FilePermissionProcess.invoke).toBe('function')
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
