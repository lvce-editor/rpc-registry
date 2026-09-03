import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.DialogWorker)

export interface ConfirmPromptOptions {
  readonly cancelMessage?: string
  readonly confirmMessage?: string
  readonly platform?: number
  readonly title?: string
}

export const prompt = async (message: string, options: ConfirmPromptOptions = {}): Promise<boolean> => {
  return invoke('ConfirmPrompt.prompt', message, options)
}
