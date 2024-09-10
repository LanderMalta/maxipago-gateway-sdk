import dotenv from 'dotenv'
import maxipago from '../index'
import { describe, it, expect } from 'vitest'

dotenv.config({ path: '../.env' })

describe('index.js', () => {
  it('should export the correct module', () => {
    expect(maxipago).toBeDefined()
  })
})
