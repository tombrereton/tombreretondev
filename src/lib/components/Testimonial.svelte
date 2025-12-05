<script lang="ts">
	interface Props {
		quote: string;
		name: string;
		title: string;
		company: string;
		year?: string;
		companyLogo?: string;
	}

	let { quote, name, title, company, year, companyLogo }: Props = $props();
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
	</div>
</div>

<style>
	.testimonial-card {
		background: var(--color-card-bg);
		border: 1px solid var(--color-border);
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
