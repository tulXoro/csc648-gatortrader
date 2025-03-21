import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		sourcemap: true, // Ensure source maps are generated
	},
	plugins: [sveltekit()]
});
