type BootEnvironmentMode =
  | "development"
  | "test"
  | "production";

export interface BootEnvironment {
	readonly mode: BootEnvironmentMode
}
