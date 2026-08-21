import type { BootContext } from "./BootContext.js";

export interface Bootstrap {
  bootstrap(context: BootContext): Promise<void>;
}
