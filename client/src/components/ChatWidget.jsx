import ChatWindow from "./ChatWindow"
import {useState} from "react";
import {chatStyles} from '../chatStyles'
import { MessageCircle, MessageCircleOff } from 'lucide-react';


export default function ChatWidget(){
    const [isOpen, setIsOpen]=useState(false);

    function handleOpenChat(){
        //use previous value and give opposite of the value
        setIsOpen(prev => !prev);
    }
    return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4">
        {isOpen && <ChatWindow />}
     
       <button  className={chatStyles.chatButton} onClick={handleOpenChat}>{isOpen ?<MessageCircleOff /> :  <MessageCircle />}
        </button> 

           <div className="bg-red-500 text-white p-4">
  Tailwind Working
</div> 
      </div>
      
      )
}