import { describe, it, expect } from "vitest";
import type { RuntimeEnvironment } from "../../../../src/runtime/contracts/index.js";

describe("RuntimeEnvironment", () => {
    it("should represent a valid runtime environment", () => {
        const environment: RuntimeEnvironment = {
            mode: "development",
        };

        expect(environment.mode).toBe("development");
    });
});
