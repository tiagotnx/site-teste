import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                contato: resolve(__dirname, "contato.html"),
                financiamento: resolve(__dirname, "financiamento.html"),
                quemSomos: resolve(__dirname, "quemSomos.html"),
            },
        },
    },
});
