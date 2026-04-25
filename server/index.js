import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from 'express-rate-limit'
//files
import {handleChat} from "./controllers/chatController.js"
// Clients 
const app = express();

// rate-limit
const limiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 10,              // 10 requests per minute per IP
  message: { error: 'Too many requests, slow down' }
})

app.use('/api/chat', limiter)

// Middleware
app.use(express.json());

app.use(cors({
  origin: process.env.VITE_CLIENT_URL || ["http://localhost:5173", "http://localhost:5174"]
}));

//Health check 
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//  Chat route 
app.post("/api/chat", handleChat)


// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});