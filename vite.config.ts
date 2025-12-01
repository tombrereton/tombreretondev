import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';

// Check if cert files exist (for local development)
const certExists = fs.existsSync('.cert/key.pem') && fs.existsSync('.cert/cert.pem');

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	server: {
		host: '0.0.0.0',
		port: 5174,
		...(certExists && {
			https: {
				key: fs.readFileSync('.cert/key.pem'),
				cert: fs.readFileSync('.cert/cert.pem')
			}
		})
	}
});
