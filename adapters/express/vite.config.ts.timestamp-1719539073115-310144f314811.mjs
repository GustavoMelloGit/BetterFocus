// adapters/express/vite.config.ts
import { nodeServerAdapter } from "file:///Users/gustavo/Documents/better-focus-qwik/node_modules/.pnpm/@builder.io+qwik-city@1.5.7_@types+node@20.14.3_rollup@4.18.0/node_modules/@builder.io/qwik-city/adapters/node-server/vite/index.mjs";
import { extendConfig } from "file:///Users/gustavo/Documents/better-focus-qwik/node_modules/.pnpm/@builder.io+qwik-city@1.5.7_@types+node@20.14.3_rollup@4.18.0/node_modules/@builder.io/qwik-city/vite/index.mjs";

// vite.config.ts
import { qwikCity } from "file:///Users/gustavo/Documents/better-focus-qwik/node_modules/.pnpm/@builder.io+qwik-city@1.5.7_@types+node@20.14.3_rollup@4.18.0/node_modules/@builder.io/qwik-city/vite/index.mjs";
import { qwikVite } from "file:///Users/gustavo/Documents/better-focus-qwik/node_modules/.pnpm/@builder.io+qwik@1.5.7_@types+node@20.14.3_undici@6.19.1/node_modules/@builder.io/qwik/optimizer.mjs";
import { resolve } from "path";
import { defineConfig } from "file:///Users/gustavo/Documents/better-focus-qwik/node_modules/.pnpm/vite@5.3.1_@types+node@20.14.3/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/gustavo/Documents/better-focus-qwik/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@5.3.1_@types+node@20.14.3_/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-basic-starter",
  description: "Demo App with Routing built-in (recommended)",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/express/vite.config.ts",
    "dev.open": "vite --open --mode ssr",
    "build.types": "tsc --incremental --noEmit",
    deploy: "vercel deploy",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    prepare: "husky",
    preview: "qwik build preview && vite preview --open",
    serve: "node server/entry.express",
    start: "node server/entry.express",
    "test.unit": "vitest components",
    "test.unit.ui": "vitest --ui components",
    qwik: "qwik"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.5.7",
    "@builder.io/qwik-city": "^1.5.7",
    "@faker-js/faker": "^8.4.1",
    "@types/compression": "^1.7.2",
    "@types/eslint": "^8.56.10",
    "@types/express": "^4.17.19",
    "@types/node": "^20.14.3",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitest/ui": "^1.6.0",
    autoprefixer: "^10.4.19",
    compression: "^1.7.4",
    dotenv: "^16.3.2",
    eslint: "^8.57.0",
    "eslint-plugin-qwik": "^1.5.7",
    "eslint-plugin-tailwindcss": "^3.17.3",
    express: "4.19.2",
    husky: "^9.0.11",
    postcss: "^8.4.38",
    prettier: "^3.3.2",
    "prettier-plugin-tailwindcss": "^0.6.5",
    tailwindcss: "^3.4.4",
    typescript: "5.4.5",
    undici: "^6.19.1",
    vercel: "^34.2.7",
    vite: "^5.3.1",
    "vite-tsconfig-paths": "^4.3.2",
    vitest: "^1.6.0"
  },
  dependencies: {
    "date-fns": "^3.6.0",
    firebase: "^10.12.2",
    "tailwind-merge": "^2.3.0",
    uuid: "^10.0.0",
    zod: "^3.23.8"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/Users/gustavo/Documents/better-focus-qwik";
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev depencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    resolve: {
      alias: {
        "@fonts": resolve(__vite_injected_original_dirname, "public/assets/fonts")
      }
    },
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(", ")}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}

