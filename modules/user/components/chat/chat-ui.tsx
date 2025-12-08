// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import Chat from "./chat";
// import { useAuthStore } from "@/store/Auth";
// import {
//   Search,
//   MoreVertical,
//   MessageSquarePlus,
//   Users,
//   X,
//   ArrowLeft,
//   Check,
// } from "lucide-react";
// import { getSocket } from "@/lib/socket";
// import { Header } from "@/shared/components/layout/Header";

// export default function ChatUi() {
//   const [connections, setConnections] = useState<any[]>([]);
//   const [selected, setSelected] = useState<any | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showNewGroupModal, setShowNewGroupModal] = useState(false);
//   const [showAddMembersModal, setShowAddMembersModal] = useState(false);
//   const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
//   const [groupName, setGroupName] = useState("");
//   const { user } = useAuthStore();

//   // Fetch accepted connections + groups
//     useEffect(() => {
//     const socket = getSocket();

//     const handleGroupCreated = (group: any) => {
//       console.log("New group received via socket!", group.name);
//       // socket.emit("joinRoom", { groupId: group.groupId });
//       setConnections((prev) => {
//         // Prevent duplicates
//         const exists = prev.some(
//           (g) =>
//             g.groupId === group.groupId || g.conversationId === group.groupId
//         );
//         if (exists) return prev;
//         return [...prev, group];
//       });

//       // Auto-select the group if YOU created it
//       if (group.creatorId === user?.id) {
//         setSelected(group);
//       }
//     };

//     socket.on("groupCreated", handleGroupCreated);

//     // Cleanup
//     return () => {
//       socket.off("groupCreated", handleGroupCreated);
//     }
//   }, [user?.id]);
//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const res = await api.get("/messages/chats");
//         console.log(res.data,'=============result of chating in feecthcing')
//         setConnections(res.data || []);
//       } catch (err) {
//         console.error("Failed to load connections", err);
//       }
//     };
//     fetchConnections();
//   }, []);

//   const filteredConnections = connections.filter((c) =>
//     c.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const getInitials = (name: string) => {
//     return name
//       ?.split(" ")
//       .map((n: string) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   const toggleMemberSelection = (userId: string) => {
//     setSelectedMembers((prev) =>
//       prev.includes(userId)
//         ? prev.filter((id) => id !== userId)
//         : [...prev, userId]
//     );
//   };

//   // REAL GROUP CREATION
//   const handleCreateGroup = async () => {
//     if (!groupName.trim() || selectedMembers.length === 0 || !user?.id) return;

//     try {
//       const res = await api.post("/messages/group/create", {
//         name: groupName,
//         memberIds: selectedMembers, // matches backend GroupChatDto
//       });
//       // THIS IS THE MISSING PART — ADD IT BACK!!!
//       const createdGroup = res.data; // your backend already returns full group with type: 'group'

//       setConnections((prev) => {
//         const exists = prev.some((g) => g.groupId === createdGroup.groupId)
//         if (exists) return prev;
//         return [...prev, createdGroup];
//       });

//       setSelected(createdGroup); // ← CRITICAL: select the REAL new group
//       // const createdGroup = res.data;

//       // const newGroup = {
//       //   groupId: createdGroup.groupId,           // This is the room ID
//       //   conversationId: null,
//       //   name: createdGroup.name || groupName,
//       //   type: "group" as const,
//       //   members: [...selectedMembers, user.id],  // include yourself
//       //   // optional: avatar, createdAt, etc.
//       // };

//       // // Add to sidebar
//       // setConnections(prev => [...prev, newGroup]);
//       // setSelected(newGroup);

//       // Reset & close
//       setShowAddMembersModal(false);
//       setShowNewGroupModal(false);
//       setGroupName("");
//       setSelectedMembers([]);
//     } catch (error: any) {
//       console.error("Create group failed:", error);
//       alert(error.response?.data?.message || "Failed to create group");
//     }
//   };

//   // Determine which ID to use as chat room
//   const getChatId = (chat: any) => {
//     return chat.groupId || chat.conversationId;
//   };

