import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(19_000)

export const base64StringToBlob = async (base64String: string, type: string): Promise<Blob> => {
  return invoke('Blob.base64StringToBlob', base64String, type)
}

export const binaryStringToBlob = async (binaryString: string, type: string): Promise<Blob> => {
  return invoke('Blob.binaryStringToBlob', binaryString, type)
}

export const blobToBinaryString = async (blob: Blob): Promise<string> => {
  return invoke('Blob.blobToBinaryString', blob)
}

export const handleMessagePort = async (port: MessagePort): Promise<void> => {
  return invokeAndTransfer('Blob.handleMessagePort', port)
}

export const terminate = async (): Promise<void> => {
  return invoke('Blob.terminate')
}
