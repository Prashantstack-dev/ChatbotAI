import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { ChatFooter } from "./ChatFooter";
import { chatStyles } from "../chatStyles";
import { Loader } from "lucide-react";
import { Bot } from "lucide-react";

import StatusBadge from "./StatusBadge";
import ChatContent from "./ChatContent";
import VoiceInput from './VoiceInput';

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
//Extracting motion.div to a constant to satisfy the linter and improve readability for the animated text field.
const MotionDiv = motion.div

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
  embedded

}) {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  //local storage for messages session Create / load session_id
  useEffect(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    setSessionId(id);
  }, [setSessionId]);
  //Load old messages from Supabase
  useEffect(() => {
    if (!sessionId) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("chat_sessions") // Fixed: Backend saves to chat_sessions
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
    };
    loadMessages();
  }, [sessionId, setMessages]);

  //input empty do nothing
  async function sendMessage() {
    try {
      if (input.trim().length === 0) return;
      const userMessage = {
        role: "user",
        content: input
      };
      //    state = immutable so: old state → copy → modify → set new state also using “previous state” pattern to make it safer.
      setMessages((prevMessage) => [...prevMessage, userMessage]);

      setInput(""); //clears the input
      setIsLoading(true);

      //POST Request
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" //tells Express to parse JSON body
        },
        body: JSON.stringify({
          message: input,
          sessionId: sessionId,
          businessId: businessId,
          // Passed selected language to the backend
          language: selectedLanguage
        })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch AI response");
      }

      //AFTER you get AI response
      const aiMessage = { role: "assistant", content: data.reply || "Sorry, I couldn't generate a response. Please call or visit website for more info" };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error connecting to AI agent:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${error.message}` }]);
    } finally {

      setIsLoading(false);
    }
  }

  // If embedded in the iframe, expand the window to fill it completely.
  const panelClasses = embedded 
    ? `${chatStyles.chatPanel} fixed inset-0 w-full h-full max-h-none rounded-none border-none shadow-none` 
    : chatStyles.chatPanel;

  return (
    <motion.div
      className={panelClasses}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <header className='flex gap-3'>
        <Bot className={chatStyles.bot} />
        <StatusBadge />
      </header>

      {/* 0 message then displayed Content */}
      <div className='flex-1 overflow-y-auto'>
        <ChatContent messages={messages} isLoading={isLoading} />
      </div>
      {/* For voice input */}
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="mb-2 p-2 border rounded"
      >
        <option value="en-US">English</option>
        <option value="zh-CN">中文 (Mandarin)</option>
        <option value="ko-KR">한국어 (Korean)</option>
        <option value="ne-NP">नेपाली (Nepali)</option>
      </select>

      {/* Add voice button next to text input: */}
      <VoiceInput
        language={selectedLanguage}
        onTranscript={(text) => {
          setInput(text); // Auto-fill the input box
          // Optionally auto-submit
        }}
      />
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      <ChatFooter />
    </motion.div>
  );
}
