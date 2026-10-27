import { expect, test } from '@jest/globals'
import * as Index from '../src/parts/Main/Main.ts'

test('text measurement worker routes text block height commands', async () => {
  using mockRpc = Index.TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => 42,
  })

  await expect(Index.TextMeasurementWorker.measureTextBlockHeight('hello world', 'Arial', 16, 24, 80)).resolves.toBe(42)
  await expect(Index.TextMeasurementWorker.measureTextBlockHeight('hello world', 'Arial', 16, '1.5em', 80)).resolves.toBe(42)

  expect(mockRpc.invocations).toEqual([
    ['TextMeasurement.measureTextBlockHeight', 'hello world', 'Arial', 16, 24, 80],
    ['TextMeasurement.measureTextBlockHeight', 'hello world', 'Arial', 16, '1.5em', 80],
  ])
})

test('text measurement worker propagates text block height failures', async () => {
  const error = new Error('measurement failed')
  using mockRpc = Index.TextMeasurementWorker.registerMockRpc({
    'TextMeasurement.measureTextBlockHeight': () => Promise.reject(error),
  })

  await expect(Index.TextMeasurementWorker.measureTextBlockHeight('hello world', 'Arial', 16, 24, 80)).rejects.toBe(error)
  expect(mockRpc.invocations).toEqual([['TextMeasurement.measureTextBlockHeight', 'hello world', 'Arial', 16, 24, 80]])
})
