import bot from "../assets/bot.png";
import user from "../assets/profile.jpg";

interface ChatMessageProps {
  message: string;
  sender: "user" | "robot";
}

function ChatMessageUi({ message, sender }: ChatMessageProps) {
  return (
    <div
      className={`flex items-end gap-3 mb-6 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {sender === "robot" && (
        <img
          src={bot}
          alt="bot"
          className="w-10 h-10 rounded-full object-cover"
        />
      )}

      <div
        className={`px-5 py-3 rounded-2xl max-w-[70%] break-words text-sm shadow-lg ${
          sender === "user"
            ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
            : "bg-white/5 text-gray-200 border border-white/10"
        }`}
      >
        {message}
      </div>

      {sender === "user" && (
        <img
          src={user}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
    </div>
  );
}

export default ChatMessageUi;
