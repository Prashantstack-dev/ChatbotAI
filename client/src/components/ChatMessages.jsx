
import { chatStyles } from "../chatStyles";
import { BotMessageSquare } from 'lucide-react';

export default function ChatMessages({ messages = [] }) {
    // messages=[] This means if messages is ever undefined, it falls back to an empty array instead of crashing.
  return (
    <div className="flex flex-col h-full">
      {messages.map((message, index) => {
        if (message.role === "user") {
          return (
            <div key={index} className="flex justify-end">
              <div className={chatStyles.userBubble}>
                {message.content}
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="bot-icon"> <BotMessageSquare /></div>
                <div className={chatStyles.assistantBubble}>
                  {message.content}
                </div>
              </div>
            </div>
          );
        }
      })}
       

    </div>
  );
}