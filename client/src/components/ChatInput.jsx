export default function ChatInput({input, setInput, sendMessage}){
    return <div>
        <input value={input} onChange={(e)=> setInput(e.target.value)} />
        <button onClick={()=> sendMessage()}>Sent Messages</button>
    </div>
}