<script lang="ts">
	interface Props {
		message: string;
		show?: boolean;
		duration?: number;
		onClose?: () => void;
	}

	let { message, show = $bindable(false), duration = 3000, onClose }: Props = $props();

	let timeoutId: number | undefined = $state();

	$effect(() => {
		if (show) {
			timeoutId = window.setTimeout(() => {
				show = false;
				onClose?.();
			}, duration);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});

	function handleClose() {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		show = false;
		onClose?.();
	}
</script>

{#if show}
	<div class="toast">
		<p>{message}</p>
		<button class="close-button" onclick={handleClose} aria-label="Close notification">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 4L4 12M4 4L12 12"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
{/if}

<style>
	.toast {
		position: fixed;
		bottom: 100px;
		left: 50%;
		transform: translateX(-50%);
		background: var(--gradient-purple-animated);
		background-size: 300% 300%;
		animation:
			slide-up 0.3s ease-out,
			gradient-shift 3s ease infinite;
		color: white;
		padding: 20px 64px 20px 32px;
		border-radius: 16px;
		box-shadow: 0 8px 24px rgba(157, 78, 221, 0.4);
		z-index: 1000;
		max-width: 500px;
		min-width: 320px;
		text-align: center;
		display: flex;
		align-items: center;
		gap: 20px;
	}

	.toast p {
		margin: 0;
		font-size: 16px;
		font-weight: 500;
		flex: 1;
	}

	.close-button {
		position: absolute;
		top: 50%;
		right: 16px;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s ease;
		opacity: 0.8;
	}

	.close-button:hover {
		opacity: 1;
		background: rgba(255, 255, 255, 0.1);
	}

	.close-button:active {
		transform: translateY(-50%) scale(0.95);
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
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

	@media (max-width: 768px) {
		.toast {
			bottom: 80px;
		}

		.toast p {
			font-size: 14px;
		}
	}
</style>
