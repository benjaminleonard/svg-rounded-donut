import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
