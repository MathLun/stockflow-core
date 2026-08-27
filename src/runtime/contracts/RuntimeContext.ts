import type { RuntimeStatus } from "./RuntimeStatus.js";

export interface RuntimeContext {
  readonly runtimeId: string;
  readonly instanceName: string;
  readonly status: RuntimeStatus;
}
