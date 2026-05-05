import assert from 'node:assert/strict'

import { loadStoredJson } from './storage.js'

const fallback = { existing: true }

assert.deepEqual(
  loadStoredJson('{"today":{"intention":"ship"}}', fallback),
  { today: { intention: 'ship' } },
  'loads valid stored JSON'
)

assert.deepEqual(
  loadStoredJson('{not valid json', fallback),
  fallback,
  'falls back when stored JSON is corrupt'
)

assert.deepEqual(
  loadStoredJson('', fallback),
  fallback,
  'falls back for empty storage values'
)

console.log('storage tests passed')
