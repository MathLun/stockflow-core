# BootContext

`BootContext` is the foundational context contract of the StockFlow Core Boot system.

It provides the minimum application and environment information required during the application boot process.

---

## Purpose

The `BootContext` exists to provide a stable and framework-agnostic representation of the application being initialized.

It provides contextual information that Core Boot components can consume without coupling the contract to a specific frontend framework, application implementation, or runtime.

The contract currently represents two fundamental concerns:

- application identity;
- execution environment.

---

## Contract

The `BootContext` contract is defined as:

```ts
export interface BootContext {
  readonly application: BootApplication;
  readonly environment: BootEnvironment;
}
```

The context is intentionally small.

It should represent the information necessary to understand **which application is being initialized and in which environment it is running**.

---

## Application

`BootApplication` identifies the application being initialized.

```ts
export interface BootApplication {
  readonly name: string;
  readonly version: string;
}
```

### Name

The `name` identifies the application consuming the StockFlow Core.

For example:

```ts
name: "stockflow-web"
```

The Core Boot system should not assume that the consuming application is the StockFlow WebApp.

The same Core package may eventually be consumed by different applications.

---

### Version

The `version` identifies the version of the consuming application.

It is intentionally required.

For example:

```ts
version: "0.1.0"
```

The application version and the Core package version are independent concepts.

For example:

```text
StockFlow WebApp
version: 0.1.0

@stockflow/core
version: 0.1.0
```

They may evolve independently.

A future application may therefore use:

```text
StockFlow WebApp
version: 1.4.0

@stockflow/core
version: 0.8.0
```

The `BootContext` represents the version of the application being initialized, not the version of `@stockflow/core`.

---

## Environment

`BootEnvironment` describes the execution environment of the application.

The current environment modes are:

```ts
type BootEnvironmentMode =
  | "development"
  | "test"
  | "production";
```

The environment is represented through:

```ts
export interface BootEnvironment {
  readonly mode: BootEnvironmentMode;
}
```

The structure intentionally remains small.

Additional environment information should only be introduced when an actual Core Boot requirement justifies it.

---

## Complete Context

A valid `BootContext` can be represented as:

```ts
const context: BootContext = {
  application: {
    name: "stockflow-web",
    version: "0.1.0",
  },
  environment: {
    mode: "development",
  },
};
```

The resulting conceptual structure is:

```text
BootContext
│
├── application
│   ├── name
│   └── version
│
└── environment
    └── mode
```

---

## Design Principles

### Framework Agnostic

`BootContext` does not depend on Vue, React, Angular, Svelte, or any other frontend framework.

It is a pure TypeScript contract.

This allows the same Core Boot model to be consumed by different applications and frontend technologies.

---

### Immutable Context

The properties of `BootContext` are declared as `readonly`.

```ts
readonly application: BootApplication;
readonly environment: BootEnvironment;
```

Core Boot components should consume the context rather than arbitrarily mutate it.

The context represents the state provided to the boot process.

---

### Minimal Responsibility

`BootContext` is intentionally not a general-purpose container.

It is not:

- a service container;
- a dependency injection container;
- a configuration registry;
- an application state manager;
- an API client;
- a plugin registry;
- an extension manager.

Its responsibility is limited to representing boot-time application context.

---

### Public API Boundary

`BootContext` is exposed through the public `@stockflow/core` API.

Consumers should import the contract through the package:

```ts
import type { BootContext } from "@stockflow/core";
```

Consumers should not depend on internal source paths such as:

```ts
import type { BootContext } from "../src/boot/contracts/BootContext.js";
```

Internal source paths are implementation details.

The public package API is the stable boundary between StockFlow Core and its consumers.

---

## Framework Independence

The Core Boot contracts must remain independent from the UI framework.

The following applications should be able to consume the same contract:

```text
@stockflow/core
       │
       ├── StockFlow WebApp
       │      └── Vue
       │
       ├── React application
       │
       ├── Angular application
       │
       └── Svelte application
```

The contract must therefore avoid framework-specific types or abstractions.

For example, `BootContext` must not depend on:

```text
Vue
React
Angular
Svelte
Browser APIs
DOM APIs
```

unless a future Core requirement explicitly justifies such a dependency.

---

## Relationship With Core Boot

`BootContext` is a foundational contract for the Core Boot lifecycle.

Future Core Boot components may consume this context.

Conceptually:

```text
Application
     │
     ▼
BootContext
     │
     ├── PreProcessor
     │
     ├── Bootstrap
     │
     └── Kernel
```

The exact lifecycle and responsibilities of these components will be defined by their own contracts.

`BootContext` should not contain their responsibilities.

---

## Future Core Boot Components

