<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		basePath?: string;
		debug?: boolean;
		size?: number;
	}

	let { basePath = '/face-looker/faces/', debug = false, size = 150 }: Props = $props();

	// Grid configuration (must match generated images)
	const P_MIN = -15;
	const P_MAX = 15;
	const STEP = 3;
	const IMAGE_SIZE = 256;

	let container: HTMLDivElement;
	let imageSrc = $state('');
	let debugInfo = $state('');
	let needsPermission = $state(false);
	let orientationEnabled = $state(false);
	let statusMessage = $state('');
	let imagesPreloaded = $state(false);
	let preloadedImages: HTMLImageElement[] = [];

	function clamp(value: number, min: number, max: number): number {
		return Math.max(min, Math.min(max, value));
	}

	function quantizeToGrid(val: number): number {
		const raw = P_MIN + ((val + 1) * (P_MAX - P_MIN)) / 2; // [-1,1] -> [-15,15]
		const snapped = Math.round(raw / STEP) * STEP;
		return clamp(snapped, P_MIN, P_MAX);
	}

	function sanitize(val: number): string {
		const str = Number(val).toFixed(1); // force one decimal, e.g. 0 -> 0.0
		return str.replace('-', 'm').replace('.', 'p');
	}

	function gridToFilename(px: number, py: number): string {
		return `gaze_px${sanitize(px)}_py${sanitize(py)}_${IMAGE_SIZE}.webp`;
	}

	function setFromClient(clientX: number, clientY: number) {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const nx = (clientX - centerX) / (rect.width / 2);
		const ny = (centerY - clientY) / (rect.height / 2);

		const clampedX = clamp(nx, -1, 1);
		const clampedY = clamp(ny, -1, 1);

		const px = quantizeToGrid(clampedX);
		const py = quantizeToGrid(clampedY);

		const filename = gridToFilename(px, py);
		imageSrc = `${basePath}${filename}`;

		if (debug) {
			debugInfo = `Mouse: (${Math.round(clientX - rect.left)}, ${Math.round(clientY - rect.top)})<br/>Image: ${filename}`;
		}
	}

	let lastUpdate = 0;
	const UPDATE_INTERVAL = 50; // Update every 50ms (20 FPS)

	function handleMouseMove(e: MouseEvent) {
		// Don't update from mouse if orientation is enabled
		if (orientationEnabled) return;

		// Throttle updates for better performance
		const now = Date.now();
		if (now - lastUpdate < UPDATE_INTERVAL) return;
		lastUpdate = now;

		setFromClient(e.clientX, e.clientY);
	}

	function handleTouchMove(e: TouchEvent) {
		// Don't update from touch if orientation is enabled
		if (orientationEnabled) return;
		if (e.touches && e.touches.length > 0) {
			const t = e.touches[0];
			setFromClient(t.clientX, t.clientY);
		}
	}

	function handleDeviceOrientation(e: DeviceOrientationEvent) {
		if (!container) return;

		// beta: tilt front-to-back (-90 to 90)
		// gamma: tilt left-to-right (-90 to 90)
		const beta = e.beta || 0; // vertical tilt
		const gamma = e.gamma || 0; // horizontal tilt

		// Map tilt angles to normalized coordinates [-1, 1]
		// Center around 35° for typical phone viewing angle
		const adjustedBeta = beta - 35; // Offset so 35° is center
		const nx = clamp(gamma / 15, -1, 1); // -15 to 15 degrees maps to -1 to 1
		const ny = clamp(-adjustedBeta / 15, -1, 1); // Invert Y-axis and use smaller range

		const px = quantizeToGrid(nx);
		const py = quantizeToGrid(ny);

		const filename = gridToFilename(px, py);
		imageSrc = `${basePath}${filename}`;

		if (debug) {
			debugInfo = `Tilt: (β=${Math.round(beta)}°, γ=${Math.round(gamma)}°)<br/>Image: ${filename}`;
		}
	}

	async function requestOrientationPermission() {
		statusMessage = 'Requesting permission...';
		// For iOS 13+ devices, we need to request permission
		if (
			typeof DeviceOrientationEvent !== 'undefined' &&
			typeof (DeviceOrientationEvent as any).requestPermission === 'function'
		) {
			try {
				statusMessage = 'iOS detected...';
				const permission = await (DeviceOrientationEvent as any).requestPermission();
				statusMessage = `Permission: ${permission}`;
				if (permission === 'granted') {
					window.addEventListener('deviceorientation', handleDeviceOrientation);
					orientationEnabled = true;
					needsPermission = false;
					statusMessage = '';
				} else {
					statusMessage = 'Permission denied';
				}
			} catch (error) {
				statusMessage = `Error: ${error}`;
			}
		} else {
			// For non-iOS devices or older iOS versions
			statusMessage = 'Non-iOS, enabling...';
			window.addEventListener('deviceorientation', handleDeviceOrientation);
			orientationEnabled = true;
			statusMessage = '';
		}
	}

	async function enableOrientation() {
		await requestOrientationPermission();
	}

	function preloadImages() {
		// Generate all possible image URLs and preload them
		// Store in component scope to prevent garbage collection
		for (let px = P_MIN; px <= P_MAX; px += STEP) {
			for (let py = P_MIN; py <= P_MAX; py += STEP) {
				const filename = gridToFilename(px, py);
				const img = new Image();
				img.src = `${basePath}${filename}`;
				preloadedImages.push(img);
			}
		}
		imagesPreloaded = true;
	}

	onMount(() => {
		// Preload all images immediately
		preloadImages();

		// Track pointer anywhere on the page
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('touchmove', handleTouchMove, { passive: true });

		// Check if this is a mobile device
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

		if (isMobile) {
			// Check if we need to show permission button (iOS 13+)
			if (
				typeof DeviceOrientationEvent !== 'undefined' &&
				typeof (DeviceOrientationEvent as any).requestPermission === 'function'
			) {
				needsPermission = true;
			} else {
				// Auto-enable for Android and other mobile devices
				requestOrientationPermission();
			}
		}

		// Initialize at center
		const rect = container.getBoundingClientRect();
		setFromClient(rect.left + rect.width / 2, rect.top + rect.height / 2);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('deviceorientation', handleDeviceOrientation);
		};
	});
</script>

<div class="face-tracker" bind:this={container} style="width: {size}px; height: {size}px;">
	{#if imageSrc}
		<img src={imageSrc} alt="Face following gaze" class="face-image" />
	{/if}
	{#if needsPermission && !orientationEnabled}
		<button class="permission-button" onclick={enableOrientation}> Enable Tilt </button>
	{/if}
	{#if statusMessage}
		<div class="status-message">{statusMessage}</div>
	{/if}
	{#if debug}
		<div class="face-debug">{@html debugInfo}</div>
	{/if}
</div>

<style>
	.face-tracker {
		position: relative;
		overflow: hidden;
		border-radius: 50%;
		background: #f0f0f0;
		border: 4px solid #212529;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.face-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.face-debug {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 0.5rem;
		font-size: 0.75rem;
		font-family: monospace;
	}

	.permission-button {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		padding: 1rem 1.5rem;
		background: #10b981;
		color: white;
		border: none;
		border-radius: 50px;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
		transition: all 0.3s ease;
	}

	.permission-button:hover {
		background: #059669;
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
	}

	.permission-button:active {
		transform: translateY(0);
	}

	.status-message {
		position: absolute;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		padding: 0.5rem 1rem;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		border-radius: 4px;
		font-size: 0.75rem;
		z-index: 10;
		white-space: nowrap;
	}
</style>
