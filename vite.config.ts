import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base: "/duitkas/", <-- ganti nama subdirektori https://example.com/myapp/ -> '/myapp/'
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "https://fin.duitkas.com/api/v2",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //     secure: true,
    //   },
    // },
  },
});
