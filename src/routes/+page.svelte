<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import FaceTracker from '$lib/components/FaceTracker.svelte';
</script>

<div class="container">
	<section class="hero">
		<FaceTracker size={200} />
		<h1>Tom Brereton</h1>
		<p>Software Engineer | Cloud Engineer | Software Architect</p>
	</section>

	<section class="projects">
		<h2>Projects</h2>
		<div class="projects-grid">
			<ProjectCard owner="tombrereton" repo="dotnet-api" />
			<ProjectCard owner="tombrereton" repo="dotnet-api" />
			<ProjectCard owner="tombrereton" repo="dotnet-api" />
			<!-- Add more projects here -->
			<!-- <ProjectCard owner="tombrereton" repo="another-repo" /> -->
		</div>
	</section>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		padding: 12rem 0 4rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.hero p {
		font-size: 1.25rem;
		color: #6c757d;
	}

	.projects {
		margin-top: 4rem;
	}

	.projects h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		.hero {
			height: 94dvh;
			padding: 2rem 0;
			justify-content: center;
		}

		.hero h1 {
			font-size: 2rem;
		}

		.projects {
			margin-top: 0;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
