import { describe, expect, it } from "vitest";
import {
  RuntimeStatus,
  type RuntimeApplication,
  type RuntimeContext,
  type RuntimeEnvironment,
  type BootContext,
} from "@stockflow/core";

describe("@stockflow/core public API", () => {
  it("should expose the BootContext contract", () => {
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

  it("should expose the Runtime contracts", () => {
    const application: RuntimeApplication = {
      name: "StockFlow",
      version: "0.1.0",
    };

    const environment: RuntimeEnvironment = {
      mode: "development",
    };

    const context: RuntimeContext = {
      runtimeId: "runtime-001",
      instanceName: "stockflow-dev",
      status: RuntimeStatus.CREATED,
    };

    expect(application.name).toBe("StockFlow");
    expect(application.version).toBe("0.1.0");

    expect(environment.mode).toBe("development");

    expect(context.runtimeId).toBe("runtime-001");
    expect(context.instanceName).toBe("stockflow-dev");
    expect(context.status).toBe(RuntimeStatus.CREATED);
  });
});
