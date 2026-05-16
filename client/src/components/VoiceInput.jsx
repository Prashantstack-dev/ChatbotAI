// VoiceInput.jsx — custom hook for browser-native speech recognition.
// No external APIs (Google Cloud, Azure) are used.
// The browser's built-in webkitSpeechRecognition handles all transcription.

import { useState, useEffect, useRef, useCallback } from 'react';

// useVoiceInput — accepts:
//   onTranscript : callback that receives the recognised text string
//   language     : BCP-47 language tag (e.g. 'en-US', 'zh-CN') from the dropdown
// Returns: { isListening, toggleListening }
export function useVoiceInput(onTranscript, language = 'en-US') {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // Keep a ref to the callback so the recognition effect doesn't
  // re-run on every render just because the function reference changes.
  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  // Re-create the SpeechRecognition instance whenever the selected language changes.
  // This is the key wiring between the header dropdown and the mic button.
  useEffect(() => {
    // Guard: webkitSpeechRecognition is supported in Chrome, Edge and Safari.
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Voice input requires Chrome, Edge or Safari.');
      return;
    }

    const recog = new window.webkitSpeechRecognition();
    recog.continuous = false;     // Capture one utterance then stop
    recog.interimResults = false; // Only return the final confirmed transcript

    // Language comes from the user's dropdown selection — no auto-detection needed.
    recog.lang = language;

    // Fill the textarea with the recognised text
    recog.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscriptRef.current(transcript);
      setIsListening(false);
    };

    // Reset on any recognition error (e.g. no mic permission, timeout)
    recog.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    // Reset when recognition ends naturally (silence timeout, etc.)
    recog.onend = () => setIsListening(false);

    setRecognition(recog);
  }, [language]); // Re-init only when the selected language changes

  // Toggle function returned to ChatInput to wire to the mic button
  const toggleListening = useCallback(() => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  }, [recognition, isListening]);

  return { isListening, toggleListening };
}