<script lang="ts">
	import { onMount } from 'svelte';
	import Toast from './Toast.svelte';

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
	let imagesPreloaded = $state(false);
	let preloadedImages: HTMLImageElement[] = [];
	let idleTimer: number | null = null;
	let isIdle = $state(false);
	let idleAnimationFrame: number | null = null;
	let idleStartTime: number | null = null;
	let lastGazeX = 0;
	let lastGazeY = 0;
	let showToast = $state(false);

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

		// Store last gaze position for smooth idle transition
		lastGazeX = clampedX;
		lastGazeY = clampedY;

		const px = quantizeToGrid(clampedX);
		const py = quantizeToGrid(clampedY);

		const filename = gridToFilename(px, py);
		imageSrc = `${basePath}${filename}`;

		if (debug) {
			debugInfo = `Mouse: (${Math.round(clientX - rect.left)}, ${Math.round(clientY - rect.top)})<br/>Image: ${filename}`;
		}
	}

	let pendingUpdate = false;
	let lastMouseX = 0;
	let lastMouseY = 0;

	function resetIdleTimer() {
		// Stop idle animation
		isIdle = false;
		idleStartTime = null;
		if (idleAnimationFrame) {
			cancelAnimationFrame(idleAnimationFrame);
			idleAnimationFrame = null;
		}

		// Reset idle timer
		if (idleTimer) clearTimeout(idleTimer);
		idleTimer = setTimeout(() => {
			isIdle = true;
			idleStartTime = Date.now();
			startIdleAnimation();
		}, 3000); // Start idle after 3 seconds of no movement
	}

	function startIdleAnimation() {
		if (!isIdle || !idleStartTime) return;

		const elapsed = (Date.now() - idleStartTime) / 1000;
		const TRANSITION_DURATION = 1; // 1 second to return to center

		let wanderX = 0;
		let wanderY = 0;

		if (elapsed < TRANSITION_DURATION) {
			// Smoothly interpolate from last position to center (ease out)
			const progress = elapsed / TRANSITION_DURATION;
			const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

			// Interpolate between last gaze position and center (0, 0)
			wanderX = lastGazeX * (1 - easeOut);
			wanderY = lastGazeY * (1 - easeOut);
		} else {
			// After reaching center, start wandering
			const time = elapsed - TRANSITION_DURATION;
			wanderX = Math.sin(time * 0.5) * 0.3; // Gentle horizontal wander
			wanderY = Math.sin(time * 0.7) * 0.2; // Gentle vertical wander
		}

		const px = quantizeToGrid(wanderX);
		const py = quantizeToGrid(wanderY);

		const filename = gridToFilename(px, py);
		imageSrc = `${basePath}${filename}`;

		if (isIdle) {
			idleAnimationFrame = requestAnimationFrame(() => startIdleAnimation());
		}
	}

	function handleMouseMove(e: MouseEvent) {
		// Don't update from mouse if orientation is enabled
		if (orientationEnabled) return;

		// Reset idle timer on mouse movement
		resetIdleTimer();

		// Store latest mouse position
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;

		// Use requestAnimationFrame for smooth updates
		if (!pendingUpdate) {
			pendingUpdate = true;
			requestAnimationFrame(() => {
				setFromClient(lastMouseX, lastMouseY);
				pendingUpdate = false;
			});
		}
	}

	function handleTouchMove(e: TouchEvent) {
		// Don't update from touch if orientation is enabled
		if (orientationEnabled) return;

		// Reset idle timer on touch
		resetIdleTimer();

		if (e.touches && e.touches.length > 0) {
			const t = e.touches[0];
			setFromClient(t.clientX, t.clientY);
		}
	}

	function handleDeviceOrientation(e: DeviceOrientationEvent) {
		if (!container) return;

		// Reset idle timer on device movement
		resetIdleTimer();

		// beta: tilt front-to-back (-90 to 90)
		// gamma: tilt left-to-right (-90 to 90)
		const beta = e.beta || 0; // vertical tilt
		const gamma = e.gamma || 0; // horizontal tilt

		// Map tilt angles to normalized coordinates [-1, 1]
		// Center around 45° for typical phone viewing angle when sitting
		const adjustedBeta = beta - 45; // Offset so 45° is center
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
		if (debug) console.log('Requesting permission...');
		// For iOS 13+ devices, we need to request permission
		if (
			typeof DeviceOrientationEvent !== 'undefined' &&
			typeof (DeviceOrientationEvent as any).requestPermission === 'function'
		) {
			try {
				if (debug) console.log('iOS detected...');
				const permission = await (DeviceOrientationEvent as any).requestPermission();
				if (debug) console.log(`Permission: ${permission}`);
				if (permission === 'granted') {
					window.addEventListener('deviceorientation', handleDeviceOrientation);
					orientationEnabled = true;
					needsPermission = false;
				} else {
					if (debug) console.log('Permission denied');
				}
			} catch (error) {
				if (debug) console.error(`Error: ${error}`);
			}
		} else {
			// For non-iOS devices or older iOS versions (Android auto-grants)
			if (debug) console.log('Non-iOS, enabling...');
			window.addEventListener('deviceorientation', handleDeviceOrientation);
			orientationEnabled = true;
			// Show toast for Android auto-granted permission
			showToast = true;
		}
	}

	async function enableOrientation() {
		await requestOrientationPermission();

		// Scroll to face tracker if not in view
		if (container) {
			const rect = container.getBoundingClientRect();
			const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;

			if (!isInView) {
				container.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}

		// Show toast to instruct user to tilt phone
		if (orientationEnabled) {
			showToast = true;
		}
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

		// Start idle timer
		resetIdleTimer();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('deviceorientation', handleDeviceOrientation);
			if (idleTimer) clearTimeout(idleTimer);
			if (idleAnimationFrame) cancelAnimationFrame(idleAnimationFrame);
		};
	});
</script>

<div class="face-tracker" bind:this={container} style="width: {size}px; height: {size}px;">
	{#if imageSrc}
		<img src={imageSrc} alt="Face following gaze" class="face-image" />
	{/if}
	{#if needsPermission && !orientationEnabled}
		<button class="permission-button" onclick={enableOrientation}> Bring Me to Life </button>
	{/if}
	{#if debug}
		<div class="face-debug">{@html debugInfo}</div>
	{/if}
</div>

<Toast bind:show={showToast} message="Tilt your phone and watch me follow! 👀" duration={4000} />

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
		padding: 1.125rem 2rem;
		background: var(--gradient-purple-animated);
		background-size: 300% 300%;
		animation: gradient-shift 3s ease infinite;
		color: white;
		border: 1px solid rgba(199, 125, 255, 0.3);
		border-radius: 50px;
		font-family: 'Outfit', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		z-index: 1000;
		box-shadow: var(--button-glow);
		transition: all 0.3s ease;
	}

	@keyframes gradient-shift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	.permission-button:hover {
		transform: translateY(-2px);
		box-shadow: var(--button-glow-hover);
	}

	.permission-button:active {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.permission-button {
			bottom: 1.5rem;
			right: 1.5rem;
			padding: 1rem 1.75rem;
			font-size: 0.9375rem;
		}
	}
</style>
