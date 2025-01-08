import type { Rpc } from '@lvce-editor/rpc'

export const set: (id: number, rpc: Rpc) => void

export const get: (id: number) => Rpc

export const remove: (id: number) => void
