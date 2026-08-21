import type { BootContext } from "./BootContext.js";

interface PreProcessor {
  process(context: BootContext): Promise<BootContext>;
}
