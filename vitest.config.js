import { defineConfig } from 'vitest/config'
import dotenv from 'dotenv'

dotenv.config()
export default defineConfig({
  test: {
    include: ['test/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist'],

    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
})
