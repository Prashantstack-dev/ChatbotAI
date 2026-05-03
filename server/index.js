import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from 'express-rate-limit'
//files
import {handleChat} from "./controllers/chatController.js"
// Clients 
const app = express();

app.use(cors({
  origin: function(origin, callback){
    //Allow requests with no origin (like mobile apps or curl request)
    if(!origin)return
    callback(null,true);

    //Check if the origin is my production url or a vercel preview url
    if(orign=== process.env.VITE_CLIENT_URL || origin.endswith('-prashantstack-devs-projects.vercel.app')){
      callback(null,true);

    }else{
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials:false
  
}));

// Middleware (Body parser)
app.use(express.json());

// rate-limit 
// Ensure CORS is applied before any early return middleware, or ensure error responses also include CORS headers.
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,  // ← 50 requests per minute for demo
  message: { error: 'Please slow down a bit 😊' }
});

app.use('/api/chat', limiter)

//Health check 
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//  what customers are asking
app.get('/api/admin/conversations/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
//  Chat route 
app.post("/api/chat", handleChat)


// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});