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

  // Read URL parameters once when the component loads
  const params = new URLSearchParams(window.location.search);
  const businessId = params.get('businessId') || "default";
  
  // IFRAME CONTEXT AWARENESS:
  // We check the URL for the `embedded=true` parameter (passed by widget.js). 
  // If it's present, we know this React app is being loaded inside the widget iframe.
  const embedded = params.get('embedded') === 'true';

  // If embedded in an iframe, do not render the mock Salon page.
  // By passing `embedded={true}` to ChatWidget, it knows to hide its own chat button
  // (since widget.js already created one) and to expand the chat window to 100% of the iframe.
  if (embedded) {
    return <ChatWidget businessId={businessId} embedded={true} />
  }

  return (
    <>
     <Salon businessId={businessId}/>
     <ChatWidget businessId={businessId} embedded={false}/>  
    </>
  )
}

export default App;
