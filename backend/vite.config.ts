import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/models/**.InMemory.ts', '**/*.spec.ts', '**/exceptions/**'],
    passWithNoTests: true,
    coverage: {
      provider: 'c8',
    },
  },
})
