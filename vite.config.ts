import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Sheep Fucking Sheep",
        short_name: "SFS",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#000",
        background_color: "#fff",
        icons: [
          {
            src: "logo.png",
            type: "image/png",
            sizes: "64x64",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
  server: {
    port: 8888,
  },
});
