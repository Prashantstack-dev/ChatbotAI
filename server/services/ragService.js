import { HfInference } from "@huggingface/inference";
import supabase from "../supabase.js";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function runRAG(userMessage, businessId= null) {
  //  Embed the user message using HuggingFace (free)
  const rawVector = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: userMessage
  });

  const vector = rawVector.flat(); // flatten nested array

  // Find similar chunks in Supabase
  const { data, error } = await supabase.rpc("match_documents_local", {
    query_embedding: vector,
    match_threshold: 0.3, // lowered for better recall
    match_count: 3,
    filter_business_id: businessId || null //filter by business
  });
  
  if (!businessId) {
  throw new Error("businessId is required for RAG");
}

  if (error) throw error;

  // Build context from retrieved chunks
  const context = data?.map((doc) => doc.content).join("\n\n") || "";

  // Fallback if nothing found in database
  if (!context) {
    return "I don't have that exact information. For more help, please call us or visit our website.";
  }

  return context;
}
