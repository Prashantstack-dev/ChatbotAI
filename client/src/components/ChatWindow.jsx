import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { chatStyles } from "../chatStyles";
import { Loader } from "lucide-react";
import { Bot } from "lucide-react";

import StatusBadge from "./StatusBadge";
import ChatContent from "./ChatContent";

import { useEffect } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";

export default function ChatWindow({
  messages,
  setMessages,
  input,
  setInput,
  isLoading,
  setIsLoading,
  sessionId,
  setSessionId
}) {
  //local storage for messages session Create / load session_id
  useEffect(() => {
    let id = localStorage.getItem("session_id");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("session_id", id);
    }
    setSessionId(id);
  }, []);
  //Load old messages from Supabase
  useEffect(() => {
    if (!sessionId) return;

    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (!error && data) {
        setMessages(data);
      }
    };
    loadMessages();
  }, [sessionId]);

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
      // save user message to Supabase
      await supabase.from("messages").insert({
        session_id: sessionId,
        role: "user",
        content: input
      });

      setInput(""); //clears the input
      setIsLoading(true);

      // Add history
      const history = [...messages, userMessage].slice(-8).map((m) => ({
        role: m.role,
        content: m.content
      }));

      //POST Request
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json" //tells Express to parse JSON body
        },
        // body: JSON.stringify({
        //   message: input
        // })
        // Data must be stringified
        body: JSON.stringify({
          messages: history
        })
      });
      const data = await response.json();
      // console.log(data);

      //AFTER you get AI response
      // setMessages(prevMessage=> [...prevMessage, {role:'assistant', content:data.reply} ])
      const aiMessage = { role: "assistant", content: data.reply };

      setMessages((prev) => [...prev, aiMessage]);

      // save AI message
      await supabase.from("chat_sessions").insert({
        session_id: sessionId,
        role: "assistant",
        content: data.reply
      });
    } catch (error) {
      console.error("Error connecting to AI agent:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      className={chatStyles.chatPanel}
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.9, y: 40 }}
      transition={{ type: "spring",
    stiffness: 260,
    damping: 20 }}
    >
      <header className='flex gap-3'>
        <Bot className={chatStyles.bot} />
        <StatusBadge />
      </header>

      {/* 0 message then displayed Content */}
      <div className='flex-1 overflow-y-auto'>
        <ChatContent messages={messages} isLoading={isLoading} />
      </div>

      {isLoading && (
        <div className={chatStyles.assistantBubble}>
          <Loader className='animate-spin w-4 h-4 inline-block mr-2' />
          Thinking...
        </div>
      )}

      {/* <ChatMessages messages={messages} isLoading={isLoading} /> */}

      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
    </motion.div>
  );
}
