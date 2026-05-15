import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { chatStyles } from "../chatStyles";
import { MessageCircle, X } from "lucide-react";

import { AnimatePresence } from "framer-motion";

export default function ChatWidget({businessId: businessIdProp, embedded = false}) {
  const businessId = businessIdProp ||
  new URLSearchParams(window.location.search).get('businessId') || "default";
  // Removed debug console.log for cleanup

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // If embedded in an iframe, the chat window is always open
  const [isOpen, setIsOpen] = useState(embedded ? true : false);

  const [sessionId, setSessionId] = useState(null);

  function handleOpenChat() {
    //use previous value and give opposite of the value
    setIsOpen((prev) => !prev);
  }
  return (
    <>
      <div>
        {/* Removed "Salon for : {businessId}" debug text as part of UI cleanup */}
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
              businessId={businessId}
              embedded={embedded}
            />
          )}
        </AnimatePresence>

        {/* Updated chat button to have a dynamic pulse effect and better UI. Hidden if embedded inside iframe. */}
        {!embedded && (
          <button className={chatStyles.chatButton} onClick={handleOpenChat}>
            {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
          </button>
        )}
      </div>
    </>
  );
}