//   return (
//     <>
//       <Header />
//     <div className="flex h-screen bg-gray-100">
//       {/* LEFT SIDEBAR */}
//       <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="bg-gray-50 p-4 border-b border-gray-200">
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setShowNewGroupModal(true)}
//                 className="p-2 hover:bg-gray-200 rounded-full transition"
//                 title="New Group"
//               >
//                 <MessageSquarePlus className="w-5 h-5 text-gray-600" />
//               </button>
//               <button className="p-2 hover:bg-gray-200 rounded-full transition">
//                 <MoreVertical className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//           </div>

//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search chats"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>
//         </div>

//         {/* Chat List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredConnections.map((c) => {
//             const chatId = getChatId(c);
//             const isSelected = selected && getChatId(selected) === chatId;

//             return (
//               <div
//                 key={chatId}
//                 onClick={() => {
//                   console.log("SELECTED:", c);
//                   setSelected(c);
//                 }}
//                 className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${
//                   isSelected ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
//                       c.type === "group"
//                         ? "bg-gradient-to-br from-blue-400 to-blue-600"
//                         : "bg-gradient-to-br from-green-400 to-green-600"
//                     }`}
//                   >
//                     {c.type === "group" ? (
//                       <Users className="w-6 h-6" />
//                     ) : (
//                       getInitials(c.name)
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {c.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 truncate">
//                       {c.type === "group"
//                         ? `${c.members?.length || 0} members`
//                         : "Tap to chat"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* RIGHT SIDE - Chat Window */}
//       <div className="flex-1 flex flex-col hidden md:flex">
//         {selected ? (
//           <Chat
//             chatId={getChatId(selected)} // groupId or conversationId
//             currentUserId={user?.id}
//             selectedUser={selected} // full object for header
//           />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center">
//               <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
//                 <svg
//                   className="w-32 h-32 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//                   />
//                 </svg>
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//                 Chat Application
//               </h2>
//               <p className="text-gray-600">Select a chat to start messaging</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* New Group Modal */}
//       {showNewGroupModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">New Chat</h2>
//                 <button onClick={() => setShowNewGroupModal(false)}>
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>
//               <button
//                 onClick={() => {
//                   setShowNewGroupModal(false);
//                   setShowAddMembersModal(true);
//                 }}
//                 className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg"
//               >
//                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
//                   <Users className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="text-left">
//                   <h3 className="font-semibold">New Group</h3>
//                   <p className="text-sm text-gray-600">Create a group chat</p>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Members Modal */}
//       {showAddMembersModal && (
//         <div className="fixed inset-0 bg-white z-50 flex flex-col md:max-w-md md:mx-auto md:my-8 md:rounded-lg md:shadow-2xl">
//           <div className="bg-green-600 text-white p-4">
//             <div className="flex items-center gap-4 mb-4">
//               <button
//                 onClick={() => {
//                   setShowAddMembersModal(false);
//                   setSelectedMembers([]);
//                   setGroupName("");
//                 }}
//               >
//                 <ArrowLeft className="w-6 h-6" />
//               </button>
//               <div>
//                 <h2 className="text-lg font-semibold">New Group</h2>
//                 <p className="text-sm opacity-90">Add members</p>
//               </div>
//             </div>
//             <input
//               type="text"
//               placeholder="Group name"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg"
//             />
//           </div>

//           {selectedMembers.length > 0 && (
//             <div className="px-4 py-2 bg-green-50">
//               <p className="text-sm text-green-700 font-medium">
//                 {selectedMembers.length} selected
//               </p>
//             </div>
//           )}

//           <div className="flex-1 overflow-y-auto">
//             {connections
//               .filter((c) => c.type !== "group" && c.userId)
//               .map((c) => (
//                 <div
//                   key={c.userId}
//                   onClick={() => toggleMemberSelection(c.userId)}
//                   className="p-4 hover:bg-gray-50 cursor-pointer border-b"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
//                       {getInitials(c.name)}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-semibold">{c.name}</h3>
//                     </div>
//                     {selectedMembers.includes(c.userId) && (
//                       <Check className="w-5 h-5 text-green-600" />
//                     )}
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="p-4 border-t">
//             <button
//               onClick={handleCreateGroup}
//               disabled={!groupName.trim() || selectedMembers.length === 0}
//               className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-full font-semibold"
//             >
//               Create Group
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

//...........................
//REsponsive CHat-UI
"use client";

import { useEffect, useState, useMemo } from "react";
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
} from "lucide-react";
import { getSocket } from "@/lib/socket";
import { Header } from "@/shared/components/layout/Header";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function ChatUi() {
  const [connections, setConnections] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const { user } = useAuthStore();

  // NEW STATE FOR MOBILE RESPONSIVENESS
  const [isChatOpenOnMobile, setIsChatOpenOnMobile] = useState(false);
  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = (msg: any) => {
      setConnections((prev) => {
        return prev
          .map((chat) => {
            const chatId = chat.groupId || chat.conversationId;
            const msgChatId = msg.groupId || msg.conversationId;

            if (chatId === msgChatId) {
              const isCurrentChatOpen =
                selected &&
                (selected.groupId || selected.conversationId) === chatId;

              return {
                ...chat,
                lastMessage: msg,
                unreadCount: isCurrentChatOpen
                  ? 0 // Reset if this chat is open
                  : (chat.unreadCount || 0) +
                    (msg.senderId === user?.id ? 0 : 1),
              };
            }
            return chat;
          })
          .sort((a, b) => {
            const timeA = a.lastMessage?.createdAt || a.createdAt || 0;
            const timeB = b.lastMessage?.createdAt || b.createdAt || 0;
            return new Date(timeB).getTime() - new Date(timeA).getTime();
          });
      });
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [selected, user?.id]);

  // --- useEffects ---
  useEffect(() => {
    const socket = getSocket();

    const handleGroupCreated = (group: any) => {
      console.log("New group received via socket!", group.name);
      setConnections((prev) => {
        // Prevent duplicates
        const exists = prev.some(
          (g) =>
            g.groupId === group.groupId || g.conversationId === group.groupId
        );
        if (exists) return prev;
        const updated = [...prev, group];
        updated.sort((a: any, b: any) => {
          const timeA = a.lastMessage?.createdAt || a.createdAt || 0;
          const timeB = b.lastMessage?.createdAt || b.createdAt || 0;
          return new Date(timeB).getTime() - new Date(timeA).getTime();
        });
        return updated;
      });

      // Auto-select the group if YOU created it
      if (group.creatorId === user?.id) {
        setSelected(group);
        setIsChatOpenOnMobile(true);
      }
    };

    socket.on("groupCreated", handleGroupCreated);

    // Cleanup
    return () => {
      socket.off("groupCreated", handleGroupCreated);
    };
  }, [user?.id]);
  

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await api.get("/messages/chats");
        console.log(res.data, "=============result of chating in feecthcing");
        setConnections(res.data || []);
      } catch (err) {
        console.error("Failed to load connections", err);
      }
    };
    fetchConnections();
  }, []);
  // --- End useEffects ---

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

  // REAL GROUP CREATION
  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedMembers.length === 0 || !user?.id) return;

    try {
      const res = await api.post("/messages/group/create", {
        name: groupName,
        memberIds: selectedMembers, // matches backend GroupChatDto
      });
      const createdGroup = res.data;

      setConnections((prev) => {
        const exists = prev.some((g) => g.groupId === createdGroup.groupId);
        if (exists) return prev;
        return [...prev, createdGroup];
      });

      setSelected(createdGroup); // CRITICAL: select the REAL new group
      setIsChatOpenOnMobile(true); // Auto-open the new chat on mobile

      // Reset & close
      setShowAddMembersModal(false);
      setShowNewGroupModal(false);
      setGroupName("");
      setSelectedMembers([]);
    } catch (error: any) {
      console.error("Create group failed:", error);
      alert(error.response?.data?.message || "Failed to create group");
    }
  };

  // Determine which ID to use as chat room
  const getChatId = (chat: any) => {
    return chat.groupId || chat.conversationId;
  };

  // Handlers for chat selection
  const handleChatSelect = (chat: any) => {
    setSelected(chat);
    setIsChatOpenOnMobile(true); // Open chat view on mobile
  };

  // Handler to close chat on mobile
  const handleCloseChatOnMobile = () => {
    setSelected(null);
    setIsChatOpenOnMobile(false); // Go back to list view on mobile
  };

  return (
    <>
      <Header />
      {/* Set a fixed height for the chat area (vh - header height) */}
      <div className="flex h-[calc(100vh-64px)] bg-gray-100 relative">
        {/* LEFT SIDEBAR (Chat List) */}
        <div
          // Responsive Visibility
          className={`absolute inset-0 z-10 w-full bg-white border-r border-gray-200 flex flex-col 
                      md:relative md:w-96 md:flex-shrink-0 md:z-auto
                      ${isChatOpenOnMobile ? "hidden md:flex" : "flex"}`}
        >
          {/* Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-semibold text-gray-800">Chats</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNewGroupModal(true)}
                  className="p-2 hover:bg-gray-200 rounded-full transition"
                  title="New Group"
                >
                  <MessageSquarePlus className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded-full transition">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chats"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition ${
                    isSelected ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                        c.type === "group"
                          ? "bg-gradient-to-br from-blue-400 to-blue-600"
                          : "bg-gradient-to-br from-green-400 to-green-600"
                      }`}
                    >
                      {c.type === "group" ? (
                        <Users className="w-6 h-6" />
                      ) : (
                        getInitials(c.name)
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
                              ? `You: ${c.lastMessage.content}`
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
                          {c.unreadCount > 0 && (
                            <span className="bg-green-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center mt-1">
                              {c.unreadCount}
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
          // Responsive Visibility
          className={`flex-1 flex-col h-full ${
            selected ? "flex" : "hidden"
          } md:flex`}
        >
          {selected ? (
            <Chat
              chatId={getChatId(selected)} // groupId or conversationId
              currentUserId={user?.id}
              selectedUser={selected} // full object for header
              onBackClick={handleCloseChatOnMobile} // Pass back button handler
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
        {showNewGroupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">New Chat</h2>
                  <button onClick={() => setShowNewGroupModal(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowNewGroupModal(false);
                    setShowAddMembersModal(true);
                  }}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">New Group</h3>
                    <p className="text-sm text-gray-600">Create a group chat</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Members Modal */}
        {showAddMembersModal && (
          // Adjusted for full-screen on mobile, centered modal on md+
          <div className="fixed inset-0 bg-white z-50 flex flex-col md:max-w-md md:mx-auto md:my-8 md:rounded-lg md:shadow-2xl md:static md:inset-auto md:h-auto">
            <div className="bg-green-600 text-white p-4 flex-shrink-0">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => {
                    setShowAddMembersModal(false);
                    setSelectedMembers([]);
                    setGroupName("");
                  }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-lg font-semibold">New Group</h2>
                  <p className="text-sm opacity-90">Add members</p>
                </div>
              </div>
              <input
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg"
              />
            </div>

            {selectedMembers.length > 0 && (
              <div className="px-4 py-2 bg-green-50 flex-shrink-0">
                <p className="text-sm text-green-700 font-medium">
                  {selectedMembers.length} selected
                </p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              {connections
                .filter((c) => c.type !== "group" && c.userId)
                .map((c) => (
                  <div
                    key={c.userId}
                    onClick={() => toggleMemberSelection(c.userId)}
                    className="p-4 hover:bg-gray-50 cursor-pointer border-b"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold">
                        {getInitials(c.name)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{c.name}</h3>
                      </div>
                      {selectedMembers.includes(c.userId) && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="p-4 border-t flex-shrink-0">
              <button
                onClick={handleCreateGroup}
                disabled={!groupName.trim() || selectedMembers.length === 0}
                className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-full font-semibold"
              >
                Create Group
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
//........................
//Thir Ui
