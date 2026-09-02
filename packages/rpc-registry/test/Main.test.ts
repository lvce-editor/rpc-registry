import { expect, test } from '@jest/globals'
import * as Index from '../src/parts/Main/Main.ts'

test('text measurement worker has an independent rpc', () => {
  using iconThemeRpc = Index.IconThemeWorker.registerMockRpc({
    'IconTheme.getIcons': () => ['icon'],
  })
  using textMeasurementRpc = Index.TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 42,
  })

  expect(Index.IconThemeWorker.invoke('IconTheme.getIcons')).toEqual(['icon'])
  expect(Index.TextMeasurementWorker.invoke('TextMeasurement.measureTextBlockHeight', 'hello', 'system-ui', 13, 13, 100)).toBe(42)
  expect(iconThemeRpc.invocations).toEqual([['IconTheme.getIcons']])
  expect(textMeasurementRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'hello', 'system-ui', 13, 13, 100]])
})

test('index', () => {
  expect(typeof Index.FilePermissionProcess.invoke).toBe('function')
  expect(typeof Index.FindWidgetWorker.invoke).toBe('function')
  expect(typeof Index.FindWidgetWorker.createInstance).toBe('function')
  expect(typeof Index.FindWidgetWorker.disposeInstance).toBe('function')
  expect(typeof Index.FindWidgetWorker.reset).toBe('function')
  expect(typeof Index.MainAreaWorker.registerMockRpc).toBe('function')
  expect(typeof Index.SyntaxHighlightingWorker.registerMockRpc).toBe('function')
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

test('showMessageBox', async () => {
  using mockMainProcessRpc = Index.MainProcess.registerMockRpc({
    'ElectronDialog.showMessageBox'() {
      return 1
    },
  })
  const options: Index.MainProcess.ElectronMessageBoxOptions = {
    buttons: ['Cancel', 'Continue'],
    defaultId: 1,
    detail: 'Unsaved changes will be lost.',
    message: 'Continue?',
    productName: 'Lvce Editor',
    title: 'Confirm',
    type: 'question',
    windowId: 12,
  }

  await expect(Index.MainProcess.showMessageBox(options)).resolves.toBe(1)

  expect(mockMainProcessRpc.invocations).toEqual([['ElectronDialog.showMessageBox', options]])
})

test('sendMessagePortToDragAndDropWorker', async () => {
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToDragAndDropWorker'() {},
  })
  const port = {} as MessagePort

  await Index.RendererWorker.sendMessagePortToDragAndDropWorker(port)

  expect(mockRendererRpc.invocations).toEqual([['SendMessagePortToExtensionHostWorker.sendMessagePortToDragAndDropWorker', port, 'DragAndDrop.handleMessagePort']])
})

test('sendMessagePortToMainAreaWorker', async () => {
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToMainAreaWorker'() {},
  })
  const port = {} as MessagePort

  await Index.RendererWorker.sendMessagePortToMainAreaWorker(port, Index.RpcId.TestWorker)

  expect(mockRendererRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToMainAreaWorker', port, 'MainArea.handleTestWorkerMessagePort', Index.RpcId.TestWorker],
  ])
})

test('getDroppedItems', async () => {
  using mockDragAndDropRpc = Index.DragAndDropWorker.registerMockRpc({
    'DragAndDrop.getDroppedItems'() {
      return { files: [], strings: ['text'], uris: ['file:///test.txt'] }
    },
  })

  await expect(Index.DragAndDropWorker.getDroppedItems([1, 2], true)).resolves.toEqual({
    files: [],
    strings: ['text'],
    uris: ['file:///test.txt'],
  })
  expect(mockDragAndDropRpc.invocations).toEqual([['DragAndDrop.getDroppedItems', [1, 2], true]])
})

test('getDropData', async () => {
  const options: Index.RendererWorker.DropDataOptions = {
    formats: ['string'],
    includeElectronFilePaths: false,
  }
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'DropData.get'() {
      return [{ index: 0, kind: 'string', type: 'text/plain', value: 'hello' }]
    },
  })

  await expect(Index.RendererWorker.getDropData(7, options)).resolves.toEqual([{ index: 0, kind: 'string', type: 'text/plain', value: 'hello' }])
  expect(mockRendererRpc.invocations).toEqual([['DropData.get', 7, options]])
})

