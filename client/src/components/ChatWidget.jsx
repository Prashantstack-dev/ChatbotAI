import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { chatStyles } from "../chatStyles";
import { MessageCircle, X } from "lucide-react";

import { AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [sessionId, setSessionId] = useState(null);

  function handleOpenChat() {
    //use previous value and give opposite of the value
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <div>
        <AnimatePresence>
          {isOpen && (
            <ChatWindow
              messages={messages}
              setMessages={setMessages}
              input={input}
              setInput={setInput}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              sessionId={sessionId}
              setSessionId={setSessionId}

            />
          )}
        </AnimatePresence>

        <button className={chatStyles.chatButton} onClick={handleOpenChat}>
          {isOpen ? <X size={20} /> : <MessageCircle />}
        </button>
      </div>
    </>
  );
}
