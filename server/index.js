import "dotenv/config";
import supabase from './supabase.js'
import express from "express";
import OpenAI from "openai";
import cors from 'cors';
// Create the app
const app = express();
//Create the AI modal
const client = new OpenAI();

// Listen on port from env variable
const port = process.env.PORT || 3000;

// when React sends data to your backend, it sends JSON. Without this line, req.body will be undefined
app.use(express.json());

//read from .env,
app.use(cors({origin: process.env.CLIENT_URL}))


app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
    //!! converts any value to a true boolean. Used for debugging when you want to confirm something exists without printing its actual value 
    console.log("API kEY Exists", !!process.env.OpenAI_API_KEY)
  const { message } = req.body;
  console.log(req.body)
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    });
    res.json({ reply: response.choices[0].message.content });
    
  } catch (err) {
    console.error("Error calling OpenAI:", err);
    res.status(500).json({error: 'Something went west', detail: err.message })
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port : http://localhost:${port}`);
});
