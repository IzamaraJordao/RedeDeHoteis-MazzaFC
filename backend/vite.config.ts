import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    passWithNoTests: true,
    coverage: {
      exclude: ['**/.InMemory.ts', '**/*.spec.ts', '**/exceptions/**'],
      provider: 'c8',
    },
  },
})
