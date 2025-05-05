import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', 
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        loginCoord: resolve(__dirname, 'loginCoord.html'),
        loginTrein: resolve(__dirname, 'loginTrein.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        painelAdmin: resolve(__dirname, 'painelAdmin.html'),
        painelTreinador: resolve(__dirname, 'painelTreinador.html'),
        turmas: resolve(__dirname, 'turmas.html'),
      },
    },
  },
});
