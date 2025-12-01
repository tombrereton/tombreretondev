<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state<'light' | 'dark' | null>(null);

	function toggleTheme() {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const currentTheme = theme || (prefersDark ? 'dark' : 'light');

		theme = currentTheme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	onMount(() => {
		// Check if user has manually set a theme preference
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		if (savedTheme) {
			theme = savedTheme;
			document.documentElement.setAttribute('data-theme', theme);
		}
		// Otherwise, theme stays null and CSS handles it via prefers-color-scheme
	});
</script>

<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle dark mode">
	{#if theme === 'light'}
		<!-- Moon icon for dark mode -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{:else}
		<!-- Sun icon for light mode -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" />
			<line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" />
			<line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" />
			<line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 2rem;
		right: 2rem;
		padding: 0.75rem;
		background: var(--color-background-card);
		border: 1px solid var(--color-border);
		border-radius: 50%;
		cursor: pointer;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.3s ease;
		color: var(--color-text);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.theme-toggle svg {
		display: block;
		transition: transform 0.3s ease;
	}

	/* Only apply hover effects on devices that support hover (not touch screens) */
	@media (hover: hover) and (pointer: fine) {
		.theme-toggle:hover {
			color: var(--color-purple-light);
		}

		.theme-toggle:hover svg {
			transform: rotate(30deg);
		}
	}

	/* Active state for touch feedback */
	.theme-toggle:active {
		transform: scale(0.95);
	}
</style>