// adapters/express/vite.config.ts
var vite_config_default2 = extendConfig(vite_config_default, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.express.tsx", "@qwik-city-plan"]
      }
    },
    plugins: [nodeServerAdapter({ name: "express" })]
  };
});
export {
  vite_config_default2 as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRhcHRlcnMvZXhwcmVzcy92aXRlLmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ3VzdGF2by9Eb2N1bWVudHMvYmV0dGVyLWZvY3VzLXF3aWsvYWRhcHRlcnMvZXhwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2d1c3Rhdm8vRG9jdW1lbnRzL2JldHRlci1mb2N1cy1xd2lrL2FkYXB0ZXJzL2V4cHJlc3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2d1c3Rhdm8vRG9jdW1lbnRzL2JldHRlci1mb2N1cy1xd2lrL2FkYXB0ZXJzL2V4cHJlc3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBub2RlU2VydmVyQWRhcHRlciB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvYWRhcHRlcnMvbm9kZS1zZXJ2ZXIvdml0ZVwiO1xuaW1wb3J0IHsgZXh0ZW5kQ29uZmlnIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XG5pbXBvcnQgYmFzZUNvbmZpZyBmcm9tIFwiLi4vLi4vdml0ZS5jb25maWdcIjtcblxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5kQ29uZmlnKGJhc2VDb25maWcsICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgc3NyOiB0cnVlLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDogW1wic3JjL2VudHJ5LmV4cHJlc3MudHN4XCIsIFwiQHF3aWstY2l0eS1wbGFuXCJdLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtub2RlU2VydmVyQWRhcHRlcih7IG5hbWU6IFwiZXhwcmVzc1wiIH0pXSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ3VzdGF2by9Eb2N1bWVudHMvYmV0dGVyLWZvY3VzLXF3aWtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9ndXN0YXZvL0RvY3VtZW50cy9iZXR0ZXItZm9jdXMtcXdpay92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ3VzdGF2by9Eb2N1bWVudHMvYmV0dGVyLWZvY3VzLXF3aWsvdml0ZS5jb25maWcudHNcIjsvKipcbiAqIFRoaXMgaXMgdGhlIGJhc2UgY29uZmlnIGZvciB2aXRlLlxuICogV2hlbiBidWlsZGluZywgdGhlIGFkYXB0ZXIgY29uZmlnIGlzIHVzZWQgd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGFuZCBleHRlbmRzIGl0LlxuICovXG5pbXBvcnQgeyBxd2lrQ2l0eSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5cbnR5cGUgUGtnRGVwID0gUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbmNvbnN0IHsgZGVwZW5kZW5jaWVzID0ge30sIGRldkRlcGVuZGVuY2llcyA9IHt9IH0gPSBwa2cgYXMgYW55IGFzIHtcbiAgZGVwZW5kZW5jaWVzOiBQa2dEZXA7XG4gIGRldkRlcGVuZGVuY2llczogUGtnRGVwO1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xufTtcbmVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhkZXZEZXBlbmRlbmNpZXMsIGRlcGVuZGVuY2llcyk7XG5cbi8qKlxuICogTm90ZSB0aGF0IFZpdGUgbm9ybWFsbHkgc3RhcnRzIGZyb20gYGluZGV4Lmh0bWxgIGJ1dCB0aGUgcXdpa0NpdHkgcGx1Z2luIG1ha2VzIHN0YXJ0IGF0IGBzcmMvZW50cnkuc3NyLnRzeGAgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSk6IFVzZXJDb25maWcgPT4ge1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtxd2lrQ2l0eSgpLCBxd2lrVml0ZSgpLCB0c2NvbmZpZ1BhdGhzKCldLFxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgLy8gUHV0IHByb2JsZW1hdGljIGRlcHMgdGhhdCBicmVhayBidW5kbGluZyBoZXJlLCBtb3N0bHkgdGhvc2Ugd2l0aCBiaW5hcmllcy5cbiAgICAgIC8vIEZvciBleGFtcGxlIFsnYmV0dGVyLXNxbGl0ZTMnXSBpZiB5b3UgdXNlIHRoYXQgaW4gc2VydmVyIGZ1bmN0aW9ucy5cbiAgICAgIGV4Y2x1ZGU6IFtdLFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGFuIGFkdmFuY2VkIHNldHRpbmcuIEl0IGltcHJvdmVzIHRoZSBidW5kbGluZyBvZiB5b3VyIHNlcnZlciBjb2RlLiBUbyB1c2UgaXQsIG1ha2Ugc3VyZSB5b3UgdW5kZXJzdGFuZCB3aGVuIHlvdXIgY29uc3VtZWQgcGFja2FnZXMgYXJlIGRlcGVuZGVuY2llcyBvciBkZXYgZGVwZW5jaWVzLiAob3RoZXJ3aXNlIHRoaW5ncyB3aWxsIGJyZWFrIGluIHByb2R1Y3Rpb24pXG4gICAgICovXG4gICAgLy8gc3NyOlxuICAgIC8vICAgY29tbWFuZCA9PT0gXCJidWlsZFwiICYmIG1vZGUgPT09IFwicHJvZHVjdGlvblwiXG4gICAgLy8gICAgID8ge1xuICAgIC8vICAgICAgICAgLy8gQWxsIGRldiBkZXBlbmRlbmNpZXMgc2hvdWxkIGJlIGJ1bmRsZWQgaW4gdGhlIHNlcnZlciBidWlsZFxuICAgIC8vICAgICAgICAgbm9FeHRlcm5hbDogT2JqZWN0LmtleXMoZGV2RGVwZW5kZW5jaWVzKSxcbiAgICAvLyAgICAgICAgIC8vIEFueXRoaW5nIG1hcmtlZCBhcyBhIGRlcGVuZGVuY3kgd2lsbCBub3QgYmUgYnVuZGxlZFxuICAgIC8vICAgICAgICAgLy8gVGhlc2Ugc2hvdWxkIG9ubHkgYmUgcHJvZHVjdGlvbiBiaW5hcnkgZGVwcyAoaW5jbHVkaW5nIGRlcHMgb2YgZGVwcyksIENMSSBkZXBzLCBhbmQgdGhlaXIgbW9kdWxlIGdyYXBoXG4gICAgLy8gICAgICAgICAvLyBJZiBhIGRlcC1vZi1kZXAgbmVlZHMgdG8gYmUgZXh0ZXJuYWwsIGFkZCBpdCBoZXJlXG4gICAgLy8gICAgICAgICAvLyBGb3IgZXhhbXBsZSwgaWYgc29tZXRoaW5nIHVzZXMgYGJjcnlwdGAgYnV0IHlvdSBkb24ndCBoYXZlIGl0IGFzIGEgZGVwLCB5b3UgY2FuIHdyaXRlXG4gICAgLy8gICAgICAgICAvLyBleHRlcm5hbDogWy4uLk9iamVjdC5rZXlzKGRlcGVuZGVuY2llcyksICdiY3J5cHQnXVxuICAgIC8vICAgICAgICAgZXh0ZXJuYWw6IE9iamVjdC5rZXlzKGRlcGVuZGVuY2llcyksXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICA6IHVuZGVmaW5lZCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQGZvbnRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMvYXNzZXRzL2ZvbnRzJyksXG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLy8gRG9uJ3QgY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBkZXYgbW9kZVxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9MFwiLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHByZXZpZXc6IHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLy8gRG8gY2FjaGUgdGhlIHNlcnZlciByZXNwb25zZSBpbiBwcmV2aWV3IChub24tYWRhcHRlciBwcm9kdWN0aW9uIGJ1aWxkKVxuICAgICAgICBcIkNhY2hlLUNvbnRyb2xcIjogXCJwdWJsaWMsIG1heC1hZ2U9NjAwXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcblxuLy8gKioqIHV0aWxzICoqKlxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZGV2RGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBkZXZlbG9wbWVudCBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmNpZXMgLSBMaXN0IG9mIHByb2R1Y3Rpb24gZGVwZW5kZW5jaWVzXG4gKi9cbmZ1bmN0aW9uIGVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXAsXG4gIGRlcGVuZGVuY2llczogUGtnRGVwLFxuKSB7XG4gIGxldCBtc2cgPSBcIlwiO1xuICAvLyBDcmVhdGUgYW4gYXJyYXkgJ2R1cGxpY2F0ZURlcHMnIGJ5IGZpbHRlcmluZyBkZXZEZXBlbmRlbmNpZXMuXG4gIC8vIElmIGEgZGVwZW5kZW5jeSBhbHNvIGV4aXN0cyBpbiBkZXBlbmRlbmNpZXMsIGl0IGlzIGNvbnNpZGVyZWQgYSBkdXBsaWNhdGUuXG4gIGNvbnN0IGR1cGxpY2F0ZURlcHMgPSBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLmZpbHRlcihcbiAgICAoZGVwKSA9PiBkZXBlbmRlbmNpZXNbZGVwXSxcbiAgKTtcblxuICAvLyBpbmNsdWRlIGFueSBrbm93biBxd2lrIHBhY2thZ2VzXG4gIGNvbnN0IHF3aWtQa2cgPSBPYmplY3Qua2V5cyhkZXBlbmRlbmNpZXMpLmZpbHRlcigodmFsdWUpID0+XG4gICAgL3F3aWsvaS50ZXN0KHZhbHVlKSxcbiAgKTtcblxuICAvLyBhbnkgZXJyb3JzIGZvciBtaXNzaW5nIFwicXdpay1jaXR5LXBsYW5cIlxuICAvLyBbUExVR0lOX0VSUk9SXTogSW52YWxpZCBtb2R1bGUgXCJAcXdpay1jaXR5LXBsYW5cIiBpcyBub3QgYSB2YWxpZCBwYWNrYWdlXG4gIG1zZyA9IGBNb3ZlIHF3aWsgcGFja2FnZXMgJHtxd2lrUGtnLmpvaW4oXCIsIFwiKX0gdG8gZGV2RGVwZW5kZW5jaWVzYDtcblxuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH1cblxuICAvLyBGb3JtYXQgdGhlIGVycm9yIG1lc3NhZ2Ugd2l0aCB0aGUgZHVwbGljYXRlcyBsaXN0LlxuICAvLyBUaGUgYGpvaW5gIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVwcmVzZW50IHRoZSBlbGVtZW50cyBvZiB0aGUgJ2R1cGxpY2F0ZURlcHMnIGFycmF5IGFzIGEgY29tbWEtc2VwYXJhdGVkIHN0cmluZy5cbiAgbXNnID0gYFxuICAgIFdhcm5pbmc6IFRoZSBkZXBlbmRlbmN5IFwiJHtkdXBsaWNhdGVEZXBzLmpvaW4oXCIsIFwiKX1cIiBpcyBsaXN0ZWQgaW4gYm90aCBcImRldkRlcGVuZGVuY2llc1wiIGFuZCBcImRlcGVuZGVuY2llc1wiLlxuICAgIFBsZWFzZSBtb3ZlIHRoZSBkdXBsaWNhdGVkIGRlcGVuZGVuY2llcyB0byBcImRldkRlcGVuZGVuY2llc1wiIG9ubHkgYW5kIHJlbW92ZSBpdCBmcm9tIFwiZGVwZW5kZW5jaWVzXCJcbiAgYDtcblxuICAvLyBUaHJvdyBhbiBlcnJvciB3aXRoIHRoZSBjb25zdHJ1Y3RlZCBtZXNzYWdlLlxuICBpZiAoZHVwbGljYXRlRGVwcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH1cbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcIm15LXF3aWstYmFzaWMtc3RhcnRlclwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiRGVtbyBBcHAgd2l0aCBSb3V0aW5nIGJ1aWx0LWluIChyZWNvbW1lbmRlZClcIixcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCJeMTguMTcuMCB8fCBeMjAuMy4wIHx8ID49MjEuMC4wXCJcbiAgfSxcbiAgXCJlbmdpbmVzLWFubm90YXRpb25cIjogXCJNb3N0bHkgcmVxdWlyZWQgYnkgc2hhcnAgd2hpY2ggbmVlZHMgYSBOb2RlLUFQSSB2OSBjb21wYXRpYmxlIHJ1bnRpbWVcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llc1wiOiBbXG4gICAgXCJzaGFycFwiXG4gIF0sXG4gIFwidHJ1c3RlZERlcGVuZGVuY2llcy1hbm5vdGF0aW9uXCI6IFwiTmVlZGVkIGZvciBidW4gdG8gYWxsb3cgcnVubmluZyBpbnN0YWxsIHNjcmlwdHNcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInF3aWsgYnVpbGRcIixcbiAgICBcImJ1aWxkLmNsaWVudFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImJ1aWxkLnByZXZpZXdcIjogXCJ2aXRlIGJ1aWxkIC0tc3NyIHNyYy9lbnRyeS5wcmV2aWV3LnRzeFwiLFxuICAgIFwiYnVpbGQuc2VydmVyXCI6IFwidml0ZSBidWlsZCAtYyBhZGFwdGVycy9leHByZXNzL3ZpdGUuY29uZmlnLnRzXCIsXG4gICAgXCJkZXYub3BlblwiOiBcInZpdGUgLS1vcGVuIC0tbW9kZSBzc3JcIixcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcbiAgICBcImRlcGxveVwiOiBcInZlcmNlbCBkZXBsb3lcIixcbiAgICBcImRldlwiOiBcInZpdGUgLS1tb2RlIHNzclwiLFxuICAgIFwiZGV2LmRlYnVnXCI6IFwibm9kZSAtLWluc3BlY3QtYnJrIC4vbm9kZV9tb2R1bGVzL3ZpdGUvYmluL3ZpdGUuanMgLS1tb2RlIHNzciAtLWZvcmNlXCIsXG4gICAgXCJmbXRcIjogXCJwcmV0dGllciAtLXdyaXRlIC5cIixcbiAgICBcImZtdC5jaGVja1wiOiBcInByZXR0aWVyIC0tY2hlY2sgLlwiLFxuICAgIFwibGludFwiOiBcImVzbGludCBcXFwic3JjLyoqLyoudHMqXFxcIlwiLFxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5XCIsXG4gICAgXCJwcmV2aWV3XCI6IFwicXdpayBidWlsZCBwcmV2aWV3ICYmIHZpdGUgcHJldmlldyAtLW9wZW5cIixcbiAgICBcInNlcnZlXCI6IFwibm9kZSBzZXJ2ZXIvZW50cnkuZXhwcmVzc1wiLFxuICAgIFwic3RhcnRcIjogXCJub2RlIHNlcnZlci9lbnRyeS5leHByZXNzXCIsXG4gICAgXCJ0ZXN0LnVuaXRcIjogXCJ2aXRlc3QgY29tcG9uZW50c1wiLFxuICAgIFwidGVzdC51bml0LnVpXCI6IFwidml0ZXN0IC0tdWkgY29tcG9uZW50c1wiLFxuICAgIFwicXdpa1wiOiBcInF3aWtcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuNS43XCIsXG4gICAgXCJAYnVpbGRlci5pby9xd2lrLWNpdHlcIjogXCJeMS41LjdcIixcbiAgICBcIkBmYWtlci1qcy9mYWtlclwiOiBcIl44LjQuMVwiLFxuICAgIFwiQHR5cGVzL2NvbXByZXNzaW9uXCI6IFwiXjEuNy4yXCIsXG4gICAgXCJAdHlwZXMvZXNsaW50XCI6IFwiXjguNTYuMTBcIixcbiAgICBcIkB0eXBlcy9leHByZXNzXCI6IFwiXjQuMTcuMTlcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjE0LjNcIixcbiAgICBcIkB0eXBlcy91dWlkXCI6IFwiXjkuMC44XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjEzLjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4xMy4xXCIsXG4gICAgXCJAdml0ZXN0L3VpXCI6IFwiXjEuNi4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiY29tcHJlc3Npb25cIjogXCJeMS43LjRcIixcbiAgICBcImRvdGVudlwiOiBcIl4xNi4zLjJcIixcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIl4xLjUuN1wiLFxuICAgIFwiZXNsaW50LXBsdWdpbi10YWlsd2luZGNzc1wiOiBcIl4zLjE3LjNcIixcbiAgICBcImV4cHJlc3NcIjogXCI0LjE5LjJcIixcbiAgICBcImh1c2t5XCI6IFwiXjkuMC4xMVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMy4yXCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC42LjVcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC40XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiNS40LjVcIixcbiAgICBcInVuZGljaVwiOiBcIl42LjE5LjFcIixcbiAgICBcInZlcmNlbFwiOiBcIl4zNC4yLjdcIixcbiAgICBcInZpdGVcIjogXCJeNS4zLjFcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4zLjJcIixcbiAgICBcInZpdGVzdFwiOiBcIl4xLjYuMFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImRhdGUtZm5zXCI6IFwiXjMuNi4wXCIsXG4gICAgXCJmaXJlYmFzZVwiOiBcIl4xMC4xMi4yXCIsXG4gICAgXCJ0YWlsd2luZC1tZXJnZVwiOiBcIl4yLjMuMFwiLFxuICAgIFwidXVpZFwiOiBcIl4xMC4wLjBcIixcbiAgICBcInpvZFwiOiBcIl4zLjIzLjhcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLFNBQVMseUJBQXlCO0FBQ3JZLFNBQVMsb0JBQW9COzs7QUNHN0IsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsb0JBQXFDO0FBQzlDLE9BQU8sbUJBQW1COzs7QUNSMUI7QUFBQSxFQUNFLE1BQVE7QUFBQSxFQUNSLGFBQWU7QUFBQSxFQUNmLFNBQVc7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxFQUN0QixTQUFXO0FBQUEsRUFDWCxxQkFBdUI7QUFBQSxJQUNyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGtDQUFrQztBQUFBLEVBQ2xDLE1BQVE7QUFBQSxFQUNSLFNBQVc7QUFBQSxJQUNULE9BQVM7QUFBQSxJQUNULGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLElBQ2pCLGdCQUFnQjtBQUFBLElBQ2hCLFlBQVk7QUFBQSxJQUNaLGVBQWU7QUFBQSxJQUNmLFFBQVU7QUFBQSxJQUNWLEtBQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLEtBQU87QUFBQSxJQUNQLGFBQWE7QUFBQSxJQUNiLE1BQVE7QUFBQSxJQUNSLFNBQVc7QUFBQSxJQUNYLFNBQVc7QUFBQSxJQUNYLE9BQVM7QUFBQSxJQUNULE9BQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLE1BQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixvQkFBb0I7QUFBQSxJQUNwQix5QkFBeUI7QUFBQSxJQUN6QixtQkFBbUI7QUFBQSxJQUNuQixzQkFBc0I7QUFBQSxJQUN0QixpQkFBaUI7QUFBQSxJQUNqQixrQkFBa0I7QUFBQSxJQUNsQixlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsSUFDZixvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3QixjQUFjO0FBQUEsSUFDZCxjQUFnQjtBQUFBLElBQ2hCLGFBQWU7QUFBQSxJQUNmLFFBQVU7QUFBQSxJQUNWLFFBQVU7QUFBQSxJQUNWLHNCQUFzQjtBQUFBLElBQ3RCLDZCQUE2QjtBQUFBLElBQzdCLFNBQVc7QUFBQSxJQUNYLE9BQVM7QUFBQSxJQUNULFNBQVc7QUFBQSxJQUNYLFVBQVk7QUFBQSxJQUNaLCtCQUErQjtBQUFBLElBQy9CLGFBQWU7QUFBQSxJQUNmLFlBQWM7QUFBQSxJQUNkLFFBQVU7QUFBQSxJQUNWLFFBQVU7QUFBQSxJQUNWLE1BQVE7QUFBQSxJQUNSLHVCQUF1QjtBQUFBLElBQ3ZCLFFBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2QsWUFBWTtBQUFBLElBQ1osVUFBWTtBQUFBLElBQ1osa0JBQWtCO0FBQUEsSUFDbEIsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLEVBQ1Q7QUFDRjs7O0FEeEVBLElBQU0sbUNBQW1DO0FBWXpDLElBQU0sRUFBRSxlQUFlLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLElBQUk7QUFLcEQseUJBQXlCLGlCQUFpQixZQUFZO0FBS3RELElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQWtCO0FBQzdELFNBQU87QUFBQSxJQUNMLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztBQUFBO0FBQUEsSUFFakQsY0FBYztBQUFBO0FBQUE7QUFBQSxNQUdaLFNBQVMsQ0FBQztBQUFBLElBQ1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBa0JBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLFVBQVUsUUFBUSxrQ0FBVyxxQkFBcUI7QUFBQSxNQUNwRDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQTtBQUFBLFFBRVAsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxRQUVQLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBU0QsU0FBUyx5QkFDUEEsa0JBQ0FDLGVBQ0E7QUFDQSxNQUFJLE1BQU07QUFHVixRQUFNLGdCQUFnQixPQUFPLEtBQUtELGdCQUFlLEVBQUU7QUFBQSxJQUNqRCxDQUFDLFFBQVFDLGNBQWEsR0FBRztBQUFBLEVBQzNCO0FBR0EsUUFBTSxVQUFVLE9BQU8sS0FBS0EsYUFBWSxFQUFFO0FBQUEsSUFBTyxDQUFDLFVBQ2hELFFBQVEsS0FBSyxLQUFLO0FBQUEsRUFDcEI7QUFJQSxRQUFNLHNCQUFzQixRQUFRLEtBQUssSUFBSSxDQUFDO0FBRTlDLE1BQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsVUFBTSxJQUFJLE1BQU0sR0FBRztBQUFBLEVBQ3JCO0FBSUEsUUFBTTtBQUFBLCtCQUN1QixjQUFjLEtBQUssSUFBSSxDQUFDO0FBQUE7QUFBQTtBQUtyRCxNQUFJLGNBQWMsU0FBUyxHQUFHO0FBQzVCLFVBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxFQUNyQjtBQUNGOzs7QUQxR0EsSUFBT0MsdUJBQVEsYUFBYSxxQkFBWSxNQUFNO0FBQzVDLFNBQU87QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLE9BQU8sQ0FBQyx5QkFBeUIsaUJBQWlCO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxVQUFVLENBQUMsQ0FBQztBQUFBLEVBQ2xEO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiZGV2RGVwZW5kZW5jaWVzIiwgImRlcGVuZGVuY2llcyIsICJ2aXRlX2NvbmZpZ19kZWZhdWx0Il0KfQo=
