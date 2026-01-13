"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import api from "@/lib/api";
import Chat from "./chat";
import { useAuthStore } from "@/store/Auth";
import {
  Search,
  MoreVertical,
  MessageSquarePlus,
  Users,
  X,
  ArrowLeft,
  Check,
  Home,
  Plane,
} from "lucide-react";
import { getSocket } from "@/lib/socket";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { ChatMessage, ChatConnection } from "./types";
import Modal from "@/shared/components/common/Modal";
import { useRouter } from "next/navigation";



export default function ChatUi() {
  const [connections, setConnections] = useState<ChatConnection[]>([]);
  const [selected, setSelected] = useState<ChatConnection | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);


  const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(false);


  const selectedRef = useRef<ChatConnection | null>(null);
  const lastSocketUpdateRef = useRef<number>(0); // Track last socket update time

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = (msg: ChatMessage) => {
      setConnections((prev) => {
        const msgChatId = msg.groupId || msg.conversationId;

        // Find existing chat index
        const existingChatIndex = prev.findIndex((chat) => {
          const chatId = chat.groupId || chat.conversationId;
          return chatId === msgChatId;
        });

        let updatedConnections = [...prev];

        if (existingChatIndex !== -1) {
          // UPDATE EXISTING CHAT
          const existingChat = prev[existingChatIndex];
          if (existingChat.lastMessage?.id === msg.id) {
            return prev;
          }

          const currentSelected = selectedRef.current;
          const isCurrentChatOpen =
            currentSelected &&
            (currentSelected.groupId || currentSelected.conversationId) === msgChatId;

          updatedConnections[existingChatIndex] = {
            ...existingChat,
            lastMessage: msg,
            unreadCount: isCurrentChatOpen
              ? 0
              : (existingChat.unreadCount || 0) +
              (msg.senderId === user?.id ? 0 : 1),
          };
        } else {
          // ADD NEW CHAT
          const newChat: ChatConnection = {
            conversationId: msg.conversationId,
            groupId: msg.groupId,
            userId: msg.senderId,
            name: msg.senderName || "New Chat",
            lastMessage: msg,
            unreadCount: 1,
            type: msg.groupId ? 'group' : 'direct',
            createdAt: new Date().toISOString()
          };
          updatedConnections.push(newChat);
        }

        // Sort by lastMessage time, most recent first
        const sorted = updatedConnections.sort((a, b) => {
          // Get timestamp - prefer lastMessage.createdAt, fallback to chat.createdAt
          const getTimestamp = (chat: typeof a): number => {
            const time = chat.lastMessage?.createdAt || chat.createdAt;
            if (!time) return 0;
            const parsed = new Date(time).getTime();
            return isNaN(parsed) ? 0 : parsed;
          };

          return getTimestamp(b) - getTimestamp(a);
        });

        return sorted;
      });

      // Mark that we received a socket update
      lastSocketUpdateRef.current = Date.now();
    };

    const handleMessagesRead = (data: { messageIds: string[], conversationId?: string, groupId?: string }) => {
      setConnections((prev) =>
        prev.map((chat) => {
          const chatId = chat.groupId || chat.conversationId;
          const readChatId = data.groupId || data.conversationId;

          if (chatId === readChatId && chat.lastMessage && data.messageIds.includes(chat.lastMessage.id)) {
            return {
              ...chat,
              lastMessage: {
                ...chat.lastMessage,
                status: 'read'
              }
            };
          }
          return chat;
        })
      );
    };

    socket.on("receiveMessage", handleNewMessage);
    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [user?.id]);


  useEffect(() => {
    const socket = getSocket();

    const handleGroupCreated = (group: ChatConnection) => {
      setConnections((prev) => {
        // Prevent duplicates
        const exists = prev.some(
          (g) =>
            g.groupId === group.groupId || g.conversationId === group.groupId
        );
        if (exists) return prev;
        const updated = [...prev, group];
        updated.sort((a: ChatConnection, b: ChatConnection) => {
          const timeA = a.lastMessage?.createdAt || a.createdAt || '0';
          const timeB = b.lastMessage?.createdAt || b.createdAt || '0';
          return new Date(timeB).getTime() - new Date(timeA).getTime();
        });
        return updated;
      });

      if (group.creatorId === user?.id) {
        setSelected(group);
        setIsChatOpenOnMobile(true);
      }
    };

    socket.on("groupCreated", handleGroupCreated);

    return () => {
      socket.off("groupCreated", handleGroupCreated);
    };
  }, [user?.id]);

  const fetchConnections = async () => {
    try {
      const res = await api.get<ChatConnection[]>("/messages/chats");

      const getTimestamp = (chat: ChatConnection): number => {
        const time = chat.lastMessage?.createdAt || chat.createdAt;
        if (!time) return 0;
        const parsed = new Date(time).getTime();
        return isNaN(parsed) ? 0 : parsed;
      };

      // Merge API data with existing socket-updated data
      // Keep the lastMessage that is newer (socket updates might be more recent than API)
      setConnections((prevConnections) => {
        const merged = (res.data || []).map((apiChat) => {
          const chatId = apiChat.groupId || apiChat.conversationId;
          const existingChat = prevConnections.find(
            (c) => (c.groupId || c.conversationId) === chatId
          );

          // If we have existing data with a lastMessage, compare timestamps
          if (existingChat?.lastMessage && apiChat.lastMessage) {
            const existingTime = new Date(existingChat.lastMessage.createdAt).getTime();
            const apiTime = new Date(apiChat.lastMessage.createdAt).getTime();

            // Keep the newer lastMessage
            if (existingTime > apiTime) {
              return {
                ...apiChat,
                lastMessage: existingChat.lastMessage,
                unreadCount: existingChat.unreadCount,
              };
            }
          } else if (existingChat?.lastMessage && !apiChat.lastMessage) {
            // API doesn't have lastMessage but we do - keep ours
            return {
              ...apiChat,
              lastMessage: existingChat.lastMessage,
              unreadCount: existingChat.unreadCount,
            };
          }

          return apiChat;
        });

        // Sort by most recent
        return merged.sort((a, b) => getTimestamp(b) - getTimestamp(a));
      });
    } catch (err) {
      console.error("Failed to load connections", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Skip if socket updated recently (within 2 seconds)
        const timeSinceLastUpdate = Date.now() - lastSocketUpdateRef.current;
        if (timeSinceLastUpdate < 2000) {
          return;
        }
        fetchConnections();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      // Skip if socket updated recently (within 2 seconds)
      const timeSinceLastUpdate = Date.now() - lastSocketUpdateRef.current;
      if (timeSinceLastUpdate < 2000) {
        return;
      }
      fetchConnections();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);


  const filteredConnections = useMemo(() => {
    return connections.filter((c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [connections, searchQuery]);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const toggleMemberSelection = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };


  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0 || !user?.id || isCreatingGroup) return;

    setIsCreatingGroup(true);

    try {
      const res = await api.post<ChatConnection>("/messages/group/create", {
        name: groupName,
        memberIds: selectedMembers,
      });
      const createdGroup = res.data;

      setConnections((prev) => {
        const exists = prev.some((g) => g.groupId === createdGroup.groupId);
        if (exists) return prev;
        return [...prev, createdGroup];
      });

      setSelected(createdGroup);
      setIsChatOpenOnMobile(true);

      setShowAddMembersModal(false);
      setShowNewGroupModal(false);
      setGroupName("");
      setSelectedMembers([]);
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      console.error("Create group failed:", error);
      alert(err.response?.data?.message || "Failed to create group");
    } finally {
      setIsCreatingGroup(false);
    }
  };

  const getChatId = (chat: ChatConnection) => {
    return chat.groupId || chat.conversationId;
  };

  const handleChatSelect = (chat: ChatConnection) => {
    setSelected(chat);
    setIsChatOpenOnMobile(true);

    if (chat.lastMessage && chat.lastMessage.senderId !== user?.id) {
      const socket = getSocket();
      socket.emit('markRead', {
        conversationId: chat.conversationId,
        groupId: chat.groupId,
        messageIds: [chat.lastMessage.id]
      });
    }
  };

  const handleCloseChatOnMobile = () => {
    setSelected(null);
    setIsChatOpenOnMobile(false);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 relative">
        {/* LEFT SIDEBAR (Chat List) */}
        <div
          className={`absolute inset-0 z-10 w-full bg-white border-r border-gray-200 flex flex-col 
                      md:relative md:w-96 md:flex-shrink-0 md:z-auto
                      ${isChatOpenOnMobile ? "hidden md:flex" : "flex"}`}
        >
          {/* Sidebar Header with Logo */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              {/* Logo and Brand */}
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Wayfare</span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => router.push('/')}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                  title="Go Home"
                >
                  <Home className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setShowNewGroupModal(true)}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                  title="New Group"
                >
                  <MessageSquarePlus className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-full transition">
                  <MoreVertical className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-semibold text-white mb-3">Chats</h1>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Search chats"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/20 rounded-lg text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 border border-white/20"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConnections.map((c) => {
              const chatId = getChatId(c);
              const isSelected = selected && getChatId(selected) === chatId;

              return (
                <div
                  key={chatId}
                  onClick={() => handleChatSelect(c)}
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${isSelected ? "bg-gray-100" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${c.type === "group"
                        ? "bg-gradient-to-br from-blue-400 to-blue-600"
                        : "bg-gradient-to-br from-green-400 to-green-600"
                        }`}
                    >
                      {c.type === "group" ? (
                        <Users className="w-6 h-6" />
                      ) : (
                        getInitials(c.name || '')
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {c.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 truncate">
                          {c.lastMessage
                            ? c.lastMessage.senderId === user?.id
                              ? `You: ${c.lastMessage.content} `
                              : c.lastMessage.content
                            : c.type === "group"
                              ? `${c.members?.length} members`
                              : "Tap to chat"}
                        </p>
                        <div className="flex flex-col items-end ml-2">
                          {c.lastMessage && (
                            <span className="text-xs text-gray-500">
                              {dayjs(c.lastMessage.createdAt).format("HH:mm")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Window */}
        <div
          className={`flex-1 flex-col h-full ${selected ? "flex" : "hidden"
            } md:flex`}
        >
          {selected ? (
            <Chat
              chatId={getChatId(selected) || ''}
              currentUserId={user?.id}
              selectedUser={selected}
              onBackClick={handleCloseChatOnMobile}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Chat Application
                </h2>
                <p className="text-gray-600">
                  Select a chat to start messaging
                </p>
              </div>
            </div>
          )}
        </div>

        {/* New Group Modal */}
        <Modal
          isOpen={showNewGroupModal}
          onClose={() => setShowNewGroupModal(false)}
          title="New Chat"
          size="sm"
        >
          <button
            onClick={() => {
              setShowNewGroupModal(false);
              setShowAddMembersModal(true);
            }}
            className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">New Group</h3>
              <p className="text-sm text-gray-500">Create a group chat</p>
            </div>
          </button>
        </Modal>

        {/* Add Members Modal */}
        <Modal
          isOpen={showAddMembersModal}
          onClose={() => {
            setShowAddMembersModal(false);
            setSelectedMembers([]);
            setGroupName("");
          }}
          title="Create New Group"
          subtitle="Add members to start a conversation"
          size="md"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />

            {selectedMembers.length > 0 && (
              <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-md w-fit">
                {selectedMembers.length} selected
              </div>
            )}

            <div className="border rounded-lg max-h-60 overflow-y-auto mt-2">
              {connections
                .filter((c) => c.type !== "group" && c.userId)
                .map((c) => (
                  <div
                    key={c.userId}
                    onClick={() => toggleMemberSelection(c.userId || '')}
                    className={`p-3 cursor-pointer flex items-center gap-3 hover:bg-gray-50 transition border-b last:border-0 ${selectedMembers.includes(c.userId || '') ? "bg-green-50/50" : ""
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {getInitials(c.name || '')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{c.name}</p>
                    </div>
                    {selectedMembers.includes(c.userId || '') && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                ))}
            </div>

            <button
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedMembers.length === 0 || isCreatingGroup}
              className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500 text-white rounded-lg font-semibold transition mt-2 flex items-center justify-center gap-2"
            >
              {isCreatingGroup ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                'Create Group'
              )}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
