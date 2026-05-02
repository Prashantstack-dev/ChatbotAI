import { useState,useEffect } from 'react';
import ChatWidget from './components/ChatWidget';
import { ChatFooter } from './components/ChatFooter';
import Salon from './components/Salon';
import './App.css'

function App() {
  const [businessId, setBusinessId] = useState(() => {
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
