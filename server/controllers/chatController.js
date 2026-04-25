import { runRAG } from "../services/ragService.js";
import { generateAIResponse } from "../services/aiService.js";
import supabase from "../supabase.js";

export async function handleChat(req, res) {
  try {
    const { message, sessionId } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({ error: "Missing message or sessionId" });
    }

    // 1. Get recent conversation history (limited)
    const { data: history } = await supabase
      .from("chat_sessions")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(10);

    // 2. Save user message to DB
    await supabase.from("chat_sessions").insert({
      session_id: sessionId,
      role: "user",
      content: message,
    });

    // 3. Fetch RAG context
    const context = await runRAG(message);

    // 4. Generate AI response
    // Safety fallback: If history exists, use it. Otherwise, use an empty list history || []
    const reply = await generateAIResponse(context, history || [], message);

    // 5. Save assistant reply to DB
    await supabase.from("chat_sessions").insert({
      session_id: sessionId,
      role: "assistant",
      content: reply,
      
    });

    res.json({ reply });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
}