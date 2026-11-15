<script lang="ts">
	import { resolve } from '$app/paths';
	import { invalidateAll } from '$app/navigation';
	import { toneOf } from '#lib/catalog.ts';
	import Scene from '#lib/components/Scene.svelte';
	import StreamGrid from '#lib/components/StreamGrid.svelte';
	import { embedUrl } from '#lib/embed.ts';
	import { PERMISSION_LABELS } from '#lib/types.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { stream, host, more } = $derived(data);
	const src = $derived(embedUrl(stream));
	const hostName = $derived(host?.name ?? 'The host');

	const formatDate = (iso: string) =>
		// Dates are stored as YYYY-MM-DD, which JS reads as UTC midnight, so format in UTC too.
		new Date(iso).toLocaleDateString('en', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			timeZone: 'UTC'
		});

	const details = $derived([
		{ k: 'Habitat', v: stream.habitat },
		{ k: 'Region', v: stream.region },
		{ k: 'Camera', v: stream.camera },
		{ k: 'Added', v: formatDate(stream.added) },
		{ k: 'Video', v: `© ${hostName}` },
		{ k: 'Shown here', v: PERMISSION_LABELS[stream.permission] }
	]);

	let copied = $state(false);
	async function copyEmbed() {
		if (!src) return;
		await navigator.clipboard.writeText(
			`<iframe src="${src}" title="${stream.title}" allowfullscreen></iframe>`
		);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	async function share() {
		const url = location.href;
		if (navigator.share) await navigator.share({ title: stream.title, url }).catch(() => {});
		else await navigator.clipboard.writeText(url);
	}
</script>

<svelte:head>
	<title>{stream.title} · WildSource</title>
</svelte:head>

<section class="container-page flex flex-col gap-6 pt-2 pb-14">
	<nav aria-label="Breadcrumb" class="text-[15px] text-muted">
		<a href={resolve('/streams')} class="text-link">All streams</a> / {stream.habitat} / {stream.title}
	</nav>

	<div class="flex flex-wrap items-start gap-8">
		<div class="flex min-w-0 flex-[2_1_620px] flex-col gap-6">
			{#if !stream.live}
				<div
					role="status"
					class="box-border flex aspect-[16/10] min-h-[260px] flex-col items-center justify-center gap-3.5 rounded-[22px] border border-line bg-surface2 p-6 text-center"
				>
					<svg
						width="52"
						height="52"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						class="text-muted"
					>
						<path d="M3 3l18 18" />
						<path d="M10.6 6H15a2 2 0 0 1 2 2v2.4l4-2.4v8" />
						<path d="M15 17H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2" />
					</svg>
					<h2 class="m-0 font-display text-[30px] font-semibold text-head">
						This camera is offline
					</h2>
					<p class="m-0 max-w-[460px] text-[17px] text-pretty text-muted">
						{hostName} last had it online{stream.lastLive
							? ` on ${formatDate(stream.lastLive)}`
							: ''}. Cameras drop out for all sorts of reasons, like weather, power or wifi. It may
						be back soon.
					</p>
					<div class="flex flex-wrap justify-center gap-3">
						<a href={resolve('/streams')} class="btn-primary">Watch other live streams</a>
						<button type="button" onclick={() => invalidateAll()} class="btn-quiet">
							Check again
						</button>
					</div>
				</div>
			{:else if src}
				<iframe
					{src}
					title="{stream.title}, live"
					allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
					allowfullscreen
					referrerpolicy="strict-origin-when-cross-origin"
					class="aspect-video w-full rounded-[22px] border-0"
				></iframe>
			{:else}
				<!-- No embeddable link yet (placeholder seed data): show the illustration. -->
				<div class="relative aspect-video overflow-hidden rounded-[22px]">
					<Scene tone={toneOf(stream)} variant="wide" />
					<span
						class="absolute top-[18px] left-[18px] rounded-full bg-pill px-3 py-1.5 text-[13px] font-bold text-pill-ink"
					>
						Live
					</span>
				</div>
			{/if}

			<div class="flex flex-col gap-3.5">
				<h1
					class="m-0 font-display text-[clamp(28px,6vw,42px)] leading-[1.1] font-semibold text-head"
				>
					{stream.title}
				</h1>
				<div class="flex flex-wrap gap-x-5 gap-y-2 text-muted">
					<span>{stream.habitat}</span>
					<span>{stream.region}</span>
					{#if !stream.live && stream.lastLive}
						<span>Last live {formatDate(stream.lastLive)}</span>
					{/if}
				</div>
				<p class="m-0 max-w-[680px] text-lg text-pretty">{stream.about}</p>
			</div>

			<div class="flex flex-wrap gap-3">
				<button type="button" onclick={share} class="btn-quiet">Share</button>
				{#if src}
					<button type="button" onclick={copyEmbed} class="btn-quiet">
						{copied ? 'Copied' : 'Copy embed code'}
					</button>
				{/if}
				<a
					rel="external"
					href="mailto:?subject={encodeURIComponent(`Problem with ${stream.title}`)}"
					class="btn-quiet">Report a problem</a
				>
			</div>
		</div>

		<aside class="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
			{#if host}
				<div class="flex flex-col gap-3 rounded-[20px] border border-line bg-surface p-6">
					<div class="flex items-center gap-3.5">
						<span aria-hidden="true" class="size-14 flex-none rounded-full bg-avatar"></span>
						<div class="flex flex-col">
							<span class="font-display text-xl font-semibold">{host.name}</span>
							<span class="text-sm text-muted">{host.region}</span>
						</div>
					</div>
					<p class="m-0">{host.quote}</p>
					<a href={resolve('/hosts/[id]', { id: host.id })} class="py-2 font-bold text-link">
						See all cameras by {host.name}
					</a>
				</div>
			{/if}
			<div class="flex flex-col gap-3.5 rounded-[20px] border border-line bg-surface p-6">
				<h2 class="m-0 text-lg font-bold">Camera details</h2>
				<dl class="m-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[15px]">
					{#each details as d (d.k)}
						<dt class="text-muted">{d.k}</dt>
						<dd class="m-0 text-right">{d.v}</dd>
					{/each}
				</dl>
			</div>
		</aside>
	</div>
</section>

{#if more.length}
	<section class="container-page flex flex-col gap-7 pt-6 pb-[88px]">
		<h2 class="heading-md">More like this</h2>
		<StreamGrid streams={more} />
	</section>
{/if}
