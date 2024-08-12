import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

const config = {
    kit: {
        adapter: adapter(),
        files: {
            assets: "src/static"
        },
        env: {
            publicPrefix: "KUBERA_"
        }
    },
    preprocess: [vitePreprocess()]
}

export default config
