import { sveltekit } from '@sveltejs/kit/vite'
import VitePluginRestart from 'vite-plugin-restart'
import path from 'path'

// No idea why this is needed. The default export of vite-plugin-restart looks
// to be the function but it doesn't work when imported. Need to access the
// 'default' key from the imported object instead
const ViteRestart = VitePluginRestart.default

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [
        sveltekit(),
        ViteRestart({
            restart: [
                'src/styles/*.scss'
            ]
        })
    ],
    resolve: {
        alias: {
          '$': path.resolve('src'),
          '$styles': path.resolve(path.join('src', 'styles'))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use '$styles/variables' as *;`
            }
        }
    },
    envPrefix: 'KUBERA'
}

export default config
