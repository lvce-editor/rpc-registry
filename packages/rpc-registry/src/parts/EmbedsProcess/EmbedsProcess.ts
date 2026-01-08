import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, set } = RpcFactory.create(RpcId.EmbedsProcess)

export const createWebContentsView = async (restoreId: number, fallThroughKeyBindings: any): Promise<any> => {
  return invoke('ElectronWebContentsView.createWebContentsView', restoreId, fallThroughKeyBindings)
}

export const disposeWebContentsView = async (id: number): Promise<void> => {
  return invoke('ElectronWebContentsView.disposeWebContentsView', id)
}

export const resizeWebContentsView = async (id: number, x: number, y: number, width: number, height: number): Promise<void> => {
  return invoke('ElectronWebContentsView.resizeWebContentsView', id, x, y, width, height)
}

export const setIframeSrcFallback = async (id: number, error: any): Promise<void> => {
  return invoke('ElectronWebContentsView.setIframeSrcFallback', id, error)
}

export const focus = async (id: number): Promise<void> => {
  return invoke('ElectronWebContentsView.focus', id)
}

export const openDevtools = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.openDevtools', id)
}

export const reload = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.reload', id)
}
export const show = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.show', id)
}

export const hide = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.hide', id)
}

export const forward = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.forward', id)
}

export const backward = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.backward', id)
}

export const getDomTree = (id: string): Promise<void> => {
  return invoke('ElectronWebContentsView.getDomTree', id)
}

export const insertCss = (id: string, css: string): Promise<void> => {
  return invoke('ElectronWebContentsView.insertCss', id, css)
}

export const insertJavaScript = (id: string, code: string): Promise<void> => {
  return invoke('ElectronWebContentsView.insertJavaScript', id, code)
}

export const inspectElement = (id: string, x: number, y: number): Promise<void> => {
  return invoke('ElectronWebContentsView.inspectElement', id, x, y)
}

export const copyImageAt = (id: string, x: number, y: number): Promise<void> => {
  return invoke('ElectronWebContentsView.copyImageAt', id, x, y)
}
