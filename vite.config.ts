import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	server: {
		host: '0.0.0.0',
		port: 5174,
		https: {
			key: fs.readFileSync('.cert/key.pem'),
			cert: fs.readFileSync('.cert/cert.pem')
		}
	}
});
