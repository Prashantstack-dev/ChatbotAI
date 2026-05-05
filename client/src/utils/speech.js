export function speak(text, language = 'en-US') {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = 0.9; // Slightly slower for clarity
  window.speechSynthesis.speak(utterance);
}

// Supported languages in browser TTS:
// en-US, zh-CN (Mandarin), ko-KR (Korean), ar-SA (Arabic)