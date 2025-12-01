<script lang="ts">
	interface Props {
		owner: string;
		repo: string;
	}

	let { owner, repo }: Props = $props();

	interface GitHubRepo {
		name: string;
		description: string;
		html_url: string;
		homepage: string | null;
		stargazers_count: number;
		forks_count: number;
		language: string;
		topics: string[];
	}

	let repoData: GitHubRepo | null = $state(null);
	let socialImageUrl: string | null = $state(null);
	let imageLoading = $state(true);
	let error = $state('');

	// Cache for social images (shared across all component instances)
	const IMAGE_CACHE_KEY = 'github_social_images';
	const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

	async function fetchRepo() {
		try {
			const headers: HeadersInit = {
				Accept: 'application/vnd.github.v3+json'
			};

			// Add authentication if token is available
			const token = import.meta.env.VITE_GITHUB_TOKEN;
			if (token) {
				headers['Authorization'] = `Bearer ${token}`;
			}

			const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
				headers
			});

			if (!response.ok) {
				throw new Error('Failed to fetch repository');
			}

			repoData = await response.json();

			// Fetch the social preview image asynchronously (don't await)
			fetchSocialImage();
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
		}
	}

	function getCachedImages(): Record<string, { url: string; timestamp: number }> {
		try {
			const cached = localStorage.getItem(IMAGE_CACHE_KEY);
			if (cached) {
				return JSON.parse(cached);
			}
		} catch (err) {
			console.error('Failed to read image cache:', err);
		}
		return {};
	}

	function setCachedImage(repoKey: string, url: string) {
		try {
			const cache = getCachedImages();
			cache[repoKey] = { url, timestamp: Date.now() };
			localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(cache));
		} catch (err) {
			console.error('Failed to save image cache:', err);
		}
	}

	async function fetchSocialImage() {
		try {
			imageLoading = true;
			const repoKey = `${owner}/${repo}`;

			// Check cache first
			const cache = getCachedImages();
			const cached = cache[repoKey];
			if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY_MS) {
				socialImageUrl = cached.url;
				imageLoading = false;
				return;
			}

			// Use a proxy service to fetch the GitHub page and extract og:image
			// This avoids CORS issues
			const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://github.com/${owner}/${repo}`)}`;
			const response = await fetch(proxyUrl);
			const html = await response.text();

			// Extract og:image URL from the HTML
			const match = html.match(/property="og:image"\s+content="([^"]+)"/);
			if (match && match[1]) {
				// Add size parameters to reduce image size (width=300)
				const url = new URL(match[1]);
				url.searchParams.set('w', '300');
				socialImageUrl = url.toString();

				// Cache the result
				setCachedImage(repoKey, socialImageUrl);
			}
			imageLoading = false;
		} catch (err) {
			console.error('Failed to fetch social image:', err);
			imageLoading = false;
		}
	}

	$effect(() => {
		fetchRepo();
	});
</script>

{#if error}
	<div class="project-card error-card">
		<p>Error: {error}</p>
	</div>
{:else if repoData}
	<a href={repoData.html_url} target="_blank" rel="noopener noreferrer" class="project-card">
		<div class="social-image">
			{#if imageLoading}
				<div class="image-placeholder">
					<span>📦</span>
				</div>
			{:else if socialImageUrl}
				<img src={socialImageUrl} alt="{repoData.name} preview" />
			{/if}
		</div>

		<div class="card-content">
			<div class="card-header">
				<h3>{repoData.name}</h3>
				{#if repoData.language}
					<span class="language">{repoData.language}</span>
				{/if}
			</div>

			<p class="description">{repoData.description || 'No description available'}</p>

			<div class="card-footer">
				<div class="stats">
					<span class="stat">⭐ {repoData.stargazers_count}</span>
					<span class="stat">🔀 {repoData.forks_count}</span>
				</div>

				{#if repoData.topics && repoData.topics.length > 0}
					<div class="topics">
						{#each repoData.topics.slice(0, 3) as topic}
							<span class="topic">{topic}</span>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</a>
{/if}

<style>
	.project-card {
		background: var(--color-background-card);
		border-radius: 8px;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: row;
		gap: 0;
		overflow: hidden;
	}

	.project-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.social-image {
		flex-shrink: 0;
		width: 150px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.social-image img {
		width: 100%;
		height: auto;
		object-fit: contain;
		display: block;
	}

	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f9fa;
		font-size: 2rem;
	}

	.card-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 1;
	}

	.loading-card,
	.error-card {
		padding: 2rem;
		text-align: center;
		color: var(--color-text-secondary);
	}

	.error-card {
		color: #dc3545;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 1rem;
	}

	.card-header h3 {
		font-size: 1.25rem;
		margin: 0;
	}

	.language {
		font-size: 0.875rem;
		padding: 0.25rem 0.75rem;
		background: var(--color-background-alt);
		border-radius: 12px;
		white-space: nowrap;
		font-family: 'Geist', sans-serif;
	}

	.description {
		color: var(--color-text-secondary);
		flex-grow: 1;
		line-height: 1.5;
	}

	.card-footer {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.stats {
		display: flex;
		gap: 1rem;
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.topic {
		font-size: 0.75rem;
		padding: 0.25rem 0.5rem;
		background: #e9ecef;
		border-radius: 4px;
		color: #495057;
	}
</style>
