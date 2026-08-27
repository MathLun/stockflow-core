import {
  RuntimeStatus,
  type RuntimeContext,
} from '../src/runtime/contracts/index.js'

const context: RuntimeContext = {
  runtimeId: 'runtime-001',
  instanceName: 'stockflow-dev',
  status: RuntimeStatus.CREATED,
}

console.log('Runtime Context:', context)
console.log('Runtime ID:', context.runtimeId)
console.log('Instance Name:', context.instanceName)
console.log('Status:', context.status)
