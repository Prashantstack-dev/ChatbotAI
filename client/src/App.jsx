import { useState } from 'react';
import ChatWidget from './components/ChatWidget';
import Salon from './components/Salon';
import './App.css';

function App() {
  // Lazy initialization: reads URL params once on mount.
  // businessId is passed from widget.js via the iframe src URL.
  const [businessId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('businessId');
  });

  // Detect embedded mode: widget.js appends `&embedded=true` to the iframe URL.
  // When true, render ONLY the chat UI — no Salon page, no floating launcher button.
  // This is what prevents the "double button" and "Salon inside iframe" bugs.
  const embedded = new URLSearchParams(window.location.search).get('embedded') === 'true';

  if (embedded) {
    // Embedded/iframe mode: fill the iframe with only the chat window.
    // ChatWidget receives embedded=true so it skips its own floating button.
    return <ChatWidget businessId={businessId} embedded={true} />;
  }

  // Standalone/demo mode: show the Salon landing page + floating ChatWidget button.
  return (
    <>
      <Salon businessId={businessId} />
      <ChatWidget businessId={businessId} />
    </>
  );
}

export default App;
