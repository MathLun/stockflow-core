/**
 * Represents the execution environment available to Core Runtime.
 *
 * RuntimeEnvironment is intentionally independent from Core Boot
 * contracts and contains only the environment information required
 * by Runtime.
 */
type RuntimeEnvironmentMode =
    | "development"
    | "test"
    | "production";

/**
 * Represents the execution environment available to Core Runtime.
 */
export interface RuntimeEnvironment {
    readonly mode: RuntimeEnvironmentMode;
}
