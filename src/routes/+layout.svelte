<script lang="ts">
	import '../app.css';
	import Command from '$lib/components/Command.svelte';
	let { children } = $props();
</script>

<div id="command-container" class="animate-fade-in-2 flex justify-center pt-6 opacity-0">
	<Command />
</div>
{@render children()}
