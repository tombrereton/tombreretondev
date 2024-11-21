<script lang="ts">
	import portrait from '$lib/assets/portrait.png';
</script>

<div class="gap-15 relative flex flex-col items-center gap-12 overflow-clip p-6">
	<div
		class="animate-blob bg-maroon absolute -left-4 top-16 -z-10 h-72 w-72 rounded-full blur-3xl filter"
	></div>
	<div
		class="animate-blob bg-maroon absolute -right-5 top-12 -z-10 h-72 w-72 rounded-full blur-3xl filter"
	></div>
	<div
		class="animate-blob bg-maroon absolute top-20 -z-10 h-72 w-72 rounded-full blur-3xl filter"
	></div>
	<div id="hero" class="flex flex-col items-center justify-center rounded bg-teal px-2 shadow">
		<h1
			class="mt-6 text-center font-Gilroy-Black
			text-7xl font-black leading-none tracking-tighter text-dark"
		>
			Tom Brereton
		</h1>
		<img src={portrait} alt="Tom Brereton" class="z-10 -mt-10 w-64" />
	</div>
	<div id="landing-text" class="mx-1 text-2xl text-teal">
		<p>
			Hi! I’m Tom from <span class="font-Gilroy-Bold">Australia</span>. I’m a
			<span class="font-Gilroy-Bold">Software Engineer</span>,
			<span class="font-Gilroy-Bold">Team Lead</span> and
			<span class="font-Gilroy-Bold">Cloud Architect</span>. In these roles my main tools are
			<span class="font-Gilroy-Bold">C# & .NET</span>,
			<span class="font-Gilroy-Bold">Microsoft Azure</span> and
			<span class="font-Gilroy-Bold">Terraform</span> but I also enjoy Typescript, React & Svelte. If
			you need help in these areas or want to work with me, reach out below.
		</p>
	</div>
	<div id="landing-nav" class="flex w-full flex-col gap-10">
		<a
			class="rounded-3xl bg-flamingo pb-1 pt-3 text-center font-Gilroy-Bold text-5xl text-dark shadow-flamingo"
			href="/contact">Hire Me</a
		>
		<a
			class="rounded-3xl pb-2 pt-3 text-center font-Gilroy-SemiBold text-3xl text-teal outline outline-2"
			href="/projects">See my projects</a
		>
		<a
			class="rounded-3xl pb-2 pt-3 text-center font-Gilroy-SemiBold text-3xl text-teal outline outline-2"
			href="/blog">My Blog</a
		>
	</div>
</div>
