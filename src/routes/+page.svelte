<script lang="ts">
	import { resolve } from '$app/paths';
	import { hosts, hostToneOf, streams } from '#lib/catalog.ts';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Scene from '#lib/components/Scene.svelte';
	import StreamGrid from '#lib/components/StreamGrid.svelte';

	const live = streams.filter((s) => s.live);
	const featured = live[0];

	const steps = [
		{ title: 'Find a stream', body: 'Browse cameras by habitat and see which are live right now.' },
		{
			title: 'Add a camera',
			body: 'Share your own stream and it joins the same catalog as everyone else’s.'
		},
		{
			title: 'Reuse the catalog',
			body: 'The whole list is free to use in classrooms, apps and displays.'
		}
	];
</script>

<svelte:head>
	<title>WildSource: live nature streams</title>
	<meta
		name="description"
		content="An open, community-run network of live nature streams. Anyone can add a camera, and the whole catalog is free for anyone to reuse."
	/>
</svelte:head>

<section class="container-page flex flex-wrap items-center gap-14 pt-12 pb-24">
	<div class="flex min-w-0 flex-[1_1_440px] flex-col gap-[26px]">
		<h1 class="heading-xl">Watch nature with the people who keep the cameras on.</h1>
		<p class="m-0 max-w-[540px] text-xl text-pretty text-muted">
			WildSource is an open, community-run network of live nature streams. Anyone can add a camera,
			and the whole catalog is free for anyone to reuse.
		</p>
		<div class="flex flex-wrap gap-3.5">
			<a href={resolve('/streams')} class="btn-primary">Watch live now</a>
			<a href={resolve('/add')} class="btn-outline">Add a camera</a>
		</div>
	</div>

	<div class="grid min-w-0 flex-[1_1_480px] grid-cols-[1.4fr_1fr] gap-4">
		{#if featured}
			<a
				href={resolve('/streams/[id]', { id: featured.id })}
				class="relative row-span-2 flex min-h-[clamp(240px,40vw,360px)] items-end overflow-hidden rounded-[22px] no-underline"
			>
				<Scene tone={0} variant="hero" />
				<span
					class="relative m-4 rounded-full bg-pill px-3 py-1.5 text-[13px] font-bold text-pill-ink"
				>
					Live · {featured.title}
				</span>
			</a>
		{/if}
		<div class="relative min-h-[172px] overflow-hidden rounded-[22px]">
			<Scene tone={1} variant="small" />
		</div>
		<div class="relative min-h-[172px] overflow-hidden rounded-[22px]">
			<Scene tone={2} variant="small" />
		</div>
	</div>
</section>

<section class="bg-surface">
	<div class="container-page flex flex-col gap-9 py-[clamp(48px,9vw,88px)]">
		<div class="flex flex-wrap items-end justify-between gap-3">
			<h2 class="heading-lg">Live right now</h2>
			<a href={resolve('/streams')} class="py-3 font-bold text-link">Browse every stream</a>
		</div>
		<StreamGrid streams={live.slice(0, 6)} onBg />
	</div>
</section>

<section id="people" class="container-page flex flex-col gap-10 py-[clamp(48px,9vw,96px)]">
	<div class="flex max-w-[680px] flex-col gap-3">
		<h2 class="heading-lg">Every stream has someone behind it</h2>
		<p class="m-0 text-lg text-pretty text-muted">
			WildSource has no network of company cameras. It is a feeder on a porch, a nest box on a barn,
			a pond at the edge of a yard, each kept running by the person who put it there.
		</p>
	</div>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
		{#each hosts as host (host.id)}
			<a
				href={resolve('/hosts/[id]', { id: host.id })}
				class="flex flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-7 text-ink no-underline"
			>
				<span
					aria-hidden="true"
					class="size-14 rounded-full"
					style="background: var(--tile-{hostToneOf(host)}-sky)"
				></span>
				<span class="font-display text-[22px] font-semibold">{host.name}</span>
				<span class="text-[15px] text-muted">{host.camType} · {host.region}</span>
				<p class="m-0">{host.quote}</p>
			</a>
		{/each}
	</div>
</section>

<section class="bg-surface2">
	<div class="container-page flex flex-col gap-10 py-[clamp(48px,9vw,88px)]">
		<h2 class="heading-lg">How it works</h2>
		<ol
			class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-8 p-0"
		>
			{#each steps as step, i (step.title)}
				<li class="flex flex-col gap-2.5">
					<span
						aria-hidden="true"
						class="inline-flex size-11 items-center justify-center rounded-full bg-primary font-bold text-on-primary"
					>
						{i + 1}
					</span>
					<h3 class="m-0 text-[21px] font-bold">{step.title}</h3>
					<p class="m-0 text-[17px] text-pretty">{step.body}</p>
				</li>
			{/each}
		</ol>
	</div>
</section>

<CtaBand
	title="Add your camera to the map of the wild."
	body="If it points at something living and it streams, it belongs here. The catalog stays free for anyone to reuse, so what you share keeps travelling."
	href={resolve('/add')}
	label="Add a camera"
/>
