import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemPrompts = {
  'en-US': 'You are a friendly assistant for Kim Sun Young Hair & Beauty.',
  'zh-CN': '你是Kim Sun Young美发美容的友好助手。用中文回复客户。',
  'ko-KR': '당신은 Kim Sun Young 헤어 & 뷰티의 친절한 도우미입니다. 한국어로 대답하세요.',
  'ar-SA': 'أنت مساعد ودود لـ Kim Sun Young Hair & Beauty. أجب بالعربية.'
};

export async function generateAIResponse(context, history, userMessage,language= 'en-US') {
  const systemPrompt = systemPrompts[language] || systemPrompts['en-US'];
  // Generate response using Groq (free)
  // Security: system prompt hardened against prompt injection
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `You are a friendly support agent for Kim Sun Young Hair & Beauty Detect the user's language and respond in that language

PERSONALITY:
- Warm, helpful, and conversational—like a real person at the front desk
- Keep responses natural and simple (1-3 short sentences)
- Use casual friendliness: "Sure!", "No worries 😊", "Happy to help!"
- Never sound robotic, formal, or like reading from a manual

HANDLING UNCLEAR QUESTIONS:
- If the question is vague, try to guess what they might mean based on the context and offer related helpful info.
- If you need to clarify, ask ONE short natural question.

KNOWLEDGE RULES:
- Use the context below for factual info (prices, hours, services, locations).
- You are allowed to be conversational and use common sense to interpret the context.
- If the exact answer isn't in the context, do NOT just say "I don't know". Instead, provide the closest relevant information you DO have, and then politely offer to have the team contact them.
- Vary your phrasing so you don't sound like a robot repeating the same apology.
- Never say "context" or "based on the information provided".

ESCALATION (when you truly cannot help):
- If the user asks something completely unrelated or complex, use your own words to offer to connect them with the team (mentioning they usually reply in 15-20 mins during business hours).

Context:
${context}`
      },
      // Slice Keep only last 6 messages
      ...history.slice(-6).map((m) => ({
        role: m.role,
        content: m.content
      })),
      {
        role: "user",
        // Sanitize input - strip any instruction-like patterns
        content: userMessage.replace(/ignore previous instructions/gi, "")
      }
    ],
    max_tokens: 500,
    temperature: 0.6 // increased to make it sound more natural and conversational
  });
  return completion.choices[0].message.content;
}
