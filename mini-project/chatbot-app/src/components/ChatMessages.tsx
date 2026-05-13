import React, { useEffect, useRef } from "react";
import type { ChatMessageType } from "../types/chat";
import ChatMessageUi from "./ChatMessageUi";

interface ChatMessagesProps {
  chatMessages: ChatMessageType[];
}

function ChatMessages({ chatMessages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chatMessages]);

  return (
    <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
      {chatMessages.map((msg) => (
        <ChatMessageUi key={msg.id} message={msg.message} sender={msg.sender} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
