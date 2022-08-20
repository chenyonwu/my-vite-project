import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vpr from 'vite-plugin-restart';
let ViteRestart = vpr.default;
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';
import vuejsx from '@vitejs/plugin-vue-jsx';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuejsx(),
    ViteRestart({
      restart: [
        'vite.config.js',
      ]
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue', 'jsx'],
      dts: 'src/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    createStyleImportPlugin({
      resolves: [
          ElementPlusResolve(),
      ],
      libs: [{
          libarayName: 'element-plus',
          esModule: true,
          resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
          }
      }],
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
      dts: 'src/auto-import.d.ts',
    }),
    viteCompression(),
    vueSetupExtend(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ]
})
