export default function ChatMessages({messages=[], isLoading}){ 
    // messages=[] This means if messages is ever undefined, it falls back to an empty array instead of crashing.
    return <div>{messages.map((message,index)=> <div key={index}>
        <strong> {message.role} </strong>: {message.content}
        </div>)}
        </div>
}