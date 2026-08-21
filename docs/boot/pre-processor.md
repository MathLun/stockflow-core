# PreProcessor

`PreProcessor` is a Core Boot contract responsible for preparing a `BootContext` before the application proceeds to the next stage of the boot process.

It is the second contract established in the StockFlow Core Boot model.

---

## Purpose

The `PreProcessor` provides a framework-agnostic contract for asynchronous preparation of the application boot context.

Its responsibility is intentionally narrow:

> Prepare the `BootContext` for the next stage of the boot process.

The contract does not define how the preparation is performed.

---

## Contract

The current contract is:

```ts
import type { BootContext } from "./BootContext.js";

export interface PreProcessor {
  process(context: BootContext): Promise<BootContext>;
}
```

The contract receives a `BootContext` and asynchronously produces a `BootContext`.

---

## Processing Model

The conceptual flow is:

```text
BootContext
     │
     ▼
PreProcessor
     │
     │ process()
     ▼
Promise<BootContext>
     │
     ▼
Next Boot Stage
```

The returned context represents the result of the preprocessing stage.

---

## Asynchronous Processing

`PreProcessor.process()` is intentionally asynchronous.

```ts
process(context: BootContext): Promise<BootContext>;
```

This allows implementations to perform asynchronous preparation when required by the application.

Potential future use cases may include:

- loading configuration;
- resolving environment information;
- preparing capabilities;
- querying infrastructure;
- executing asynchronous preparation steps;
- preparing data required by the next boot stage.

These are potential capabilities, not requirements of the current contract.

---

## Input

The processor receives a `BootContext`:

```ts
async process(context: BootContext): Promise<BootContext> {
  // preparation
}
```

The input represents the context established for the application boot process.

The `PreProcessor` should consume the context rather than assume knowledge about the frontend framework.

---

## Output

The processor returns:

```ts
Promise<BootContext>
```

For example:

```ts
const processedContext = await preProcessor.process(context);
```

The resulting context can then be passed to the next stage of the boot process.

Conceptually:

```text
context
   │
   ▼
PreProcessor
   │
   ▼
processedContext
   │
   ▼
Next Stage
```

---

## Context Transformation

The contract allows an implementation to return the same context:

```ts
const preProcessor: PreProcessor = {
  async process(context) {
    return context;
  },
};
```

It can also return a derived context when a concrete preprocessing requirement exists:

```ts
const preProcessor: PreProcessor = {
  async process(context) {
    return {
      ...context,
    };
  },
};
```

The contract does not prescribe a specific transformation strategy.

---

## Framework Independence

`PreProcessor` is a pure TypeScript contract.

It does not depend on:

- Vue;
- React;
- Angular;
- Svelte;
- DOM APIs;
- browser-specific APIs;
- framework lifecycle APIs.

This allows the same Core Boot contract to be consumed by different applications and frontend technologies.

---

## Responsibility Boundary

The `PreProcessor` is responsible for preparation.

It is not responsible for the entire application boot lifecycle.

The following responsibilities are intentionally outside the current contract:

- starting the Kernel;
- initializing the frontend framework;
- executing business logic;
- managing application state;
- authenticating users;
- registering plugins;
- managing extensions;
- acting as a dependency injection container;
- performing API business operations.

These responsibilities may belong to other architectural components or layers.

---

## Relationship With BootContext

`PreProcessor` directly depends on the `BootContext` contract.

```text
BootContext
     │
     ▼
PreProcessor
```

The context is the input to the preprocessing stage.

The relationship is intentionally explicit:

```ts
process(context: BootContext): Promise<BootContext>;
```

This keeps the contract strongly typed while maintaining framework independence.

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

Only `BootContext` and `PreProcessor` are currently established as contracts.

`Bootstrap` and `Kernel` remain future architectural decisions and should not be assumed to have finalized responsibilities yet.

---

## Design Principles

### Contract First

The `PreProcessor` contract is established before introducing a concrete implementation.

The architectural flow is:

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

The contract intentionally contains only one operation:

```ts
process(context: BootContext): Promise<BootContext>;
```

Additional operations should only be introduced when a concrete requirement justifies them.

---

### Asynchronous by Design

The preprocessing stage is asynchronous from the beginning.

This avoids forcing future implementations into a synchronous model when asynchronous preparation becomes necessary.

---

### Framework Agnostic

The contract must remain independent of the frontend framework used by the consuming application.

---

### Explicit Data Flow

The input and output are both explicit:

```text
BootContext
     │
     ▼
process()
     │
     ▼
BootContext
```

This makes the boot pipeline easier to reason about and compose.

---

## Manual Validation

A manual example is maintained under:

```text
bin/pre-processor.ts
```

It demonstrates how a consumer can provide a `PreProcessor` implementation and process a `BootContext`.

Example:

```ts
import type {
  BootContext,
  PreProcessor,
} from "@stockflow/core";

const preProcessor: PreProcessor = {
  async process(context) {
    return context;
  },
};

const processedContext = await preProcessor.process(context);
```

The manual example is intended for development experimentation.

It is not part of the package runtime API.

---

## Automated Validation

The contract is validated through automated tests.

The current unit test is located under:

```text
tests/unit/boot/contracts/PreProcessor.test.ts
```

The test validates that:

- a `BootContext` can be passed to the processor;
- `process()` is asynchronous;
- the result resolves to a `BootContext`;
- the contract can be implemented correctly.

---

## Public API

`PreProcessor` is exposed through the public `@stockflow/core` API.

Consumers should import it using:

```ts
import type { PreProcessor } from "@stockflow/core";
```

Internal source paths should not be used by consumers.

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
PreProcessor
```

---

## Scope

The current `PreProcessor` contract does not define:

- multiple processor orchestration;
- processor priority;
- processor registration;
- processor lifecycle;
- error recovery;
- cancellation;
- dependency injection;
- configuration loading;
- plugin loading;
- application initialization.

These concerns require separate architectural decisions and should not be added speculatively.

---

## Evolution

`PreProcessor` is part of the public API of `@stockflow/core`.

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

The `PreProcessor` contract has been established as the second Core Boot contract.

Current capabilities:

- asynchronous processing;
- `BootContext` input;
- `BootContext` output;
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
- `PreProcessor`

Future components will be documented as their contracts are established:

- `Bootstrap`;
- `Kernel`;
- boot lifecycle;
- additional Core Boot contracts.
