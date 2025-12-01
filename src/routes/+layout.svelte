<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeToggle />

<div class="app">
	{@render children()}
</div>

<style>
	.app {
		min-height: 100vh;
		background: repeating-linear-gradient(
			45deg,
			var(--stripe-color-1),
			var(--stripe-color-1) 8px,
			var(--stripe-color-2) 8px,
			var(--stripe-color-2) 10px
		);
	}
</style>