The Core Boot architecture is expected to evolve around components such as:

```text
Core Boot
│
├── BootContext
├── PreProcessor
├── Bootstrap
├── Kernel
└── Lifecycle
```

These components should depend on explicit contracts rather than directly coupling themselves to internal implementations.

The `BootContext` provides the foundational contextual information required by this lifecycle.

The contracts for these components will be introduced incrementally as the architecture evolves.

---

## Scope

The current `BootContext` contract does not define:

- dependency injection;
- service registration;
- application configuration;
- authentication;
- authorization;
- API clients;
- frontend state;
- plugin registration;
- extension management;
- persistence;
- routing;
- UI state;
- business domain state.

These concerns belong to other architectural boundaries.

They should only become part of Core Boot when a concrete requirement justifies their inclusion.

---

## Why the Context Is Small

A boot context can easily become a container for unrelated information.

That should be avoided.

Instead of continuously adding properties such as:

```ts
interface BootContext {
  application: ...;
  environment: ...;
  config: ...;
  services: ...;
  router: ...;
  api: ...;
  user: ...;
  permissions: ...;
  plugins: ...;
}
```

the architecture should introduce dedicated contracts when new responsibilities emerge.

This keeps `BootContext` cohesive and prevents it from becoming a God Object.

---

## Evolution

`BootContext` is part of the public API of `@stockflow/core`.

Changes to this contract may therefore affect applications consuming the package.

New properties or responsibilities should be introduced conservatively.

Before extending the contract, the architectural requirement should be identified and validated.

The preferred evolution model is:

```text
Real requirement
      │
      ▼
Architectural decision
      │
      ▼
Contract
      │
      ▼
Implementation
      │
      ▼
Tests
      │
      ▼
Documentation
```

The contract should evolve from real requirements rather than speculative future features.

---

## Usage Example

A consuming application can create a `BootContext` using the public package API:

```ts
import type { BootContext } from "@stockflow/core";

const context: BootContext = {
  application: {
    name: "stockflow-web",
    version: "0.1.0",
  },
  environment: {
    mode: "development",
  },
};
```

The context can then be provided to future Core Boot components.

For example, a future bootstrap process may conceptually receive:

```ts
bootstrap(context);
```

The exact `Bootstrap` contract will be defined separately.

---

## Validation

The `BootContext` contract is validated at multiple levels.

### TypeScript Validation

TypeScript validates that objects satisfy the contract:

```ts
const context: BootContext = {
  application: {
    name: "stockflow-web",
    version: "0.1.0",
  },
  environment: {
    mode: "development",
  },
};
```

Invalid structures should be rejected by the TypeScript compiler.

---

### Manual Runtime Validation

A manual example is maintained under:

```text
bin/boot-context.ts
```

The `bin` directory is intended for manual execution and experimentation with Core contracts and implementations.

It is not part of the Core runtime itself.

---

### Automated Tests

Automated validation is maintained separately from manual experiments.

Unit tests are located under:

```text
tests/unit/
```

Package/API tests validate the public package boundary.

For example:

```ts
import type { BootContext } from "@stockflow/core";
```

This ensures that the contract is available through the public package API rather than only through internal source paths.

---

## Package API

`BootContext` is exposed through the package entry point:

```text
@stockflow/core
      │
      ▼
src/index.ts
      │
      ▼
boot/contracts
      │
      ▼
BootContext
```

After compilation:

```text
src/
  index.ts

      │
      │ TypeScript
      ▼

dist/
  index.js
  index.d.ts
```

The package consumer interacts with the public API rather than the internal source structure.

---

## Architectural Boundary

The relationship between the application and Core Boot can be represented as:

```text
StockFlow Application
        │
        │ consumes
        ▼
@stockflow/core
        │
        ▼
Core Boot Contracts
        │
        ├── BootContext
        ├── PreProcessor
        ├── Bootstrap
        └── Kernel
```

The application provides contextual information.

Core Boot consumes that context to coordinate the boot lifecycle.

The Core Boot layer should remain independent from the concrete frontend framework.

---

## Current Status

The `BootContext` contract is the first contract established in the StockFlow Core Boot model.

Current capabilities:

- application name;
- application version;
- execution environment;
- framework-agnostic TypeScript contract;
- public package export;
- manual validation;
- automated validation;
- documented architectural boundaries.

Future Core Boot contracts will be introduced incrementally.

---

## Related Components

Future documentation will cover the remaining Core Boot components as their contracts are established:

- `PreProcessor`;
- `Bootstrap`;
- `Kernel`;
- boot lifecycle;
- additional Core Boot contracts.

These components should not be implemented or documented as finalized architecture until their respective contracts and responsibilities have been established.
