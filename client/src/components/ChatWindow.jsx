console.log("ChatWindow mounted");

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import {chatStyles} from '../chatStyles'
import { Loader } from 'lucide-react';
import { Bot,Circle } from 'lucide-react';

import StatusBadge from "./StatusBadge";
import ChatContent from "./ChatContent"


export default function ChatWindow({messages, setMessages,input, setInput,isLoading, setIsLoading  }) {


  //input empty do nothing
    async function sendMessage() {
    try{
    if (input.trim().length === 0) return;
    const userMessage = {
      role: "user",
      content: input
    };
    //    state = immutable so: old state → copy → modify → set new state also using “previous state” pattern to make it safer.
    setMessages((prevMessage) => [...prevMessage, userMessage]);
    setInput(""); //clears the input
    setIsLoading(true)
    //POST Request
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" //tells Express to parse JSON body
          },
          body: JSON.stringify({
            message: input,
          }) // Data must be stringified
        });
        const data = await response.json();
        console.log(data);

        setMessages(prevMessage=> [...prevMessage, {role:'assistant', content:data.reply} ])       
  }catch(error){
      console.error("Error connecting to AI agent:", error);
    }  finally{
      setIsLoading(false);
    }
  }
  
  return (
    <div className={chatStyles.chatPanel}>
    <header className="flex gap-3">
      <Bot className={chatStyles.bot}/>
      <StatusBadge/>  
    </header>

   {/* 0 message then displayed Content */}
   <div className="flex-1 overflow-y-auto">
  <ChatContent
    messages={messages}
    isLoading={isLoading}
  />
</div>
    
 

    {isLoading && (
      <div className={chatStyles.assistantBubble}>
        <Loader className="animate-spin w-4 h-4 inline-block mr-2" />
        Thinking...
      </div>
    )}

    {/* <ChatMessages messages={messages} isLoading={isLoading} /> */}

    <ChatInput
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
    />
  </div>
);
}
