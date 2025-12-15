import type { Rpc } from '@lvce-editor/rpc'

const rpcs: Record<number, Rpc> = Object.create(null)

export const set = (id: number, rpc: Rpc): void => {
  if (rpcs[id]) {
    throw new Error(`rpc with id ${id} is already registered`)
  }
  rpcs[id] = rpc
}

export const get = (id: number): Rpc => {
  return rpcs[id]
}

export const remove = (id: number): void => {
  delete rpcs[id]
}
