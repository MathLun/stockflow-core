import { describe, it, expect } from "vitest";
import type { RuntimeApplication } from "../../../../src/runtime/contracts/index.js";

describe("RuntimeApplication", () => {
    it("should represent a valid runtime application", () => {
        const application: RuntimeApplication = {
            name: "StockFlow",
            version: "0.1.0",
        };

        expect(application.name).toBe("StockFlow");
        expect(application.version).toBe("0.1.0");
    });
});
