<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const links = [
		{
			href: resolve('/streams'),
			label: 'Watch live',
			match: (p: string) => p.startsWith('/streams')
		},
		{
			href: resolve('/#people'),
			label: 'The people',
			match: (p: string) => p.startsWith('/hosts')
		},
		{ href: resolve('/reuse'), label: 'Reuse', match: (p: string) => p.startsWith('/reuse') },
		{ href: resolve('/signin'), label: 'Sign in', match: (p: string) => p.startsWith('/signin') }
	];
</script>

<header class="container-page flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-6">
	<a
		href={resolve('/')}
		class="flex items-center gap-3 font-display text-2xl font-semibold text-head no-underline"
	>
		<Logo />
		<span>WildSource</span>
	</a>
	<nav aria-label="Primary" class="flex flex-wrap items-center gap-x-7 gap-y-1 font-semibold">
		{#each links as link (link.href)}
			{@const active = link.match(page.url.pathname)}
			<a
				href={link.href}
				aria-current={active ? 'page' : undefined}
				class={[
					'border-b-[3px] py-2.5 text-ink no-underline',
					active ? 'border-accent' : 'border-transparent'
				]}
			>
				{link.label}
			</a>
		{/each}
		<a
			href={resolve('/add')}
			class="inline-flex min-h-11 items-center rounded-xl bg-primary px-[22px] text-on-primary no-underline"
		>
			Add a camera
		</a>
		<ThemeToggle />
	</nav>
</header>
