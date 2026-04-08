import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      Window is rendering:
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage}/>
      <ChatMessages messages={messages} isLoading={isLoading}/>
    </div>
  );
}
