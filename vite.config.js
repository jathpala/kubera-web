import { sveltekit } from '@sveltejs/kit/vite'
import VitePluginRestart from 'vite-plugin-restart'
import path from 'path'

const ViteRestart = VitePluginRestart

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
