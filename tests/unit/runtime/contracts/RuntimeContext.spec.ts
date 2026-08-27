import { describe, expect, it } from 'vitest'
import {
  RuntimeStatus,
  type RuntimeContext,
} from '../../../../src/runtime/contracts/index.js'

describe('RuntimeContext', () => {
  it('should define the expected runtime statuses', () => {
    expect(RuntimeStatus.CREATED).toBe('CREATED')
    expect(RuntimeStatus.STARTING).toBe('STARTING')
    expect(RuntimeStatus.RUNNING).toBe('RUNNING')
    expect(RuntimeStatus.STOPPING).toBe('STOPPING')
    expect(RuntimeStatus.STOPPED).toBe('STOPPED')
  })

  it('should define a valid runtime context', () => {
    const context: RuntimeContext = {
      runtimeId: 'runtime-001',
      instanceName: 'stockflow-dev',
      status: RuntimeStatus.CREATED,
    }

    expect(context.runtimeId).toBe('runtime-001')
    expect(context.instanceName).toBe('stockflow-dev')
    expect(context.status).toBe(RuntimeStatus.CREATED)
  })
})
