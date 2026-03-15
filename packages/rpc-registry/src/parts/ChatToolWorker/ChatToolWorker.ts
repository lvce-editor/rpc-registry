import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ChatToolWorker)

export type ChatTool = {
  readonly type: 'function'
  readonly function: {
    readonly name: string
    readonly description: string
    readonly parameters: {
      readonly type: 'object'
      readonly properties: Record<string, unknown>
      readonly required?: readonly string[]
      readonly additionalProperties: boolean
    }
  }
}

export type ExecuteToolOptions = {
  readonly assetDir: string
  readonly platform: number
}

export const execute = async (name: string, rawArguments: unknown, options: ExecuteToolOptions): Promise<any> => {
  return invoke('ChatTool.execute', name, rawArguments, options)
}

export const getTools = async (): Promise<readonly ChatTool[]> => {
  return invoke('ChatTool.getTools')
}
