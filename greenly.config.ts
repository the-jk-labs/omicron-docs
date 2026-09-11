import { defineConfig } from "greenly";

export default defineConfig({
  name: "omicron-docs",
  checks: [
    { name: "Oxfmt", command: "pnpm fmt:check", onFail: "pnpm fmt" },
    { name: "Astro Check", command: "pnpm astro-check" },
    { name: "Oxlint", command: "pnpm lint" },
    { name: "Build", command: "pnpm build" },
  ],
});
