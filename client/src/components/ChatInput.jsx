import { useRef, useEffect } from "react";
import { chatStyles } from "../chatStyles";
import { SendHorizontal, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// [CHANGE] Using motion.textarea instead of motion.input to support auto-expanding text.
const MotionTextarea = motion.textarea;

// Placeholder text in the user's chosen language — updates when the header dropdown changes.
const LANG_PLACEHOLDERS = {
  'en-US': 'Type a message… (Enter to send)',
  'zh-CN': '输入消息…（Enter 发送）',
  'ko-KR': '메시지를 입력하세요… (Enter 전송)',
  'ne-NP': 'सन्देश लेت्नुहोस्…',
};

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  // isListening / toggleListening wired from useVoiceInput in ChatWindow
  isListening,
  toggleListening,
  // selectedLanguage drives the placeholder text to match the chosen language
  selectedLanguage = 'en-US',
}) {
  const textareaRef = useRef(null);

  // [CHANGE] Auto-resize the textarea whenever the input content changes.
  // Resets height to 'auto' first so it can shrink, then grows to scrollHeight (max 160px ≈ 5 lines).
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }, [input]);

  // [CHANGE] Enter key sends the message; Shift+Enter inserts a newline (natural multiline).
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the newline from being added
      sendMessage();
    }
  };

  return (
    // [CHANGE] Container switches to speakingContainer style while mic is active,
    // giving a red-glow "listening" visual theme.
    // items-end keeps the buttons pinned to the bottom row as the textarea grows.
    <div className={isListening ? chatStyles.speakingContainer : chatStyles.inputContainer}>

      {/* [CHANGE] Textarea replaces the old <input type="text">. resize-none hides the drag handle;
          overflow-hidden prevents a scrollbar from appearing as it grows. */}
      <MotionTextarea
        ref={textareaRef}
        className={`${chatStyles.input} w-full resize-none overflow-hidden`}
        // Placeholder: shows native-script hint when idle, listening cue when mic is active.
        placeholder={isListening ? '🎤️ Listening…' : (LANG_PLACEHOLDERS[selectedLanguage] || LANG_PLACEHOLDERS['en-US'])}
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        // Pulsing glow animation while typing (unchanged behaviour)
        animate={{
          boxShadow: input
            ? [
              "0 0 12px rgba(100, 116, 139, 0.5)",
              "0 0 20px rgba(100, 116, 139, 0.3)",
              "0 0 12px rgba(100, 116, 139, 0.5)",
            ]
            : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        transition={{
          duration: 1.2, // smooth transition animation duration
          ease: "easeInOut", // smooth easing
          repeat: input ? Infinity : 0, //repeat the animation infintie
          repeatType: "loop",//infinite loop effect
        }}
      />

      {/* [CHANGE] Mic button is now inline, to the LEFT of Send — separated by the textarea gap.
          It pulses red with a glow shadow while listening. */}
      <button
        onClick={toggleListening}
        title={isListening ? "Stop listening" : "Speak your message"}
        className={`
          flex items-center justify-center w-9 h-9 rounded-xl shrink-0 transition-all
          ${isListening
            ? "bg-red-500 text-white shadow-[0_0_14px_rgba(239,68,68,0.6)] animate-pulse"
            : "bg-white/70 text-[#7F77DD] border border-white/60 hover:bg-white/90 hover:shadow-sm"
          }
        `}
      >
        {/* [CHANGE] Icon swaps to MicOff while actively listening. */}
        {isListening ? <MicOff size={16} /> : <Mic size={16} />}
      </button>

      {/* [CHANGE] Send button animates out while the mic is active (isListening = true).
          AnimatePresence handles the smooth fade+scale exit/enter transition. */}
      <AnimatePresence>
        {!isListening && (
          <motion.button
            key="send-btn"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            onClick={sendMessage}
            title="Send message"
            className={chatStyles.sendButton}
          >
            <SendHorizontal size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
