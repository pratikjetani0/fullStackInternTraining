import { useEffect, useRef, useState } from "react";
import type { ChatMessageType } from "./types/chat";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import bot from "../src/assets/bot.png";

function App() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      console.log("component destru")
    };
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      {/* Floating button */}
      <div ref={chatRef}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="fixed bottom-8 cursor-pointer right-8 bg-violet-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-all"
        >
          <img
            src={bot}
            alt="chat"
            className="w-8 h-8 rounded-full object-cover"
          />
        </button>

        {/* Chat window */}
        <div
          ref={chatRef}
          className={`fixed bottom-28 right-8 w-[90vw] max-w-[650px] h-[75vh]
          backdrop-blur-xl bg-white/10 border border-white/10
          rounded-3xl shadow-2xl flex flex-col overflow-hidden
          transition-all duration-500 ease-out origin-bottom-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
              : "opacity-0 scale-90 translate-y-8 pointer-events-none"
          }`}
        >
          <div className="text-center text-gray-300 font-semibold py-3 text-xl border-b border-white/10">
            Chat Bot
          </div>

          {chatMessages.length === 0 && (
            <div className="flex-1 flex items-center justify-center px-8">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  Welcome 👋
                </h2>

                <p className="text-gray-400 leading-relaxed">
                  Send your first message below to start chatting with the AI
                  assistant.
                </p>
              </div>
            </div>
          )}

          {chatMessages.length > 0 && (
            <ChatMessages chatMessages={chatMessages} />
          )}

          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
