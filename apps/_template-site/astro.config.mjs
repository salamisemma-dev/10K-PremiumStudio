import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://example.com",
  server: {
    host: "127.0.0.1",
    port: 4321,
    strictPort: true
  }
});
