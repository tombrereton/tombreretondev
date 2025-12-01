<script lang="ts">
	interface Props {
		available?: boolean;
		message?: string;
		href?: string;
	}

	let { available = true, message, href }: Props = $props();

	const defaultMessage = available ? 'Available for Contract Work' : 'Currently Unavailable';
</script>

{#if href}
	<a {href} class="availability-badge" class:available>
		<span class="status-dot"></span>
		{message || defaultMessage}
	</a>
{:else}
	<div class="availability-badge" class:available>
		<span class="status-dot"></span>
		{message || defaultMessage}
	</div>
{/if}

<style>
	.availability-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		border-radius: 50px;
		font-size: 0.9375rem;
		font-weight: 600;
		font-family: 'Outfit', sans-serif;
		border: 1px solid rgba(199, 125, 255, 0.3);
		background: var(--color-background-card);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
	}

	.availability-badge::before {
		content: '';
		position: absolute;
		inset: -1px;
		background: var(--gradient-purple-animated);
		background-size: 300% 300%;
		border-radius: 50px;
		opacity: 0.6;
		z-index: -1;
		animation: gradient-shift 3s ease infinite;
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

	.availability-badge.available {
		color: var(--color-text);
	}

	.availability-badge.available:hover {
		color: var(--color-badge-text);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
	}

	.availability-badge:not(.available) {
		opacity: 0.6;
		border-color: var(--color-border);
	}

	.availability-badge:not(.available)::before {
		opacity: 0;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #10b981;
		animation: pulse 2s ease-in-out infinite;
	}

	.availability-badge:not(.available) .status-dot {
		background: var(--color-text-secondary);
		animation: none;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.availability-badge:hover {
		transform: translateY(-2px);
		box-shadow: var(--button-glow);
	}
</style>
