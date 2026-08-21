import type { BootApplication, BootEnvironment }
from './types/index.js';

export interface BootContext {
  readonly application: BootApplication;
  readonly environment: BootEnvironment;
}
