import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import express from 'express'

//Mock all external services BEFORE importing controller
vi.mock('../services/ragService.js', () => ({
  runRAG: vi.fn().mockResolvedValue('Mock salon context: prices start at $50')
}))

vi.mock('../services/aiService.js', () => ({
  generateAIResponse: vi.fn().mockResolvedValue('Mock AI reply')
}))

vi.mock('../supabase.js', () => ({
  default: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ error: null }),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({ data: [], error: null })
    }),
  }
}))

//Build a test app (same middleware as real app)
import { handleChat } from '../controllers/chatController.js'

const app = express()
app.use(express.json())
app.post('/api/chat', handleChat)

//Tests
describe('POST /api/chat - Input Validation', () => {
  it('returns 400 when message is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ sessionId: 'test-123' })
    expect(res.status).toBe(400)
    expect(res.body.error).toBeDefined()
  })

    it('returns 400 when sessionId is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'hello' })
    expect(res.status).toBe(400)
  })

   it('returns 400 when message is empty string', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: '', sessionId: 'test-123' })
    expect(res.status).toBe(400)
  })

   it('returns 400 when body is completely empty', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({})
    expect(res.status).toBe(400)
  })
})

describe('POST /api/chat - Success path', () => {
  it('returns 200 with reply when message and sessionId are valid', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'What are your prices?', sessionId: 'test-123' })
    expect(res.status).toBe(200)
    expect(res.body.reply).toBeDefined()
    expect(typeof res.body.reply).toBe('string')
  })
})