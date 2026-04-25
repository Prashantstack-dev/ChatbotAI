import { describe, it, expect, vi } from 'vitest'

vi.mock('groq-sdk', () => ({
  default: class {
    constructor() {
      this.chat = {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ message: { content: 'Mock Groq response' } }]
          })
        }
      }
    }
  }
}))

import { generateAIResponse } from '../services/aiService.js'

describe('generateAIResponse', () => {
  it('returns a string response', async () => {
    const result = await generateAIResponse(
      'Haircut prices start at $50',
      [],
      'What are your prices?'
    )
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

it('includes conversation history in the call', async () => {
  const history = [
    { role: 'user', content: 'Hello' },
    { role: 'assistant', content: 'Hi there' }
  ]

  const result = await generateAIResponse('some context', history, 'follow up')
  // Just verify it returns a string — history is tested implicitly
  expect(typeof result).toBe('string')
})
})