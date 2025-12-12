export interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    senderName?: string;
    senderProfileImage?: string;
    conversationId?: string;
    groupId?: string;
    createdAt: string;
    status?: string;
}

export interface ChatConnection {
    conversationId?: string;
    groupId?: string;
    userId?: string;
    name?: string;
    type?: 'group' | 'direct';
    members?: string[];
    lastMessage?: ChatMessage;
    unreadCount?: number;
    createdAt?: string;
    creatorId?: string;
}
