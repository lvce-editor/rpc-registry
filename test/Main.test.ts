/* @jest-environment jsdom */
import { expect, test } from '@jest/globals'
import * as Index from '../src/index.ts'

test('index', () => {
  expect(typeof Index.get).toBe('function')
})
