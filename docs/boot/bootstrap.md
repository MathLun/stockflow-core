# Bootstrap

`Bootstrap` is a Core Boot contract responsible for initializing an application after its `BootContext` has been prepared.

It is the third contract established in the StockFlow Core Boot model.

---

## Purpose

The `Bootstrap` contract defines the asynchronous application initialization stage of the Core Boot process.

Its responsibility is intentionally narrow:

> Initialize the application using the prepared `BootContext`.

The contract does not define how the initialization is performed.

---

## Contract

The current contract is:

```ts
import type { BootContext } from "./BootContext.js";

export interface Bootstrap {
  bootstrap(context: BootContext): Promise<void>;
}
```

The contract receives a `BootContext` and asynchronously performs the bootstrap operation.

The operation does not return a value.

---

## Processing Model

The conceptual flow is:

```text
BootContext
     │
     ▼
PreProcessor
     │
     ▼
Prepared Context
     │
     ▼
Bootstrap
     │
     │ bootstrap()
     ▼
Promise<void>
     │
     ▼
Next Boot Stage
```

The `Bootstrap` stage represents application initialization rather than context transformation.

---

## Asynchronous Processing

`Bootstrap.bootstrap()` is intentionally asynchronous:

```ts
bootstrap(context: BootContext): Promise<void>;
```

This allows concrete implementations to perform asynchronous initialization when required.

Potential future use cases may include:

- initializing infrastructure;
- preparing application resources;
- registering runtime capabilities;
- loading required modules;
- initializing extensions;
- preparing application-level adapters.

These are potential capabilities, not requirements of the current contract.

---

## Input

The Bootstrap receives a `BootContext`:

```ts
async bootstrap(context: BootContext): Promise<void> {
  // initialization
}
```

The context provides the information required by the bootstrap process.

The contract does not prescribe which parts of the context an implementation must use.

---

## Output

The Bootstrap contract returns:

```ts
Promise<void>
```

For example:

```ts
await bootstrap.bootstrap(context);
```

There is intentionally no returned application object or transformed context.

This distinguishes the Bootstrap stage from the `PreProcessor`.

---

## Relationship With PreProcessor

`PreProcessor` and `Bootstrap` have different responsibilities.

```text
PreProcessor
    │
    └── prepares context
            │
            ▼
        Bootstrap
            │
            └── initializes application
```

The `PreProcessor` can transform or prepare the `BootContext`.

The `Bootstrap` consumes that context and performs application initialization.

This separation prevents both contracts from accumulating the same responsibility.

---

## Context Transformation

The Bootstrap does not define context transformation.

For example:

```ts
const bootstrap: Bootstrap = {
  async bootstrap(context) {
    console.log(context.application.name);
  },
};
```

The implementation consumes the context but does not need to return a new context.

If context preparation is required, that responsibility belongs to the `PreProcessor` stage.

---

## Framework Independence

`Bootstrap` is a framework-agnostic TypeScript contract.

It does not depend on:

- Vue;
- React;
- Angular;
- Svelte;
- DOM APIs;
- browser-specific APIs;
- framework lifecycle APIs.

The same contract can therefore be consumed by different applications and frontend technologies.

---

## Responsibility Boundary

The Bootstrap is responsible for application initialization.

It is not responsible for:

- preprocessing or normalizing the `BootContext`;
- executing the Kernel;
- controlling the entire application lifecycle;
- executing business logic;
- managing UI rendering;
- implementing framework-specific lifecycle behavior;
- authenticating users;
- acting as a dependency injection container;
- implementing business operations.

These responsibilities belong to other architectural components or layers.

---

## Relationship With Core Boot

The current conceptual Core Boot sequence is:

```text
Application
     │
     ▼
BootContext
     │
     ▼
PreProcessor
     │
     ▼
Bootstrap
     │
     ▼
Kernel
```

The currently established contracts are:

```text
BootContext       ✅
PreProcessor      ✅
Bootstrap         ✅
```

The responsibilities and contract of `Kernel` have not yet been finalized.

---

## Design Principles

### Contract First

The Bootstrap contract is established before introducing a concrete production implementation.

The architectural process is:

```text
Requirement
     │
     ▼
Contract
     │
     ▼
Validation
     │
     ▼
Implementation
```

---

### Minimal Responsibility

The contract intentionally contains a single operation:

```ts
bootstrap(context: BootContext): Promise<void>;
```

No additional operations are introduced without a concrete architectural requirement.

---

### Asynchronous by Design

Bootstrap is asynchronous from the beginning.

This allows implementations to perform asynchronous initialization without requiring a future breaking change to the contract.

---

### No Context Transformation

Unlike the `PreProcessor`, the Bootstrap does not return a new `BootContext`.

Its purpose is initialization rather than preprocessing.

---

### Framework Agnostic

The contract must remain independent of the frontend framework used by the consuming application.

---

## Manual Validation

A manual example is maintained under:

```text
bin/bootstrap.ts
```

It demonstrates how a consumer can provide a `Bootstrap` implementation and initialize an application using a `BootContext`.

Example:

```ts
import type {
  BootContext,
  Bootstrap,
} from "@stockflow/core";

const bootstrap: Bootstrap = {
  async bootstrap(context) {
    console.log(context.application.name);
  },
};

await bootstrap.bootstrap(context);
```

The manual example is intended for development experimentation.

It is not part of the package runtime API.

---

## Automated Validation

The contract is validated through automated tests.

The current unit test is located under:

```text
tests/unit/boot/contracts/Bootstrap.test.ts
```

The test validates that:

- a `BootContext` can be passed to the Bootstrap;
- `bootstrap()` is asynchronous;
- the context reaches the Bootstrap implementation;
- the operation resolves with `undefined`, as defined by `Promise<void>`.

---

## Public API

`Bootstrap` is exposed through the public `@stockflow/core` API.

Consumers should import it using:

```ts
import type { Bootstrap } from "@stockflow/core";
```

Consumers should not depend on internal source paths.

The public API flow is:

```text
@stockflow/core
      │
      ▼
src/index.ts
      │
      ▼
boot/contracts/index.ts
      │
      ▼
Bootstrap
```

---

## Scope

The current Bootstrap contract does not define:

- Kernel execution;
- lifecycle management;
- multiple Bootstrap orchestration;
- Bootstrap priority;
- registration mechanisms;
- dependency injection;
- plugin loading;
- error recovery;
- cancellation;
- application state management.

These concerns require separate architectural decisions.

---

## Evolution

`Bootstrap` is part of the public API of `@stockflow/core`.

Changes to this contract may affect consuming applications.

The contract should therefore evolve conservatively.

New responsibilities should follow the StockFlow Core architectural process:

```text
Real Requirement
       │
       ▼
Architectural Decision
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

The architecture should evolve from validated requirements rather than speculative future needs.

---

## Current Status

The `Bootstrap` contract has been established as the third Core Boot contract.

Current capabilities:

- asynchronous application initialization;
- `BootContext` input;
- `Promise<void>` output;
- framework-agnostic TypeScript contract;
- public package export;
- manual validation;
- automated validation;
- documented architectural boundaries.

No concrete production implementation is currently defined by this contract.

---

## Related Components

Current Core Boot contracts:

- [BootContext](./boot-context.md)
- [PreProcessor](./pre-processor.md)
- `Bootstrap`

Future components will be documented as their contracts are established:

- `Kernel`;
- boot lifecycle;
- additional Core Boot contracts.
