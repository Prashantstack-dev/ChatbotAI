import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { ChatFooter } from "./ChatFooter";
import { chatStyles } from "../chatStyles";
import { Bot } from "lucide-react";

import StatusBadge from "./StatusBadge";
import ChatContent from "./ChatContent";

// useVoiceInput hook wires mic recognition to the selected language from the dropdown
import { useVoiceInput } from './VoiceInput';

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";

// Extracting motion.div to a constant to satisfy the linter and improve readability.
const MotionDiv = motion.div;

export default function ChatWindow({
  messages,
  setMessages,
  input,
  setInput,
  isLoading,
  setIsLoading,
  sessionId,
  setSessionId,
  businessId,
  embedded,
}) {
  // Language options shown in the header dropdown with native scripts.
  // BCP-47 codes are passed to both SpeechRecognition and the backend API.
  const LANGUAGES = [
    { code: 'en-US', label: 'English' },
    { code: 'zh-CN', label: '中文' },    // Mandarin Chinese
    { code: 'ko-KR', label: '한국어' },   // Korean
    { code: 'ne-NP', label: 'नेपाली' },  // Nepali
  ];

  // selectedLanguage drives both speech recognition language and the backend language param.
  // Defaults to English; user changes it via the header dropdown.
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  // useVoiceInput receives selectedLanguage so recognition re-initialises when dropdown changes.
  const { isListening, toggleListening } = useVoiceInput(
    (text) => setInput(text), // Auto-fills textarea with recognised speech
    selectedLanguage           // Language from user's dropdown selection
  );

  // Create / load session_id from localStorage
  useEffect(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    setSessionId(id);
  }, [setSessionId]);

  // Load old messages from Supabase
  useEffect(() => {
    if (!sessionId) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("chat_sessions") // Backend saves to chat_sessions
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
    };
    loadMessages();
  }, [sessionId, setMessages]);

  // Input empty — do nothing
  async function sendMessage() {
    try {
      if (input.trim().length === 0) return;
      const userMessage = { role: "user", content: input };

      // Using previous state pattern to avoid stale closure issues
      //    state = immutable so: old state → copy → modify → set new state also using “previous state” 
      setMessages((prevMessage) => [...prevMessage, userMessage]);
      setInput(""); // Clear the textarea
      setIsLoading(true);

      // POST request — language is now auto-detected instead of manually selected
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          sessionId: sessionId,
          businessId: businessId,
          // Selected language from the header dropdown passed to the backend
          language: selectedLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch AI response");
      }

      const aiMessage = {
        role: "assistant",
        content: data.reply || "Sorry, I couldn't generate a response. Please call or visit the website for more info.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error connecting to AI agent:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  // If embedded in an iframe, expand the window to fill it completely.
  const panelClasses = embedded
    ? `${chatStyles.chatPanel} fixed inset-0 w-full h-full max-h-none rounded-none border-none shadow-none`
    : chatStyles.chatPanel;

  return (
    <MotionDiv
      className={panelClasses}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* Header: Bot + status on the left, language dropdown flush right */}
      <header className={chatStyles.header}>
        <div className="flex items-center gap-3">
          <Bot className={chatStyles.bot} />
          <StatusBadge />
        </div>

        {/* Compact glassmorphism dropdown — shows native script labels.
            Changing language re-initialises SpeechRecognition via useVoiceInput. */}
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className={chatStyles.langDropdown}
          title="Select language for chat and voice input"
        >
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
      </header>

      {/* Message area — grows to fill available space */}
      <div className="flex-1 overflow-y-auto">
        <ChatContent messages={messages} isLoading={isLoading} />
      </div>

      {/* ChatInput owns the textarea, mic button, and send button in one row.
          selectedLanguage updates the placeholder text to match the chosen language. */}
      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        isListening={isListening}
        toggleListening={toggleListening}
        selectedLanguage={selectedLanguage}
      />

      <ChatFooter />
    </MotionDiv>
  );
}
