<script lang="ts">
	import portrait from '$lib/assets/portrait.png';
</script>

<div
	class="gap-15 flex grow flex-col items-center gap-12 overflow-clip p-6 lg:h-full lg:justify-center lg:gap-32"
>
	<div class="gap-15 flex flex-col items-center gap-12 lg:max-w-5xl lg:flex-row">
		<div
			id="hero"
			class="backlight relative flex flex-col items-center justify-center rounded-2xl bg-teal px-2 lg:px-6"
		>
			<h1
				class="mt-6 text-center font-Gilroy-Black
			text-7xl font-black leading-none tracking-tighter text-grey lg:text-9xl"
			>
				Tom Brereton
			</h1>
			<img src={portrait} alt="Tom Brereton" class="z-10 -mt-10 w-64 lg:-mt-16" />
		</div>
		<div id="landing-text" class="mx-1 flex max-w-lg flex-col gap-6 text-2xl text-teal lg:text-3xl">
			<p>
				Hi! I’m Tom from <span class="hover:animate-pulse font-Gilroy-Bold">Australia</span>. I’m a
				<span class="hover:animate-pulse font-Gilroy-Bold">Software Engineer</span>,
				<span class="hover:animate-pulse font-Gilroy-Bold">Team Lead</span> and
				<span class="hover:animate-pulse font-Gilroy-Bold">Cloud Architect</span>. My main tools are
				<span class="hover:animate-pulse font-Gilroy-Bold">C# & .NET</span>,
				<span class="hover:animate-pulse font-Gilroy-Bold">Microsoft Azure</span> and
				<span class="hover:animate-pulse font-Gilroy-Bold">Terraform</span>, but I also enjoy
				Typescript, React & Svelte.
			</p>
			<p>
				Every business is unique, and your <span class="hover:animate-pulse font-Gilroy-Bold"
					>website</span
				>
				and <span class="hover:animate-pulse font-Gilroy-Bold">cloud services</span> should be too. Let's
				chat and figure out what you need together.
			</p>
		</div>
	</div>
	<div
		id="landing-nav"
		class="lg flex w-full animate-fade-in-2 flex-col items-center gap-10 opacity-0 lg:flex-row lg:justify-center"
	>
		<a
			class="flex h-16 w-80 items-center justify-center rounded-3xl bg-flamingo pt-1 text-center font-Gilroy-Bold text-3xl text-grey shadow shadow-flamingo transition hover:shadow-big hover:shadow-flamingo lg:order-2"
			href="/contact">Let's chat!</a
		>
		<a
			class="hover:backlight flex h-16 w-80 items-center justify-center rounded-3xl pt-1 text-center font-Gilroy-Regular text-3xl text-teal outline outline-2 transition hover:shadow hover:shadow-teal lg:order-1"
			href="/projects">See my projects</a
		>
		<a
			class="flex h-16 w-80 items-center justify-center rounded-3xl pt-1 text-center font-Gilroy-Regular text-3xl text-teal outline outline-2 transition hover:shadow hover:shadow-teal lg:order-3"
			href="/blog">My blog</a
		>
	</div>
</div>
