import React, { useState } from "react";
import type { ChatMessageType, SetChatMessages } from "../types/chat";
import { Chatbot } from "supersimpledev";
import spinner from "../assets/loading-spinner.gif";

interface ChatInputProps {
  chatMessages: ChatMessageType[];
  setChatMessages: SetChatMessages;
}

const ChatInput = ({ chatMessages, setChatMessages }: ChatInputProps) => {
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function sendMessage() {
    if (!inputText.trim() || isLoading) return;

    try {
      setIsLoading(true);

      const messageToSend = inputText;
      setInputText("");

      const newChatMessages: ChatMessageType[] = [
        ...chatMessages,
        {
          id: crypto.randomUUID(),
          message: messageToSend,
          sender: "user",
        },
      ];

      setChatMessages(newChatMessages);

      const response = await Chatbot.getResponse(messageToSend);

      setChatMessages([
        ...newChatMessages,
        {
          id: crypto.randomUUID(),
          message: response,
          sender: "robot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-5 border-t border-white/10 bg-black/20">
      <div className="flex items-center gap-3">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Add a message..."
          className="flex-1 bg-white/5 border border-white/10
          text-white px-5 py-3 rounded-full outline-none
          placeholder:text-gray-400"
        />

        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="w-[110px] h-[48px] rounded-full
          bg-violet-600 text-white font-medium
          hover:bg-violet-500 transition-all
          flex items-center justify-center
          disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (
            <img
              src={spinner}
              alt="loading"
              className="w-6 h-6 object-contain"
            />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
