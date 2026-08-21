import { describe, expect, it } from "vitest";
import type {
  BootContext,
  PreProcessor,
} from "@stockflow/core";

describe("PreProcessor contract", () => {
  it("processes a BootContext asynchronously", async () => {
    const context: BootContext = {
      application: {
        name: "stockflow-web",
        version: "0.1.0",
      },
      environment: {
        mode: "test",
      },
    };

    const preProcessor: PreProcessor = {
      async process(context) {
        return context;
      },
    };

    const result = await preProcessor.process(context);

    expect(result).toEqual(context);
  });
});
