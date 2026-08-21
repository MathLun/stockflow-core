import type { BootContext }
from "../src/boot/contracts/index.js";

const context: BootContext = {
	application: {
	  name: "stockflow-web",
	  version: "0.1.0"
	},
	environment: {
	  mode: "development"
	}
};

console.log(context);
