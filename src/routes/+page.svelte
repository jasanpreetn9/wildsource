<script lang="ts">
	import { resolve } from '$app/paths';
	import { hosts, hostToneOf, streams } from '#lib/catalog.ts';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import Edge from '#lib/components/Edge.svelte';
	import HostIcon from '#lib/components/HostIcon.svelte';
	import Scribble from '#lib/components/Scribble.svelte';
	import Sprig from '#lib/components/Sprig.svelte';
	import StreamGrid from '#lib/components/StreamGrid.svelte';
	import { alps, PHOTO_CREDIT, sunflower, swan, type Photo } from '#lib/photos.ts';

	const live = streams.filter((s) => s.live);

	// The hero photos as taped polaroids: a slight tilt each, and a handwritten caption.
	const polaroids: { photo: Photo; caption: string; tilt: string; tape: boolean }[] = [
		{ photo: swan, caption: 'mute swan', tilt: '-rotate-[1.6deg]', tape: true },
		{ photo: alps, caption: 'the Alps', tilt: 'rotate-[1.4deg]', tape: true },
		{ photo: sunflower, caption: 'wild sunflower', tilt: '-rotate-[0.8deg]', tape: false }
	];

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
		<span class="hand-note">field notes from everywhere ↘</span>
		<h1 class="heading-xl">
			Watch nature with the <Scribble double>people</Scribble> who keep the cameras on.
		</h1>
		<p class="m-0 max-w-[540px] text-xl text-pretty text-muted">
			WildSource is an open, community-run network of live nature streams. Anyone can add a camera,
			and the whole catalog is free for anyone to reuse.
		</p>
		<div class="flex flex-wrap gap-3.5">
			<a href={resolve('/streams')} class="btn-primary">Watch live now</a>
			<a href={resolve('/add')} class="btn-outline">Add a camera</a>
		</div>
	</div>

	<figure class="m-0 flex min-w-0 flex-[1_1_480px] flex-col gap-4">
		<!--
			Tiles keep each photo's own shape, so the watermark in the bottom-right corner
			isn't cropped off. Phones: swan full width, the other two side by side below.
			Wider: swan on the left spanning both rows. The 1.2fr/1fr split makes the swan's
			4:5 height match the two 4:3 tiles, and object-right-bottom anchors any small crop.
		-->
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-[1.2fr_1fr]">
			{#each polaroids as { photo, caption, tilt, tape }, i (photo.src)}
				<div
					class={[
						'relative flex flex-col rounded-[4px] bg-polaroid p-2 pb-9 shadow-[0_1px_1px_rgb(0_0_0/0.05),0_10px_24px_-10px_rgb(58_46_26/0.35)]',
						i === 0 && 'col-span-2 sm:col-span-1 sm:row-span-2',
						tilt
					]}
				>
					{#if tape}
						<span
							aria-hidden="true"
							class="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-3 bg-tape shadow-[0_1px_2px_rgb(0_0_0/0.15)]"
						></span>
					{/if}
					<img
						src={photo.src}
						alt={photo.alt}
						width={photo.width}
						height={photo.height}
						fetchpriority={i === 0 ? 'high' : undefined}
						class={[
							'h-auto w-full rounded-[2px] object-cover object-right-bottom',
							i === 0 ? 'aspect-[4/5] sm:aspect-auto sm:h-0 sm:flex-1' : 'aspect-[4/3]'
						]}
					/>
					<span
						aria-hidden="true"
						class="absolute bottom-1.5 left-3 font-hand text-xl font-semibold text-polaroid-ink"
					>
						{caption}
					</span>
				</div>
			{/each}
		</div>
		<figcaption class="text-right text-[13px] text-muted">{PHOTO_CREDIT}</figcaption>
	</figure>
</section>

<section class="topo-on-dark relative bg-band text-on-band">
	<Edge shape="hills" class="text-band" />
	<Sprig kind="branch" class="-top-44 -right-16 w-52 rotate-[18deg]" />
	<div class="container-page flex flex-col gap-9 py-[clamp(56px,9vw,92px)]">
		<div class="flex flex-wrap items-end justify-between gap-x-5 gap-y-3">
			<div class="flex flex-col gap-1">
				<span class="hand-note text-hand-on-dark!">on air right now</span>
				<h2 class="heading-lg text-on-band!">Live right now</h2>
			</div>
			<a href={resolve('/streams')} class="btn-outline-on-dark min-h-11 px-5">
				Browse every stream
			</a>
		</div>
		<StreamGrid streams={live.slice(0, 6)} />
	</div>
	<Edge shape="hills" side="bottom" class="text-band" />
</section>

<section
	id="people"
	class="relative container-page flex flex-col gap-10 py-[clamp(80px,11vw,120px)]"
>
	<Sprig kind="fern" class="top-6 -left-32 w-36 -rotate-[30deg]" />
	<div class="flex max-w-[680px] flex-col gap-3">
		<h2 class="heading-lg">Every stream has someone behind it</h2>
		<span class="font-display text-lg text-muted italic"
			>A feeder on a porch, a nest box on a barn.</span
		>
		<p class="m-0 text-lg text-pretty text-muted">
			WildSource has no network of company cameras. It is a feeder on a porch, a nest box on a barn,
			a pond at the edge of a yard, each kept running by the person who put it there.
		</p>
	</div>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
		{#each hosts as host (host.id)}
			<a
				href={resolve('/hosts/[id]', { id: host.id })}
				class="flex flex-col gap-3 rounded-[18px] border border-line bg-surface p-7 text-ink no-underline"
			>
				<HostIcon camType={host.camType} tone={hostToneOf(host)} />
				<span class="font-display text-[22px] font-semibold">{host.name}</span>
				<span class="text-[15px] text-muted">{host.camType} · {host.region}</span>
				{#if host.quote}
					<p class="m-0">{host.quote}</p>
				{/if}
				<!-- The whole card links to the profile, which has the "Visit" link (links can't nest). -->
			</a>
		{/each}
	</div>
</section>

<section class="topo-on-dark relative bg-forest text-band-muted">
	<Edge shape="ridge" class="text-forest" />
	<Sprig kind="leaf" class="right-[4%] -bottom-28 w-36 rotate-[200deg]" />
	<div class="container-page flex flex-col gap-10 py-[clamp(64px,10vw,104px)]">
		<div class="flex flex-col gap-1">
			<span class="hand-note text-hand-on-dark!">three small steps</span>
			<h2 class="heading-lg text-on-band!">How it works</h2>
		</div>
		<ol
			class="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6 p-0"
		>
			{#each steps as step, i (step.title)}
				<li class="flex flex-col gap-2.5 rounded-[18px] border border-on-band/15 bg-on-band/5 p-6">
					<span
						aria-hidden="true"
						class="relative grid size-14 place-items-center font-hand text-[32px] font-semibold text-hand-on-dark"
					>
						<svg viewBox="0 0 54 54" class="absolute inset-0 size-full">
							<path
								filter="url(#rough-strong)"
								d="M27 4 C 44 3, 51 16, 50 28 C 49 42, 38 51, 25 50 C 11 49, 3 38, 4 26 C 5 13, 15 5, 30 6"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
						{i + 1}
					</span>
					<h3 class="m-0 font-display text-[22px] font-semibold text-on-band">{step.title}</h3>
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