test('new drag and drop session methods', async () => {
  const fileHandle = { kind: 'file', name: 'notes.txt' }
  using mockDragAndDropRpc = Index.DragAndDropWorker.registerMockRpc({
    'DragAndDrop.discardDrop'() {},
    'DragAndDrop.getDroppedFileHandlesByDropId'() {
      return [fileHandle]
    },
    'DragAndDrop.getDroppedItemsByDropId'() {
      return { files: [], strings: [], uris: ['file:///notes.txt'] }
    },
    'DragAndDrop.getDroppedUrisByDropId'() {
      return ['file:///notes.txt']
    },
  })

  await expect(Index.DragAndDropWorker.getDroppedItemsByDropId(3, true)).resolves.toEqual({
    files: [],
    strings: [],
    uris: ['file:///notes.txt'],
  })
  await expect(Index.DragAndDropWorker.getDroppedUrisByDropId(4, false)).resolves.toEqual(['file:///notes.txt'])
  await expect(Index.DragAndDropWorker.getDroppedFileHandlesByDropId(5)).resolves.toEqual([fileHandle])
  await Index.DragAndDropWorker.discardDrop(6)
  expect(mockDragAndDropRpc.invocations).toEqual([
    ['DragAndDrop.getDroppedItemsByDropId', 3, true],
    ['DragAndDrop.getDroppedUrisByDropId', 4, false],
    ['DragAndDrop.getDroppedFileHandlesByDropId', 5],
    ['DragAndDrop.discardDrop', 6],
  ])
})

test('getSettingsItems2', async () => {
  const expected: readonly Index.SettingsWorker.SettingItem[] = [
    {
      category: 'Text Editor',
      description: 'Controls the font size.',
      heading: 'Font Size',
      id: 'editor.fontSize',
      maximum: 100,
      minimum: 6,
      type: 2,
      validationId: 1,
      value: 15,
    },
  ]
  using mockSettingsRpc = Index.SettingsWorker.registerMockRpc({
    'SettingsWorker.getSettingsItems2'() {
      return expected
    },
  })

  await expect(Index.SettingsWorker.getSettingsItems2()).resolves.toBe(expected)
  expect(mockSettingsRpc.invocations).toEqual([['SettingsWorker.getSettingsItems2']])
})

test('getTabs', async () => {
  const expected: readonly Index.SettingsWorker.Tab[] = [
    {
      id: 'text-editor',
      label: 'Text Editor',
      selected: true,
    },
  ]
  using mockSettingsRpc = Index.SettingsWorker.registerMockRpc({
    'SettingsWorker.getTabs'() {
      return expected
    },
  })

  await expect(Index.SettingsWorker.getTabs()).resolves.toBe(expected)
  expect(mockSettingsRpc.invocations).toEqual([['SettingsWorker.getTabs']])
})

test('deprecated editor worker extension host port forwards to extension management worker', async () => {
  using mockEditorRpc = Index.EditorWorker.registerMockRpc({
    'SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker'() {},
  })
  const port = {} as MessagePort

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  await Index.EditorWorker.sendMessagePortToExtensionHostWorker(port)

  expect(mockEditorRpc.invocations).toEqual([['SendMessagePortToExtensionManagementWorker.sendMessagePortToExtensionManagementWorker', port, 0]])
})

test('deprecated renderer worker extension host port forwards to extension management worker', async () => {
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker'() {},
  })
  const port = {} as MessagePort

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  await Index.RendererWorker.sendMessagePortToExtensionHostWorker(port, Index.RpcId.EditorWorker)

  expect(mockRendererRpc.invocations).toEqual([
    ['SendMessagePortToExtensionHostWorker.sendMessagePortToExtensionManagementWorker', port, 'Extensions.handleMessagePort', Index.RpcId.EditorWorker],
  ])
})

test('openUri', async () => {
  using mockRendererRpc = Index.RendererWorker.registerMockRpc({
    'Main.openUri'() {},
  })

  await Index.RendererWorker.openUri('file:///workspace/App.tsx', true, {
    startColumnIndex: 9,
    startRowIndex: 2,
  })

  expect(mockRendererRpc.invocations).toEqual([
    [
      'Main.openUri',
      {
        focus: true,
        startColumnIndex: 9,
        startRowIndex: 2,
        uri: 'file:///workspace/App.tsx',
      },
    ],
  ])
})
