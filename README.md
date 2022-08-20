# my-vite-project

初学Vite项目搭建

## 搭建第一个 Vite 项目

>兼容性注意
>
>Vite 需要 Node.js 版本 >= 12.0.0

使用 PNPM

```
pnpm create vite
```

## 添加可用插件

### 1. vite-plugin-restart

通过监听文件修改，自动重启 vite 服务

最常用的场景就是监听`vite.config.js`和`.env.development`文件，我们知道，修改vite配置文件和环境配置文件，是需要重启vite才会生效，通过这个插件，我们将从反复重启中解脱出来。

安装

```
pnpm install vite-plugin-restart -D
```

配置：vite.config.js

```js
import ViteRestart from 'vite-plugin-restart'
export default {
  plugins: [
    ViteRestart({
      restart: [
        'my.config.[jt]s',
      ]
    })
  ],
};
```

报错

```
failed to load config from E:\Working\vite\my-vite-project\vite.config.js
error when starting dev server:
TypeError: ViteRestart is not a function
    at file:///E:/Working/vite/my-vite-project/vite.config.js.timestamp-1660975569176.mjs:8:5
    at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
    at async Loader.import (internal/modules/esm/loader.js:178:24)
    at async loadConfigFromBundledFile (file:///E:/Working/vite/my-vite-project/node_modules/.pnpm/registry.npmmirror.com+vite@3.0.9/node_modules/vite/dist/node/chunks/dep-0fc8e132.js:63077:21)
    at async loadConfigFromFile (file:///E:/Working/vite/my-vite-project/node_modules/.pnpm/registry.npmmirror.com+vite@3.0.9/node_modules/vite/dist/node/chunks/dep-0fc8e132.js:62963:28)
```

解决方法：

```js
import ViteRestart from 'vite-plugin-restart'
export default {
  plugins: [
    ViteRestart({
      restart: [
        'my.config.[jt]s',
      ]
    })
  ],
};
```

### 2. unplugin-vue-components

组件自动按需导入

安装：

```
pnpm install unplugin-vue-components -D
```

vite.config.js

```js
import Components from 'unplugin-vue-components/vite'
// ui库解析器，也可以自定义，需要安装相关UI库，unplugin-vue-components/resolvers
// 提供了以下集中解析器，使用的时候，需要安装对应的UI库，这里以vant示例
// 注释的是包含的其他一些常用组件库，供参考
import {
  // ElementPlusResolver,
  // AntDesignVueResolver,
  VantResolver,
  // HeadlessUiResolver,
  // ElementUiResolver
} from 'unplugin-vue-components/resolvers'

export default  ({ mode }) => defineConfig({
  plugins: [
    Components({
      dirs: ['src/components'], // 目标文件夹
      extensions: ['vue','jsx'], // 文件类型
      dts: 'src/components.d.ts', // 输出文件，里面都是一些import的组件键值对
      // ui库解析器，也可以自定义，需要安装相关UI库
      resolvers: [
        VantResolver(),
        // ElementPlusResolver(),
        // AntDesignVueResolver(),
        // HeadlessUiResolver(),
        // ElementUiResolver()
      ],
    })
  ]
})
```

原先引用组件的时候需要在目标文件里面import相关组件，现在就可以直接使用无需在目标文件import了，注意大小写，组件都是大写开始的。

### 3. vite-plugin-style-import

当你使用unplugin-vue-components来引入ui库的时候，message，notification，toast 等引入样式不生效。

安装vite-plugin-style-import，实现message，notification，toast 等引入样式自动引入

安装

```
pnpm install vite-plugin-style-import -D
```

vite.config.js

```js
import styleImport, {
  // AndDesignVueResolve,
  VantResolve,
  // ElementPlusResolve,
  // NutuiResolve,
  // AntdResolve
} from 'vite-plugin-style-import'


export default  ({ mode }) => defineConfig({
  plugins: [
    styleImport({
      resolves: [
        // AndDesignVueResolve(),
        VantResolve(),
        // ElementPlusResolve(),
        // NutuiResolve(),
        // AntdResolve()
      ],
    })
  ]
})
```

报错

