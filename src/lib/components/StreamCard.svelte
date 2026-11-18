<script lang="ts">
	import { resolve } from '$app/paths';
	import { getHost, toneOf } from '#lib/catalog.ts';
	import { thumbnail } from '#lib/embed.ts';
	import type { Stream } from '#lib/types.ts';
	import Scene from './Scene.svelte';

	let { stream, onBg = false }: { stream: Stream; onBg?: boolean } = $props();

	const host = $derived(getHost(stream.hostId));
	const thumb = $derived(thumbnail(stream));

	// If the image fails, fall back to the illustration underneath.
	let failed = $state(false);

	function checkLoaded(event: Event) {
		// For a video that no longer exists, YouTube still sends a tiny 120px grey image.
		if ((event.currentTarget as HTMLImageElement).naturalWidth <= 120) failed = true;
	}
</script>

<a
	href={resolve('/streams/[id]', { id: stream.id })}
	class={[
		'flex flex-col overflow-hidden rounded-[18px] border border-line text-ink no-underline shadow-[0_14px_30px_-18px_rgb(0_0_0/0.45)]',
		onBg ? 'bg-bg' : 'bg-surface'
	]}
>
	<div class="relative aspect-video">
		<!-- The illustration sits underneath, so it shows while the image loads or if it fails. -->
		<Scene tone={toneOf(stream)} />
		{#if thumb && !failed}
			<img
				src={thumb.src}
				srcset={thumb.srcset}
				sizes="(min-width: 1100px) 400px, (min-width: 760px) 50vw, 100vw"
				alt=""
				loading="lazy"
				decoding="async"
				onload={checkLoaded}
				onerror={() => (failed = true)}
				class="absolute inset-0 size-full object-cover"
			/>
		{/if}
		<span
			class="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-pill px-2.5 py-1 text-xs font-bold text-pill-ink"
		>
			{#if stream.live}<span aria-hidden="true" class="size-[7px] rounded-full bg-live"></span>{/if}
			{stream.live ? 'Live' : 'Offline'}
		</span>
	</div>
	<div class="flex flex-col gap-2 px-5 pt-4 pb-5">
		<span class="font-display text-[21px] leading-tight font-semibold text-head"
			>{stream.title}</span
		>
		<div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
			<span
				class="rounded-full border-[1.5px] border-line px-2.5 text-xs leading-5 font-bold text-ink"
			>
				{stream.habitat}
			</span>
			<span>{host?.name ?? 'Unknown host'} · {stream.region}</span>
		</div>
	</div>
</a>
