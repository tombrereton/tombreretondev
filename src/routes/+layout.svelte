<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
		min-height: 100vh;
		background: repeating-linear-gradient(45deg, #f8f9fa, #f8f9fa 8px, #f1f3f5 8px, #f1f3f5 10px);
	}
</style>
