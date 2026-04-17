// ChatContent.jsx
import ChatMessages from "./ChatMessages";
import { Bot } from "lucide-react";

export default function ChatWelcome({ messages, isLoading }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Bot className="w-7 h-7 text-foreground" />
        </div>

        <h3 className="font-semibold text-foreground mb-1">
          Hi there!
        </h3>

        <p className="text-sm text-muted-foreground">
          How can I help you today? Feel free to ask me anything.
        </p>
      </div>
    );
  }

  return <ChatMessages messages={messages} isLoading={isLoading} />;
}