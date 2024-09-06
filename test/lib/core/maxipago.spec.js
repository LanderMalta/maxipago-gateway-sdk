import dotenv from 'dotenv'
import Gateway from '../../../lib/core/maxipago'
import { describe, it, expect } from 'vitest'

dotenv.config({ path: '../../.env' })

const merchantId = process.env.MP_TEST_ID
const merchantKey = process.env.MP_TEST_KEY

describe('Common Tests', function () {
  it('should throw merchant key error', () => {
    expect(() => new Gateway(merchantId, null, 'development')).toThrow(
      'Merchant Key not found',
    )
  })

  it('should be production env', () => {
    const result = new Gateway(merchantId, merchantKey, 'production')
    expect(() => result).toBeDefined()
  })
})
