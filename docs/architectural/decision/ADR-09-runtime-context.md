## Architectural Decision Summary

- `BootContext` remains **owned by Core Boot**.
- `RuntimeContext` becomes **owned by Core Runtime**.
- `RUNTIME_READY` represents the architectural boundary between Core Boot and Core Runtime.
- Runtime **MUST NOT** depend directly on `BootContext`.
- Information may cross the Boot → Runtime boundary, but ownership is not implicitly transferred.
- `RuntimeContext` represents only the minimum **Runtime-owned state** required after `RUNTIME_READY`.
- Kernel remains a Runtime-level consumer and does not need knowledge of Boot-specific contracts.
- The concrete implementation of `RuntimeContext` is deferred to the implementation of **Sub-Issue #9**.

# ADR-009 — Runtime Context

- **Status:** ACCEPTED
- **Date:** 2026-08-26
- **Scope:** StockFlow Core — Runtime Architecture
- **Related:** Sub-Issue #9
