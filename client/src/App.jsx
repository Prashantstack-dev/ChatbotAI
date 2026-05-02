import { useState } from 'react';
import ChatWidget from './components/ChatWidget';
import { ChatFooter } from './components/ChatFooter';
import Salon from './components/Salon';
import './App.css'

function App() {
//   Lazy Initialization.Initial Calculation: When the component loads, React sees the () => { ... } function inside useState. It pauses, runs that function, reads the URL, and finds the ID ("123").
// Render 1: React immediately sets the initial state to "123". It renders <Salon businessId={"123"} /> and <ChatWidget businessId={"123"} />.
// Mount: The components are placed on the screen.
// Done!

  const [businessId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('businessId');
    console.log("Business ID: ", id);
    return id;
  });

  return (
    <>
     <Salon businessId={businessId}/>
     <ChatWidget businessId={businessId}/>  
    </>
  )
}

export default App;
