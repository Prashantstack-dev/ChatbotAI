import ChatWindow from "./ChatWindow"
import {useState} from "react";
import {chatStyles} from '../chatStyles'
import { MessageCircle, X } from 'lucide-react';



export default function ChatWidget(){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen]=useState(false);

    function handleOpenChat(){
        //use previous value and give opposite of the value
        setIsOpen(prev => !prev);
        
    }
    return (
        <>

        <div className={chatStyles.chatWidget}>


        {isOpen && <ChatWindow
          messages={messages}
          setMessages={setMessages}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />}
     
       <button  className={chatStyles.chatButton} onClick={handleOpenChat}>{isOpen ? <X size={20}/> :  <MessageCircle />}
        </button> 

        </div> 
      
      
        </>
      )
}