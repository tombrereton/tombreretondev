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
		gap: 0.625rem;
		padding: 1rem 2rem;
		border-radius: 50px;
		font-size: 1.125rem;
		font-weight: 700;
		font-family: 'Outfit', sans-serif;
		border: 2px solid rgba(199, 125, 255, 0.4);
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
		inset: -2px;
		background: var(--gradient-purple-animated);
		background-size: 300% 300%;
		border-radius: 50px;
		opacity: 0.8;
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
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #10b981;
		box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
		animation: pulse 2s ease-in-out infinite;
		transition: all 0.3s ease;
	}

	.availability-badge.available:hover .status-dot {
		background: #34d399;
		box-shadow:
			0 0 0 2px rgba(255, 255, 255, 0.9),
			0 0 8px rgba(52, 211, 153, 0.6);
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
