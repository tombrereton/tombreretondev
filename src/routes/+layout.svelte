<script lang="ts">
	import '../app.css';
	import Command from '$lib/components/Command.svelte';
	let { children } = $props();
</script>

<Command />
{@render children()}
