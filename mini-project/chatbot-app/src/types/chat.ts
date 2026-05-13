export type Sender = "user" | "robot";

export interface ChatMessageType {
  id: string;
  message: string;
  sender: Sender;
}

export type SetChatMessages = (messages: ChatMessageType[] | ((prev: ChatMessageType[]) => ChatMessageType[])) => void;