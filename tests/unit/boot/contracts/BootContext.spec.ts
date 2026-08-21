import { describe, expect, it } from "vitest";
import type { BootContext } from "../../../src/boot/contracts/index.js";

describe("BootContext", () => {
  it("should represent a valid application boot context", () => {
    const context: BootContext = {
      application: {
        name: "stockflow-web",
        version: "0.1.0",
      },
      environment: {
        mode: "development",
      },
    };

    expect(context.application.name).toBe("stockflow-web");
    expect(context.application.version).toBe("0.1.0");
    expect(context.environment.mode).toBe("development");
  });
});
