<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import FaceTracker from '$lib/components/FaceTracker.svelte';
	import ContactLinks from '$lib/components/ContactLinks.svelte';
	import AvailabilityBadge from '$lib/components/AvailabilityBadge.svelte';
	import ClearanceBadge from '$lib/components/ClearanceBadge.svelte';
	import Testimonial from '$lib/components/Testimonial.svelte';

	import asosLogo from '$lib/assets/asos_com_logo.jpeg';

	const testimonials = [
		{
			quote:
				"I've had the pleasure to work with Tom as part of the ASOS graduate scheme where he was quickly promoted and became an integral part of our delivery team. He can take on complex engineering problems and produce high-quality work at a very fast pace. He has a great relaxed demeanour which allows him to contribute to the culture of any team.",
			name: 'Kaiser Khan',
			title: 'Agile Coach & Delivery Manager',
			company: 'ASOS',
			year: '2019',
			companyLogo: asosLogo
		}
	];
</script>

<div class="container">
	<section class="hero">
		<FaceTracker size={200} />
		<div class="hero-text">
			<h1>Tom Brereton</h1>
			<p>Lead Software Engineer | Software Architect | Cloud Engineer</p>
			<p class="specialties">Specializing in .NET, Azure & Cloud Solutions</p>
			<div class="badges-container">
				<AvailabilityBadge
					href="mailto:mail@tombrereton.dev?subject=Work%20Opportunity&body=Hi%20Tom%2C%0D%0A%0D%0AI'd%20like%20to%20chat%20about%20a%20potential%20opportunity.%0D%0A%0D%0A"
					message="Open to Work - Hire Me"
				/>
				<ClearanceBadge baseline={true} nv1Willing={true} />
			</div>
		</div>
		<ContactLinks size={28} />
	</section>

	<section class="testimonials">
		<h2>What Clients Say</h2>
		<div class="testimonials-grid">
			{#each testimonials as testimonial}
				<Testimonial {...testimonial} />
			{/each}
		</div>
	</section>

	<section class="projects">
		<h2>Projects</h2>
		<div class="projects-grid">
			<ProjectCard owner="tombrereton" repo="dotnet-api" />
			<ProjectCard owner="tombrereton" repo="flappy-bird" />
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
		padding: 8rem 0 6rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.badges-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 1.25rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin: 0;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.hero p {
		font-size: 1.125rem;
		color: var(--color-text-secondary);
		margin: 0;
		font-weight: 400;
	}

	.hero .specialties {
		font-size: 1rem;
		color: var(--color-text-secondary);
		font-weight: 500;
		opacity: 0.9;
	}

	.testimonials {
		margin-top: 6rem;
	}

	.testimonials h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.projects {
		margin-top: 6rem;
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

		.testimonials {
			margin-top: 3rem;
		}

		.testimonials-grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.projects {
			margin-top: 3rem;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
