export interface ConversationResponse {
  conversationId: number;
  participants: {
    userId: string;
    username: string;
    firstName: string;
    lastName: string | null;
  }[];
  lastMessage: {
    id: number;
    senderId: string;
    senderUsername: string;
    content: string;
    timeStamp: string;
  } | null;
}