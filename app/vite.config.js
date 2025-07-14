import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
      "@assets": "/src/assets",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/assets/styles/_colors.scss" as *;
          @use "/src/assets/styles/_typography.scss" as *;
          @use "/src/assets/styles/_spacing.scss" as *;
          @use "/src/assets/styles/_borders.scss" as *;
        `,
        api: "modern",
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue"],
          shared: [
            "/src/shared/components/Button/ButtonComponent.vue",
            "/src/shared/components/Heading/HeadingComponent.vue",
            "/src/shared/components/Input/InputComponent.vue",
            "/src/shared/components/Radio/RadioComponent.vue",
            "/src/shared/components/Step/StepComponent.vue",
          ],
          helpers: [
            "/src/shared/helpers/maskCnpj.js",
            "/src/shared/helpers/maskCpf.js",
            "/src/shared/helpers/maskTel.js",
          ],
          register: [
            "/src/modules/register/RegisterView.vue",
            "/src/modules/register/InputPersonData/InputPersonData.vue",
            "/src/modules/register/Password/PasswordSelection.vue",
            "/src/modules/register/SelectPersonType/SelectPersonType.vue",
          ],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    assetsInlineLimit: 4096, // 4kb
    sourcemap: false,
    cssCodeSplit: true,
    minify: true,
  },
});
