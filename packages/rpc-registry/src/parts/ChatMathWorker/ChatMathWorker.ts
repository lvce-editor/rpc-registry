import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(6007)

export interface MessageMathBlockNode {
  readonly text: string
  readonly type: 'math-block'
}

export interface MessageMathInlineNode {
  readonly displayMode: boolean
  readonly text: string
  readonly type: 'math-inline'
}

export const getMathBlockDom = async (node: MessageMathBlockNode): Promise<any> => {
  return invoke('ChatMath.getMathBlockDom', node)
}

export const getMathInlineDom = async (node: MessageMathInlineNode): Promise<any> => {
  return invoke('ChatMath.getMathInlineDom', node)
}
