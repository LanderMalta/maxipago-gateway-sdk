import dotenv from 'dotenv'
import { describe, it, expect } from 'vitest'
import formatMaxiPagoResponse from '../../../lib/utils/formatMaxiPagoResponse'

dotenv.config({ path: '../.env' })

describe('Testing formatMaxiPagoResponse', () => {
  it('should correctly convert XML response to native types', () => {
    const mockXmlResponse = {
      data: `
        <response>
          <customer>
            <id>123</id>
            <isActive>true</isActive>
            <balance>1000</balance>
            <name>John Doe</name>
          </customer>
        </response>
      `,
    }

    const jsonResponse = formatMaxiPagoResponse(mockXmlResponse)

    expect(jsonResponse.customer.id).toBe(123)
    expect(jsonResponse.customer.isActive).toBe(true)
    expect(jsonResponse.customer.balance).toBe(1000)
    expect(jsonResponse.customer.name).toBe('John Doe')
  })

  it('should handle unknown values gracefully', () => {
    const mockXmlResponse = {
      data: `
        <response>
          <unknownValue>foobar</unknownValue>
        </response>
      `,
    }
    const jsonResponse = formatMaxiPagoResponse(mockXmlResponse)

    expect(jsonResponse.unknownValue).toBe('foobar')
  })

  it('should convert "false" string to boolean false', () => {
    const mockXmlResponse = {
      data: `
        <response>
          <isActive>false</isActive>
        </response>
      `,
    }

    const jsonResponse = formatMaxiPagoResponse(mockXmlResponse)
    expect(jsonResponse.isActive).toBe(false)
  })
})
