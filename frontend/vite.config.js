import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import biomePlugin from "vite-plugin-biome";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var _b;
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd());
    return {
        plugins: [react(), biomePlugin(), tsconfigPaths()],
        server: {
            watch: {
                ignored: ["**/build/**"],
            },
            port: +((_b = env.VITE_FRONTEND_SERVER_PORT) !== null && _b !== void 0 ? _b : 3000),
            strictPort: true,
        },
        envDir: "../.", // use .env files from the monorepo root
    };
});
