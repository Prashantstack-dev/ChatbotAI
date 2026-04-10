
import 'dotenv/config'
import fs from 'node:fs';

import OpenAI from "openai";
import supabase from './supabase.js';

const openai = new OpenAI();

//Reading files with Node.js
const text =fs.readFileSync('./data/restaurant.txt','utf8');
const chunks = text.split(/\r?\n\r?\n/);
const filtered = chunks.filter((chunk)=> chunk.trim().length > 0)
console.log(filtered);

async function embedDocuments() {
  // 
  for (const chunk of filtered) {
    try{
 const embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: chunk.replace(/\r?\n/g, ''), //can only be string or arrays of string also sends one chunk, cleans line breaks
        encoding_format: "float",
    })
    const vector = embedding.data[0].embedding
    const {error} = await supabase
    .from('documents')
    .insert({content: chunk, embedding:vector})
    if (error) throw error
      console.log('Embedded:', chunk.substring(0, 50))
    }catch (err) {
      console.error('Failed chunk:', err.message)
    }
  }
}

embedDocuments();