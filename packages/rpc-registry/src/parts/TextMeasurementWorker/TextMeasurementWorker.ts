import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.IconThemeWorker)

export const measureTextWidth = async (
  text: string,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  isMonoSpaceFont: boolean,
  charWidth: number,
): Promise<number> => {
  return invoke('TextMeasurement.measureTextWidth', text, fontWeight, fontSize, fontFamily, letterSpacing, isMonoSpaceFont, charWidth)
}

export const measureTextWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  isMonoSpaceFont: boolean,
  charWidth: number,
): Promise<readonly number[]> => {
  return invoke('TextMeasurement.measureTextWidths', texts, fontWeight, fontSize, fontFamily, letterSpacing, isMonoSpaceFont, charWidth)
}
