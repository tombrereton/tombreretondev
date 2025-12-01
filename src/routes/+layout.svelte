<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- Primary Meta Tags -->
	<title>Tom Brereton | .NET & Azure Contractor Australia | Lead Software Engineer</title>
	<meta
		name="title"
		content="Tom Brereton | .NET & Azure Contractor Australia | Lead Software Engineer"
	/>
	<meta
		name="description"
		content="Experienced .NET and Azure contractor specializing in enterprise cloud solutions, API development, and microservices architecture. Available for contract work across Australia."
	/>
	<meta
		name="keywords"
		content=".NET contractor Australia, Azure architect, cloud engineer, software consultant, C# developer, enterprise software, microservices, API development, Azure migration, .NET modernization, contract software engineer Australia"
	/>
	<meta name="author" content="Tom Brereton" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://tombrereton.dev/" />
	<meta property="og:title" content="Tom Brereton | .NET & Azure Contractor Australia" />
	<meta
		property="og:description"
		content="Experienced .NET and Azure contractor specializing in enterprise cloud solutions. Available for contract work across Australia."
	/>
	<meta property="og:locale" content="en_AU" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://tombrereton.dev/" />
	<meta property="twitter:title" content="Tom Brereton | .NET & Azure Contractor Australia" />
	<meta
		property="twitter:description"
		content="Experienced .NET and Azure contractor specializing in enterprise cloud solutions. Available for contract work across Australia."
	/>

	<!-- Structured Data (JSON-LD) for Rich Snippets -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Tom Brereton",
			"url": "https://tombrereton.dev",
			"email": "mail@tombrereton.dev",
			"jobTitle": "Lead Software Engineer & Cloud Architect",
			"description": ".NET and Azure contractor specializing in enterprise cloud solutions",
			"knowsAbout": [
				".NET",
				"C#",
				"Azure",
				"Cloud Architecture",
				"Microservices",
				"API Development",
				"Kubernetes",
				"DevOps"
			],
			"workLocation": {
				"@type": "Place",
				"address": {
					"@type": "PostalAddress",
					"addressCountry": "AU"
				}
			},
			"sameAs": ["https://github.com/tombrereton", "https://www.linkedin.com/in/tombrereton"]
		}
	</script>
</svelte:head>

<ThemeToggle />

<div class="app">
	{@render children()}
</div>

<style>
	.app {
		min-height: 100vh;
		background: repeating-linear-gradient(
			45deg,
			var(--stripe-color-1),
			var(--stripe-color-1) 8px,
			var(--stripe-color-2) 8px,
			var(--stripe-color-2) 10px
		);
	}
</style>
