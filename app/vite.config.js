import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/public/style/_colors.scss" as *;
          @use "/public/style/_typography.scss" as *;
          @use "/public/style/_spacing.scss" as *;
          @use "/public/style/_borders.scss" as *;
        `,
        api: "modern",
      },
    },
  },
});
