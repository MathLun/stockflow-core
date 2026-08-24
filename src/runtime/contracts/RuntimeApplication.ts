/**
 * Represents the application identity available to Core Runtime.
 *
 * RuntimeApplication is intentionally independent from Core Boot
 * contracts and contains only the minimum identity required by Runtime.
 */
export interface RuntimeApplication {
	name: string;
	version: string;
}
