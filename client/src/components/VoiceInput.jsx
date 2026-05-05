import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceInput({ onTranscript, language = 'en-US' }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in this browser. Use Chrome.');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    
    recog.continuous = false; // Stop after one sentence
    recog.interimResults = false;
    recog.lang = language; // 'en-US', 'zh-CN', 'ko-KR', 'ar-SA'

    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript); // Send to parent component
      setIsListening(false);
    };

    recog.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    setRecognition(recog);
  }, [language]);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <>
    <button
      onClick={toggleListening}
      className={`p-3 rounded-full ${
        isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
      }`}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>

    {/* When user speaks, show listening animation */}
{isListening && (
  <div className="flex items-center gap-2 text-blue-500">
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100" />
    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200" />
    <span>Listening...</span>
  </div>
)}
      </>
  );
}