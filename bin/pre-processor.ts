import type {
  BootContext,
  PreProcessor,
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

const preProcessor: PreProcessor = {
  async process(context) {
    return {
      ...context,
    };
  },
};

const processedContext = await preProcessor.process(context);

console.log("Original context:");
console.log(context);

console.log("\nProcessed context:");
console.log(processedContext);
