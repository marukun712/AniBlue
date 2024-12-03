import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";

export default defineConfig({
  build: {
    target: ["es2022", "edge89", "firefox89", "chrome89", "safari15"],
  },
  server: {
    host: "127.0.0.1",
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
      },
    }),
    netlifyPlugin(),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["@resvg/resvg-js"],
  },
});
