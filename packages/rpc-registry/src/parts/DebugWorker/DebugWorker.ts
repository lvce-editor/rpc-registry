import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.DebugWorker)

export interface DebugHighlight {
  readonly columnIndex: number
  readonly rowIndex: number
  readonly uri: string
}

export const getDebugHighlights = async (debugId: number): Promise<readonly DebugHighlight[]> => {
  return invoke('RunAndDebug.getHighlight', debugId)
}
