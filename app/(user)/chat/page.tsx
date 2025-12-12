"use client";

import ChatUi from "@/modules/user/components/chat/chat-ui";
import { withAuth } from "@/shared/components/HOC/withAuth";

function ChatPage() {
    return (
        <>
            <ChatUi />
        </>
    );
}

export default withAuth(ChatPage);