import type {
  BootContext,
  Bootstrap,
} from "@stockflow/core";

const context: BootContext = {
  application: {
    name: "stockflow-web",
    version: "0.1.0",
  },
  environment: {
    mode: "development",
  },
};

const bootstrap: Bootstrap = {
  async bootstrap(context) {
    console.log("Bootstrapping application:");
    console.log(context.application.name);
    console.log(context.application.version);
    console.log(context.environment.mode);
  },
};

await bootstrap.bootstrap(context);

console.log("Bootstrap completed.");
