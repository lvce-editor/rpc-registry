import { expect, test } from '@jest/globals'
import * as Index from '../src/parts/Main/Main.ts'

test('index', () => {
  expect(typeof Index.get).toBe('function')
})
