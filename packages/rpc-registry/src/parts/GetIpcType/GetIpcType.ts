import { ElectronUtilityProcess, NodeForkedProcess, NodeWorker } from '../IpcType/IpcType.ts'

export const getIpcType = (argv: readonly string[]): number => {
  if (argv.includes('--ipc-type=node-worker')) {
    return NodeWorker
  }
  if (argv.includes('--ipc-type=node-forked-process')) {
    return NodeForkedProcess
  }
  if (argv.includes('--ipc-type=electron-utility-process')) {
    return ElectronUtilityProcess
  }
  throw new Error(`[file-system-process] unknown ipc type`)
}
