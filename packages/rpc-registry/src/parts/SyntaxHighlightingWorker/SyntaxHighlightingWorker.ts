import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.MarkdownWorker)

export const tokenizeIncremental = (uid: number, languageId: string, oldLine: string, newLine: string, rowIndex: number, minLineY: number): Promise<readonly any[]> => {
  return invoke('TokenizeIncremental.tokenizeIncremental', uid, languageId, oldLine, newLine, rowIndex, minLineY)
}

export const getTokensViewPort = (slimEditor: any, startLineIndex: number, endLineIndex: number, hasLinesToSend: boolean, id: any, linesToSend: any): Promise<readonly any[]> => {
  return invoke('GetTokensViewport.getTokensViewport', slimEditor, startLineIndex, endLineIndex, hasLinesToSend, id, linesToSend)
}
