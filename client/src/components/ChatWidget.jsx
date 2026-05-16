import ChatWindow from "./ChatWindow";
import { useState } from "react";
import { chatStyles } from "../chatStyles";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

// embedded prop is passed by App.jsx when the React app is running inside the widget iframe.
// When true: render ChatWindow directly (no floating button, window always open).
// When false/undefined: render the normal floating button + toggle behaviour (standalone/demo mode).
export default function ChatWidget({ businessId: businessIdProp, embedded = false }) {
  const businessId =
    businessIdProp ||
    new URLSearchParams(window.location.search).get('businessId') ||
    'default';

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // In embedded mode the chat is always open — no toggle needed.
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenChat() {
    setIsOpen((prev) => !prev);
  }

  // ── EMBEDDED MODE ──────────────────────────────────────────────────────────
  // Running inside the widget.js iframe: render ONLY the ChatWindow.
  // No floating button is rendered here — the button lives in widget.js on the host page.
  // ChatWindow receives embedded=true so it uses full-screen layout (fills the iframe).
  if (embedded) {
    return (
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
        embedded={true}
      />
    );
  }

  // ── STANDALONE / DEMO MODE ─────────────────────────────────────────────────
  // Running as a standalone page (e.g. localhost:5173 directly, or the Salon demo).
  // Shows the familiar floating button that toggles the chat window.
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
              businessId={businessId}
            />
          )}
        </AnimatePresence>

        {/* Updated chat button — dynamic pulse effect */}
        <button className={chatStyles.chatButton} onClick={handleOpenChat}>
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </>
  );
}
