import {chatStyles} from '../chatStyles'
import { SendHorizontal } from 'lucide-react';

export default function ChatInput({input, setInput, sendMessage, savedValue}){
    return <>
    <div className='flex w-full gap-2'>

    <div className={chatStyles.inputContainer}>
        <input 
        className={`chatStyles.input w-[90%]`}
        placeholder='Type a message ... '
        type='text' 
        value={input} 
        onChange={(e)=> setInput(e.target.value)} />

        
    </div>

    <div className={`${chatStyles.sendButton} w-[10%] flex items-center justify-center`}>
     <button 
        onClick={()=> sendMessage()}
        
        >{ <SendHorizontal />}</button>
    </div>
        </div>
        </>
}