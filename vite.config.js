import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync } from 'node:fs';
import { isAbsolute, relative, resolve } from 'node:path';

const imageExtension = /\.(png|jpe?g|webp|avif|svg)$/i;

function refreshLocalImages() {
  let restartTimer;
  return {
    name: 'harbor-refresh-local-images',
    configureServer(server) {
      const imageDirectory = resolve(server.config.publicDir, 'images');
      const refresh = (file) => {
        const imagePath = relative(imageDirectory, resolve(file));
        if (
          imagePath.startsWith('..') ||
          isAbsolute(imagePath) ||
          !imageExtension.test(imagePath)
        ) {
          return;
        }
        clearTimeout(restartTimer);
        // The inventory is a Vite define, so restart to refresh it for every module.
        restartTimer = setTimeout(() => {
          server.restart().catch((error) => server.config.logger.error(String(error)));
        }, 150);
      };
      server.watcher.add(imageDirectory);
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
    },
    closeServer() {
      clearTimeout(restartTimer);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss(), refreshLocalImages()],
    base: env.VITE_BASE_PATH || '/blubber-the-harbor/',
    define: {
      __HARBOR_IMAGES__: JSON.stringify(
        readdirSync('public/images', { recursive: true })
          .filter((path) => imageExtension.test(path))
          .map((path) => `images/${path.replaceAll('\\', '/')}`),
      ),
    },
  };
});
