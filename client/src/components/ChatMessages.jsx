import {chatStyles} from "../chatStyles"
export default function ChatMessages({messages=[], isLoading,isTyping, setIsTyping}){ 
    // messages=[] This means if messages is ever undefined, it falls back to an empty array instead of crashing.
    return <div className='flex flex-col h-full'>{messages.map((message,index)=> <div key={index}>
        <div className={message.role === 'user'? chatStyles.userBubble : chatStyles.assistantBubble}>
           {message.role} : {message.content}
        </div>
       
        
        </div>
    )}
        </div>
}