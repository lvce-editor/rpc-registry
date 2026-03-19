import { RpcId } from '@lvce-editor/constants'
import * as RpcFactory from '../RpcFactory/RpcFactory.ts'

export const { dispose, invoke, invokeAndTransfer, registerMockRpc, set } = RpcFactory.create(RpcId.ChatStorageWorker)

export const save = async (options: any): Promise<any> => {
  return invoke('ChatStorage.save', options)
}

export const get = async (options: any): Promise<any> => {
  return invoke('ChatStorage.get', options)
}

export type ChatToolCallStatus = 'error' | 'not-found' | 'success'

export interface ChatToolCall {
  readonly arguments: string
  readonly errorMessage?: string
  readonly errorStack?: string
  readonly id?: string
  readonly name: string
  readonly result?: string
  readonly status?: ChatToolCallStatus
}

export interface ChatMessage {
  readonly id: string
  readonly inProgress?: boolean
  readonly role: 'user' | 'assistant'
  readonly text: string
  readonly time: string
  readonly toolCalls?: readonly ChatToolCall[]
}

interface ChatViewEventBase {
  readonly sessionId: string
  readonly timestamp: string
}

export interface ChatSessionCreatedEvent extends ChatViewEventBase {
  readonly title: string
  readonly type: 'chat-session-created'
}

export interface ChatSessionDeletedEvent extends ChatViewEventBase {
  readonly type: 'chat-session-deleted'
}

export interface ChatSessionTitleUpdatedEvent extends ChatViewEventBase {
  readonly title: string
  readonly type: 'chat-session-title-updated'
}

export interface ChatMessageAddedEvent extends ChatViewEventBase {
  readonly message: ChatMessage
  readonly type: 'chat-message-added'
}

export interface ChatMessageUpdatedEvent extends ChatViewEventBase {
  readonly inProgress: boolean | undefined
  readonly messageId: string
  readonly text: string
  readonly time: string
  readonly toolCalls?: ChatMessage['toolCalls']
  readonly type: 'chat-message-updated'
}

export interface ChatSessionMessagesReplacedEvent extends ChatViewEventBase {
  readonly messages: readonly ChatMessage[]
  readonly type: 'chat-session-messages-replaced'
}

export interface HandleInputEvent extends ChatViewEventBase {
  readonly type: 'handle-input'
  readonly value: string
}

export interface HandleSubmitEvent extends ChatViewEventBase {
  readonly type: 'handle-submit'
  readonly value: string
}

export interface ChatAttachmentAddedEvent extends ChatViewEventBase {
  readonly attachmentId: string
  readonly blob: Blob
  readonly mimeType: string
  readonly name: string
  readonly size: number
  readonly type: 'chat-attachment-added'
}

export interface DataEvent extends ChatViewEventBase {
  readonly type: 'sse-response-part'
  readonly value: unknown
}

export interface ResponseCompletedEvent extends ChatViewEventBase {
  readonly type: 'sse-response-completed'
  readonly value: unknown
}

export interface EventStreamFinishedEvent extends ChatViewEventBase {
  readonly type: 'event-stream-finished'
  readonly value: '[DONE]'
}

export type ChatViewEvent =
  | ChatSessionCreatedEvent
  | ChatSessionDeletedEvent
  | ChatSessionTitleUpdatedEvent
  | ChatMessageAddedEvent
  | ChatMessageUpdatedEvent
  | ChatSessionMessagesReplacedEvent
  | HandleInputEvent
  | HandleSubmitEvent
  | ChatAttachmentAddedEvent
  | DataEvent
  | ResponseCompletedEvent
  | EventStreamFinishedEvent

export interface ChatSession {
  readonly id: string
  readonly messages: readonly ChatMessage[]
  readonly projectId?: string
  readonly title: string
}

export const appendEvent = async (event: ChatViewEvent): Promise<void> => {
  return invoke('ChatStorage.appendEvent', event)
}

export const clear = async (): Promise<void> => {
  return invoke('ChatStorage.clear')
}

export const deleteSession = async (id: string): Promise<void> => {
  return invoke('ChatStorage.deleteSession', id)
}

export const getEvents = async (sessionId?: string): Promise<readonly ChatViewEvent[]> => {
  return invoke('ChatStorage.getEvents', sessionId)
}

export const getSession = async (sessionId: string): Promise<ChatSession | undefined> => {
  return invoke('ChatStorage.getSession', sessionId)
}

export const listSessions = async (sessionId: string): Promise<readonly ChatSession[]> => {
  return invoke('ChatStorage.listSessions', sessionId)
}

export const setSession = async (session: ChatSession): Promise<void> => {
  return invoke('ChatStorage.setSession', session)
}
