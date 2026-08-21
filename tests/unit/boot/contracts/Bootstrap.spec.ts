import { describe, expect, it } from "vitest";
import type {
  BootContext,
  Bootstrap,
} from "@stockflow/core";

describe("Bootstrap contract", () => {
  it("bootstraps a BootContext asynchronously", async () => {
    const context: BootContext = {
      application: {
        name: "stockflow-web",
        version: "0.1.0",
      },
      environment: {
        mode: "test",
      },
    };

    let receivedContext: BootContext | undefined;

    const bootstrap: Bootstrap = {
      async bootstrap(context) {
        receivedContext = context;
      },
    };

    const result = await bootstrap.bootstrap(context);

    expect(result).toBeUndefined();
    expect(receivedContext).toEqual(context);
  });
});
