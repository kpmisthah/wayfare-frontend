export interface ChatMessage {
    id: string;
    content: string;
    senderId: string;
    conversationId?: string;
    groupId?: string;
    createdAt: string;
    status?: string; // saw usage of status in chat.tsx line 405
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
