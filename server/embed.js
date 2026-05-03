
// import 'dotenv/config'
// import fs from 'node:fs';

// import OpenAI from "openai";
// import supabase from './supabase.js';

// import { HfInference } from '@huggingface/inference'
// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// const useLocal = process.env.USE_LOCAL === 'true'



// const hf = useLocal 


// const openai = new OpenAI();



// //Reading files with Node.js
// const text =fs.readFileSync('./data/restaurant.txt','utf8');
// const chunks = text.split(/\r?\n\r?\n/);
// const filtered = chunks.filter((chunk)=> chunk.trim().length > 0)
// console.log(filtered);

// async function embedDocuments() {
//   // 
//   for (const chunk of filtered) {
//     try{
// //  const embedding = await openai.embeddings.create({
// //         model: "text-embedding-3-small",
// //         input: chunk.replace(/\r?\n/g, ''), //can only be string or arrays of string also sends one chunk, cleans line breaks
// //         encoding_format: "float",
// //     })
// //embedding for huggingface
// //  const embedding = await hf.featureExtraction({
// //         model: "sentence-transformers/all-MiniLM-L6-v2",
// //         // model: "BAAI/bge-small-en-v1.5",
// //         inputs: chunk.replace(/\s+/g, " ").trim(), //can only be string or arrays of string also sends one chunk, cleans line breaks
    
// //     })
// //FOR GROK


//     //for openAI
//     // const vector = embedding.data[0].embedding
//     //for huggingface
//      const vector = embedding
//     const {error} = await supabase
//     .from('documents_local')
//     .insert({content: chunk, embedding:vector})
   
//     if (error) throw error
//       console.log('Embedded:', chunk.substring(0, 50))
//     }catch (err) {
//       console.error('Failed chunk:', err.message)
//     }
//   }
// }

// embedDocuments();


import "dotenv/config";
import fs from "node:fs";
import { HfInference } from "@huggingface/inference";
import supabase from "./supabase.js";

//  Setup 
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Read and chunk document
const text = fs.readFileSync("./data/KimData.txt", "utf8");
const chunks = text
  .split(/\r?\n\r?\n/)
  .filter((chunk) => chunk.trim().length > 0);

console.log(`Found ${chunks.length} chunks to embed`);

// Embed and store each chunk 
async function embedDocuments({businessId}) {
  for (const chunk of chunks) {
    try {
      // Get embedding from HuggingFace
      const rawVector = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: chunk.replace(/\r?\n/g, " "),
      });

      // Flatten nested array → [0.1, 0.2, ...] (384 numbers)
      const vector = rawVector.flat();

      // Store in Supabase documents_local table
      const { error } = await supabase
        .from("documents_local")
        .insert({ content: chunk, embedding: vector, business_id:businessId  //Tag with business ID
          });

      if (error) throw error;

      console.log("Embedded:", chunk.substring(0, 60) + "...");
    } catch (err) {
      console.error("Failed chunk:", err.message);
    }
  }

  console.log(`Done embedding all chunks for ${businessId}.`);
}

embedDocuments({businessId: "salon-sydney"});