```
ailed to load config from E:\Working\vite\my-vite-project\vite.config.js
error when starting dev server:
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'consola' imported from E:\Working\vite\my-vite-project\node_modules\.pnpm\registry.npmmirror.com+vite-plugin-style-import@2.0.0_vite@3.0.9\node_modules\vite-plugin-style-import\dist\index.mjs
    at new NodeError (internal/errors.js:322:7)
    at packageResolve (internal/modules/esm/resolve.js:687:9)
    at moduleResolve (internal/modules/esm/resolve.js:728:18)
    at Loader.defaultResolve [as _resolve] (internal/modules/esm/resolve.js:842:11)
    at Loader.resolve (internal/modules/esm/loader.js:89:40)
    at Loader.getModuleJob (internal/modules/esm/loader.js:242:28)
    at ModuleWrap.<anonymous> (internal/modules/esm/module_job.js:76:40)
    at link (internal/modules/esm/module_job.js:75:36)
 ELIFECYCLE  Command failed with exit code 1.
```

安装consola

```
pnpm install consola -D
```

出现了新的错误

```
failed to load config from E:\Working\vite\my-vite-project\vite.config.js
error when starting dev server:
file:///E:/Working/vite/my-vite-project/vite.config.js.timestamp-1660976266017.mjs:7
import styleImport, { ElementPlusResolve } from "vite-plugin-style-import";
       ^^^^^^^^^^^
SyntaxError: The requested module 'vite-plugin-style-import' does not provide an export named 'default'
    at ModuleJob._instantiate (internal/modules/esm/module_job.js:124:21)
    at async ModuleJob.run (internal/modules/esm/module_job.js:179:5)
    at async Loader.import (internal/modules/esm/loader.js:178:24)
    at async loadConfigFromBundledFile (file:///E:/Working/vite/my-vite-project/node_modules/.pnpm/registry.npmmirror.com+vite@3.0.9/node_modules/vite/dist/node/chunks/dep-0fc8e132.js:63077:21)
    at async loadConfigFromFile (file:///E:/Working/vite/my-vite-project/node_modules/.pnpm/registry.npmmirror.com+vite@3.0.9/node_modules/vite/dist/node/chunks/dep-0fc8e132.js:62963:28)
```

vite-plugin-style-import插件2.0版本的使用，应该如下：

```js
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';

export default defineConfig({
    plugins: [
        vue(),
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
    ]
})
```

### 4. unplugin-auto-import

vue3等插件 hooks 自动引入

支持`vue, vue-router, vue-i18n, @vueuse/head, @vueuse/core`等自动引入

效果

```js
// 引入前
import { ref, computed } from 'vue'
const count = ref(0)
const doubled = computed(() => count.value * 2)

//引入后
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

安装

```
pnpm install unplugin-auto-import
```

vite.config.js

```js
import AutoImport from 'unplugin-auto-import/vite'
export default  ({ mode }) => defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router', 'vuex', '@vueuse/head'],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'src/auto-import.d.ts'
    }),
  ]
})
```

### 5. vite-plugin-compression

使用`gzip`或者`brotli`来压缩资源

安装

```
pnpm install vite-plugin-compression -D
```

vite.config.js

```js
import { defineConfig,loadEnv} from 'vite'
import viteCompression from 'vite-plugin-compression';
export default  ({ mode }) => defineConfig({
  plugins: [
    viteCompression()
  ]
})
```

### 6. @vitejs/plugin-vue-jsx

此插件支持在vue3中使用jsx/tsx语法

安装

```
pnpm install @vitejs/plugin-vue-jsx
```

vite.config.js

```js
import { defineConfig,loadEnv} from 'vite'
import vuejsx from "@vitejs/plugin-vue-jsx"
export default  ({ mode }) => defineConfig({
  plugins: [
    vuejsx()
  ]
})
```

### 7. vite-plugin-vue-setup-extend

setup语法糖name增强，使vue3语法糖支持name属性

vue3语法糖默认是没有name属性的，在我们使用keep-alive的时候需要用到name。

安装

```
pnpm install vite-plugin-vue-setup-extend -D
```

vite.config.js

```js
import { defineConfig} from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
export default  ({ mode }) => defineConfig({
  plugins: [
    vueSetupExtend()
  ]
}
```

使用

```vue
<script setup name="home">
</script>
```

### 8. @vitejs/plugin-legacy

Vite默认的浏览器支持基线是原生ESM，此插件为不支持原生ESM的传统浏览器提供支持

安装

```
pnpm install @vitejs/plugin-legacy
```

vite.config.js

```js
import legacy from '@vite/plugin-legacy';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
})
```

