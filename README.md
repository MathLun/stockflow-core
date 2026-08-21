# StockFlow Core

Framework-agnostic core runtime and boot infrastructure for StockFlow applications.

StockFlow Core provides the foundational contracts and runtime infrastructure used by StockFlow applications, independently of the frontend framework or application layer.

The package is designed to be consumed by applications built with technologies such as Vue, React, Angular, Svelte, or other compatible JavaScript/TypeScript environments.

## Project Status

StockFlow Core is currently under active development.

The project is being built incrementally, starting with the Core Boot contract model.

Current focus:

- Core Boot architecture
- Framework-agnostic TypeScript contracts
- Public package API
- Automated testing
- Documentation

## Core Boot

Core Boot provides the foundational model responsible for preparing and coordinating application startup.

The architecture is being developed incrementally around explicit contracts.

Current conceptual direction:

```text
Core Boot
│
├── BootContext
├── PreProcessor
├── Bootstrap
├── Kernel
└── Lifecycle
```

Only components with clearly defined responsibilities and contracts will be introduced into the implementation.

## BootContext

`BootContext` is the foundational context contract of Core Boot.

It provides the minimum application and environment information required during the boot process.

The current contract represents:

- application name;
- application version;
- execution environment.

Example:

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

For the complete architectural definition:

[Read the BootContext documentation](./docs/boot/boot-context.md)

## Framework Agnostic

StockFlow Core is intentionally independent from frontend frameworks.

The same package can be consumed by different applications:

```text
@stockflow/core
       │
       ├── Vue
       │
       ├── React
       │
       ├── Angular
       │
       └── Svelte
```

Core contracts must not depend on framework-specific APIs unless a concrete architectural requirement justifies such a dependency.

## Public API

Consumers should interact with StockFlow Core through the package public API:

```ts
import type { BootContext } from "@stockflow/core";
```

Internal source paths should not be considered part of the public API.

The package exposes its public entry point through:

```text
@stockflow/core
      │
      ▼
dist/index.js
dist/index.d.ts
```

## Architecture Principles

StockFlow Core follows a few fundamental principles:

1. Framework-agnostic contracts.
2. Explicit architectural boundaries.
3. Stable public APIs.
4. Minimal abstractions.
5. Contracts before implementations.
6. Incremental architecture evolution.
7. No speculative infrastructure.
8. Type safety through TypeScript.
9. Automated validation.
10. Documentation alongside architectural decisions.

The project favors real requirements over premature abstractions.

## Development

### Requirements

- Node.js
- npm
- TypeScript

### Install Dependencies

```bash
npm install
```

### Type Check

```bash
npx tsc --noEmit
```

### Build

```bash
npx tsc
```

The compiled package is generated under:

```text
dist/
```

### Run Tests

```bash
npm test
```

### Run Manual Experiments

Manual Core experiments are maintained under:

```text
bin/
```

For example:

```bash
npm run bin -- bin/boot-context.ts
```

The `bin` directory is intended for manual validation and experimentation.

It is not part of the package runtime API.

## Project Structure

The current project structure is intentionally small:

```text
stockflow-core/
│
├── bin/
│   └── boot-context.ts
│
├── docs/
│   └── boot/
│       └── boot-context.md
│
├── src/
│   ├── boot/
│   │   └── contracts/
│   │       ├── BootContext.ts
│   │       ├── index.ts
│   │       └── types/
│   │           ├── BootApplication.ts
│   │           ├── BootEnvironment.ts
│   │           └── index.ts
│   │
│   └── index.ts
│
├── tests/
│   └── package/
│
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

The structure will evolve as additional Core Boot capabilities are introduced.

## Documentation

### Core Boot

- [BootContext](./docs/boot/boot-context.md) — foundational Core Boot context contract.

Additional architectural documentation will be added as new contracts are established.

## Testing Strategy

StockFlow Core separates different forms of validation.

### Type Validation

TypeScript validates contracts and compile-time guarantees.

```bash
npx tsc --noEmit
```

### Unit Tests

Unit tests validate concrete implementation behavior.

```text
tests/unit/
```

### Package/API Tests

Package/API tests validate the public package boundary.

They consume the package through:

```ts
import type { BootContext } from "@stockflow/core";
```

rather than importing internal source files.

### Manual Validation

Manual experiments are maintained under:

```text
bin/
```

This allows contracts and implementations to be exercised directly during development.

## Versioning

StockFlow Core currently uses pre-1.0 semantic versioning.

Current version:

```text
0.1.0
```

The `0.x` series represents an API that is still evolving before the first stable `1.0.0` release.

Breaking changes may therefore occur during the early development stage as the architecture and contracts mature.

## Open Source

StockFlow Core is part of the StockFlow Open Source ecosystem.

The project is developed with professional Open Source practices, including:

- Git-based development;
- feature branches;
- Pull Requests;
- automated testing;
- Continuous Integration;
- semantic versioning;
- architectural documentation;
- reproducible development.

## Repository

StockFlow Core source code and development history are available on GitHub:

https://github.com/MathLun/stockflow-core

## Package

The package is published under the scoped npm package name:

```text
@stockflow/core
```

The package is designed to be consumed independently by StockFlow applications and other compatible projects.

## License

StockFlow Core is open source software licensed under the MIT License.

See the [LICENSE](./LICENSE) file for the complete license text.
