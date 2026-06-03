import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.ErrorWorker)

export interface PrettyError {
  readonly codeFrame: string | undefined
  readonly message: string | undefined
  readonly stack: string | undefined
}

export const prepare = async (error: any): Promise<PrettyError> => {
  return invoke('Errors.prepare', error)
}
