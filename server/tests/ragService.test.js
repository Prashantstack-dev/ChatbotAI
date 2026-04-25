import { describe, it, expect, vi } from 'vitest'

// Mock HuggingFace
vi.mock('@huggingface/inference', () => ({
  HfInference: class {
    constructor() {
      this.featureExtraction = vi.fn().mockResolvedValue([[0.1, 0.2, 0.3]])
    }
  }
}))

// Mock Supabase
vi.mock('../supabase.js', () => ({
  default: {
    rpc: vi.fn().mockResolvedValue({
      data: [
        { content: 'Haircut prices start at $50' },
        { content: 'Open Monday to Saturday 9am-6pm' }
      ],
      error: null
    })
  }
}))

import { runRAG } from '../services/ragService.js'

describe('runRAG', () => {
  it('returns context string when documents found', async () => {
    const result = await runRAG('What are your prices?')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
    expect(result).toContain('Haircut prices')
  })

   it('returns fallback string when no documents found', async () => {
    // Override mock to return empty
    const supabase = await import('../supabase.js')
    supabase.default.rpc.mockResolvedValueOnce({ data: [], error: null })

    const result = await runRAG('random unrelated question')
    expect(result).toContain("don't have that exact information")
  })

    it('throws when Supabase returns an error', async () => {
    const supabase = await import('../supabase.js')
    supabase.default.rpc.mockResolvedValueOnce({
      data: null,
      error: new Error('DB connection failed')
    })
    await expect(runRAG('test')).rejects.toThrow()
  })
})
