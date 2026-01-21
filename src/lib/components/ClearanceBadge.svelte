<script lang="ts">
	export let baseline: boolean = true;
	export let nv1Willing: boolean = true;
</script>

<div class="clearance-badge">
	<div class="badge-icon">
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		</svg>
	</div>
	<div class="badge-content">
		{#if baseline}
			<span class="clearance-item active">
				<span class="check-mark">✓</span>
				Australian Baseline Clearance
			</span>
		{/if}
		{#if nv1Willing}
			<span class="clearance-item willing">
				<span class="open-circle"></span>
				NV1 Clearance Eligible
			</span>
		{/if}
	</div>
</div>

<style>
	.clearance-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.625rem 1rem;
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		font-size: 0.8125rem;
		transition: all 0.3s ease;
		box-shadow: none;
		opacity: 0.85;
	}

	.clearance-badge:hover {
		opacity: 1;
		background: rgba(123, 44, 191, 0.03);
	}

	.badge-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		background: rgba(123, 44, 191, 0.1);
		border-radius: 6px;
		color: var(--color-purple);
		flex-shrink: 0;
	}

	.badge-icon svg {
		width: 14px;
		height: 14px;
	}

	.badge-content {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.clearance-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--color-text);
		font-weight: 500;
		line-height: 1.3;
	}

	.clearance-item.active {
		color: var(--color-text);
	}

	.clearance-item.willing {
		color: var(--color-text-secondary);
		font-size: 0.75rem;
		font-weight: 400;
	}

	.check-mark {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		background: var(--color-circle-bg);
		color: var(--color-circle-text);
		border-radius: 50%;
		font-size: 0.7rem;
		font-weight: bold;
	}

	.open-circle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		background: var(--color-circle-bg);
		border-radius: 50%;
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.clearance-badge {
			padding: 0.75rem 1rem;
			font-size: 0.85rem;
		}

		.badge-icon {
			width: 28px;
			height: 28px;
		}

		.clearance-item.willing {
			font-size: 0.8rem;
		}
	}
</style>
