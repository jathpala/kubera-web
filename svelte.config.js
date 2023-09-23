import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
    kit: {
        adapter: adapter(),
        files: {
            assets: "src/static"
        }
    },
    preprocess: [vitePreprocess()]
};

export default config;
