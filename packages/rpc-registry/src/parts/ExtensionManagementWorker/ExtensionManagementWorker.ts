import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ExtensionManagementWorker)

export interface TextDocument {
  readonly documentId: number
  readonly languageId: string
  readonly text: string
  readonly uri: string
}

export const executeCompletionProvider = (textDocument: TextDocument, offset: number, applicationId?: string): Promise<readonly unknown[]> => {
  if (applicationId !== undefined) {
    return invoke('Extensions.invokeForApplication', applicationId, 'Extensions.executeCompletionProvider', textDocument, offset)
  }
  return invoke('Extensions.executeCompletionProvider', textDocument, offset)
}

export const executeResolveCompletionItemProvider = <TCompletionItem extends object>(
  textDocument: TextDocument,
  offset: number,
  name: string,
  completionItem: TCompletionItem,
  applicationId?: string,
): Promise<unknown> => {
  if (applicationId !== undefined) {
    return invoke('Extensions.invokeForApplication', applicationId, 'Extensions.executeResolveCompletionItemProvider', textDocument, offset, name, completionItem)
  }
  return invoke('Extensions.executeResolveCompletionItemProvider', textDocument, offset, name, completionItem)
}

export const enable = (id: string): Promise<void> => {
  return invoke(`Extensions.enable`, id)
}

export const enable2 = (id: string, platform: number): Promise<void> => {
  return invoke(`Extensions.enable2`, id, platform)
}

export const disable = (id: string): Promise<void> => {
  return invoke(`Extensions.disable`, id)
}

export const disable2 = (id: string, platform: number): Promise<void> => {
  return invoke(`Extensions.disable2`, id, platform)
}

export const disableWorkspace = (id: string): Promise<void> => {
  return invoke('Extensions.disableWorkspace', id)
}

export const getExtension = (id: string): Promise<any> => {
  return invoke(`Extensions.getExtension`, id)
}

export const getLanguages = (platform: number, assetDir: string): Promise<any> => {
  return invoke('Extensions.getLanguages', platform, assetDir)
}

export const install = (id: string): Promise<void> => {
  return invoke(`Extensions.install`, id)
}

export const uninstall = (id: string): Promise<void> => {
  return invoke(`Extensions.uninstall`, id)
}

export const invalidateExtensionsCache = (): Promise<void> => {
  return invoke(`Extensions.invalidateExtensionsCache`)
}

export const getRunningExtensions = async (assetDir: string, platform: number): Promise<readonly any[]> => {
  return invoke('Extensions.getRunningExtensions', assetDir, platform)
}

export const enableWorkspace = (id: string): Promise<void> => {
  return invoke('Extensions.enableWorkspace', id)
}

export const getAllExtensions = (assetDir: string, platform: number): Promise<readonly unknown[]> => {
  return invoke('Extensions.getAllExtensions', assetDir, platform)
}
