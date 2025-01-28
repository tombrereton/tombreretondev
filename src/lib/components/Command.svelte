<script lang="ts">
	import { Command, Dialog } from 'bits-ui';
	import { PenNib, House, PaperPlaneTilt, Code } from 'phosphor-svelte';
	import { Hamburger } from 'svelte-hamburgers';
	let dialogOpen = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			dialogOpen = true;
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<div
	class="inline-flex h-10 items-center justify-center rounded-md border-text px-2 text-sm lg:hidden"
>
	<Hamburger bind:open={dialogOpen} --color="#c6d0f5" --layer-height="2px" />
</div>
<button
	onclick={() => (dialogOpen = true)}
	class="text-md hidden items-center justify-center rounded-md border border-subtext1 p-2 px-4 text-subtext1 lg:inline-flex"
>
	Menu ⌘K
</button>
<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
		/>
		<Dialog.Content
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2
			data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 w-full max-w-[94%]
			translate-x-[-50%] translate-y-[-50%] rounded-card-lg bg-grey shadow-popover outline-none sm:max-w-[490px] md:w-full"
		>
			<Dialog.Title class="sr-only">Command Menu</Dialog.Title>
			<Dialog.Description class="sr-only">
				This is the command menu. Use the arrow keys to navigate and press ⌘K to open the search
				bar.
			</Dialog.Description>
			<Command.Root
				class="flex h-full w-full flex-col divide-y divide-border self-start overflow-hidden rounded-xl border border-surface2 bg-crust"
			>
				<Command.Input
					class="focus-override inline-flex h-input w-full truncate bg-crust px-4 text-sm outline-none transition-colors placeholder:text-text/50 focus:ring-0"
					placeholder="Search for something..."
				/>
				<Command.List class="max-h-[280px] overflow-y-auto overflow-x-hidden px-2 pb-2">
					<Command.Viewport>
						<Command.Empty
							class="flex w-full items-center justify-center pb-6 pt-8 text-sm text-muted-foreground"
						>
							No results found.
						</Command.Empty>
						<Command.Group>
							<Command.GroupHeading class="px-3 pb-2 pt-4 text-xs text-subtext0">
								Pages
							</Command.GroupHeading>
							<Command.GroupItems>
								<Command.LinkItem
									href="/contact"
									class="flex h-10 cursor-pointer select-none items-center gap-2 rounded-button px-3 py-2.5 text-sm capitalize outline-none data-[selected]:bg-grey"
									keywords={['contact', 'job']}
									onSelect={() => (dialogOpen = false)}
								>
									<PaperPlaneTilt class="size-4" />
									Contact
								</Command.LinkItem>
								<Command.LinkItem
									href="/"
									class="flex h-10 cursor-pointer select-none items-center gap-2 rounded-button px-3 py-2.5 text-sm capitalize outline-none data-[selected]:bg-grey"
									keywords={['home']}
									onSelect={() => (dialogOpen = false)}
								>
									<House class="size-4" />
									Home
								</Command.LinkItem>
								<Command.LinkItem
									href="/projects"
									class="flex h-10 cursor-pointer select-none items-center gap-2 rounded-button px-3 py-2.5 text-sm capitalize outline-none data-[selected]:bg-grey"
									keywords={['projects']}
									onSelect={() => (dialogOpen = false)}
								>
									<Code class="size-4 " />
									Projects
								</Command.LinkItem>
								<Command.LinkItem
									href="/blog"
									class="flex h-10 cursor-pointer select-none items-center gap-2 rounded-button px-3 py-2.5 text-sm capitalize outline-none data-[selected]:bg-grey"
									keywords={['blog']}
									onSelect={() => (dialogOpen = false)}
								>
									<PenNib class="size-4" />
									Blog
								</Command.LinkItem>
							</Command.GroupItems>
						</Command.Group>
					</Command.Viewport>
				</Command.List>
			</Command.Root>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
