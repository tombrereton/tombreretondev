<script lang="ts">
	import portrait from '$lib/assets/portrait.png';
</script>

<div
	class="gap-15 flex flex-col items-center gap-12 overflow-clip p-6 lg:h-screen lg:justify-center lg:gap-32"
>
	<div class="gap-15 flex flex-col items-center gap-12 lg:max-w-5xl lg:flex-row">
		<div
			id="hero"
			class="backlight relative flex flex-col items-center justify-center rounded bg-teal px-2 lg:px-6"
		>
			<h1
				class="mt-6 text-center font-Gilroy-Black
			text-7xl font-black leading-none tracking-tighter text-dark lg:text-9xl"
			>
				Tom Brereton
			</h1>
			<img src={portrait} alt="Tom Brereton" class="z-10 -mt-10 w-64 lg:-mt-16" />
		</div>
		<div id="landing-text" class="mx-1 max-w-lg text-2xl text-teal lg:text-3xl">
			<p>
				Hi! I’m Tom from <span class="font-Gilroy-Bold">Australia</span>. I’m a
				<span class="font-Gilroy-Bold">Software Engineer</span>,
				<span class="font-Gilroy-Bold">Team Lead</span> and
				<span class="font-Gilroy-Bold">Cloud Architect</span>. In these roles my main tools are
				<span class="font-Gilroy-Bold">C# & .NET</span>,
				<span class="font-Gilroy-Bold">Microsoft Azure</span> and
				<span class="font-Gilroy-Bold">Terraform</span> but I also enjoy Typescript, React & Svelte.
				If you need help in these areas,
				<span class="font-Gilroy-Bold">reach out below</span>.
			</p>
		</div>
	</div>
	<div
		id="landing-nav"
		class="lg flex w-full flex-col items-center gap-10 lg:flex-row lg:justify-center"
	>
		<a
			class="flex h-16 w-80 items-center justify-center rounded-3xl bg-flamingo pt-1 text-center font-Gilroy-Bold text-5xl text-dark shadow-flamingo lg:order-2"
			href="/contact">Let's chat!</a
		>
		<a
			class="flex h-16 w-80 items-center justify-center rounded-3xl pt-1 text-center font-Gilroy-Regular text-4xl text-teal outline outline-2 lg:order-1"
			href="/projects">See my projects</a
		>
		<a
			class="flex h-16 w-80 items-center justify-center rounded-3xl pt-1 text-center font-Gilroy-Regular text-4xl text-teal outline outline-2 lg:order-3"
			href="/blog">My blog</a
		>
	</div>
</div>
