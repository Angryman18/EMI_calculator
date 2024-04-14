import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      devOptions: { enabled: true, type: "classic" },
      includeManifestIcons: true,
      manifest: {
        theme_color: "black",
        name: "EMI Calculator",
        screenshots: [
          {
            src: "sss55.png",
            sizes: "500x707",
            type: "image/png",
            form_factor: "wide",
            label: "Wonder Widgets",
          },
          {
            src: "sss55 copy.png",
            sizes: "500x707",
            type: "image/png",
            form_factor: "narrow",
            label: "Wonder Widgets",
          },
        ],
        icons: [
          {
            src: "emi.webp",
            sizes: "144x144",
            purpose: "any",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
