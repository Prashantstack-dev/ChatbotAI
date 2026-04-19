import { chatStyles } from "../chatStyles";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatInput({
  input,
  setInput,
  sendMessage,
  savedValue
}) {
  return (
    <>
      <div className='flex w-full gap-2'>
        <div className={chatStyles.inputContainer}>
          <motion.input
            className={`${chatStyles.input} w-full`}
            placeholder='Type a message ... '
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            animate={{
              boxShadow: input
                ? [
                    "0 0 12px rgba(100, 116, 139, 0.5)", // starting glow
                    "0 0 20px rgba(100, 116, 139, 0.3)", // next stage of glow
                    "0 0 12px rgba(100, 116, 139, 0.5)" // repeat back to original glow
                  ]
                : "0 0 0px rgba(0, 0, 0, 0)" // no glow when not typing
            }}
            transition={{
              duration: 1.2, // smooth transition
              ease: "easeInOut", // smooth easing
              repeat: input ? Infinity : 0, // repeat while typing
              repeatType: "loop" // infinite loop effect
            }}
          />
        </div>

        <div
          className={`${chatStyles.sendButton} flex items-center justify-center px-4`}
        >
          <button onClick={() => sendMessage()}>{<SendHorizontal />}</button>
        </div>
      </div>
    </>
  );
}
