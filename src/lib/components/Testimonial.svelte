<script lang="ts">
	interface Props {
		quote: string;
		name: string;
		title: string;
		company: string;
		year?: string;
		companyLogo?: string;
		url?: string;
	}

	let { quote, name, title, company, year, companyLogo, url }: Props = $props();
</script>

<div class="testimonial-card">
	<div class="quote-mark">"</div>
	<blockquote class="quote">{quote}</blockquote>
	<div class="attribution">
		{#if companyLogo}
			<img src={companyLogo} alt={`${company} logo`} class="company-logo" />
		{/if}
		<div class="author-info">
			<div class="name">{name}</div>
			<div class="details">
				{title}, {company}{year ? ` (${year})` : ''}
			</div>
		</div>
		{#if url}
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				class="source-link"
				aria-label="View original testimonial"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
					<polyline points="15 3 21 3 21 9"></polyline>
					<line x1="10" y1="14" x2="21" y2="3"></line>
				</svg>
			</a>
		{/if}
	</div>
</div>

<style>
	.testimonial-card {
		background: rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 2rem;
		transition: all 0.3s ease;
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.testimonial-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(123, 44, 191, 0.15);
		border-color: #9d4edd;
	}

	.quote-mark {
		font-size: 4rem;
		line-height: 1;
		color: #9d4edd;
		font-family: Georgia, serif;
		opacity: 0.3;
		position: absolute;
		top: 1rem;
		left: 1.5rem;
	}

	.quote {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--color-text);
		margin: 0;
		padding-top: 2rem;
		font-style: italic;
		flex-grow: 1;
	}

	.attribution {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: auto;
	}

	.author-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.name {
		font-weight: 600;
		font-size: 1rem;
		color: var(--color-text);
	}

	.details {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.company-logo {
		max-height: 40px;
		max-width: 100px;
		width: auto;
		height: auto;
		object-fit: contain;
		flex-shrink: 0;
	}

	.source-link {
		margin-left: auto;
		color: var(--color-text-secondary);
		opacity: 0.5;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.source-link:hover {
		color: #9d4edd;
		opacity: 1;
	}

	@media (max-width: 768px) {
		.testimonial-card {
			padding: 1.5rem;
		}

		.quote {
			font-size: 1rem;
		}

		.quote-mark {
			font-size: 3rem;
		}
	}
</style>
