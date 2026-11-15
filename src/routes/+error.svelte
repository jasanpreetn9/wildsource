<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { streams } from '#lib/catalog.ts';
	import StreamGrid from '#lib/components/StreamGrid.svelte';
	import { pasture, PHOTO_CREDIT } from '#lib/photos.ts';

	const notFound = $derived(page.status === 404);
	const live = streams.filter((s) => s.live).slice(0, 3);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} · WildSource</title>
</svelte:head>

<section class="container-page flex flex-wrap items-center gap-10 pt-14 pb-10">
	<div class="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
		<span class="text-[15px] font-bold tracking-[0.1em] text-muted uppercase">
			{notFound ? 'Page not found' : `Error ${page.status}`}
		</span>
		<h1 class="heading-xl text-[clamp(36px,8vw,64px)]">
			{notFound ? 'We couldn’t find that page.' : 'Something went wrong.'}
		</h1>
		<p class="m-0 max-w-[520px] text-[19px] text-pretty text-muted">
			{#if notFound}
				The link may be old, or the stream may have been taken down by the person who runs it. Here
				are some cameras that are live right now.
			{:else}
				{page.error?.message}
			{/if}
		</p>
		<div class="flex flex-wrap gap-3.5">
			<a href={resolve('/')} class="btn-primary">Back to the homepage</a>
			<a href={resolve('/streams')} class="btn-outline">Browse every stream</a>
		</div>
	</div>
	<figure class="m-0 flex min-w-0 flex-[1_1_360px] flex-col gap-2.5">
		<img
			src={pasture.src}
			alt={pasture.alt}
			width={pasture.width}
			height={pasture.height}
			class="aspect-[4/3] h-auto w-full rounded-3xl object-cover object-right-bottom"
		/>
		<figcaption class="text-right text-[13px] text-muted">{PHOTO_CREDIT}</figcaption>
	</figure>
</section>

<section class="container-page flex flex-col gap-7 pt-6 pb-[88px]">
	<h2 class="heading-md">Live right now</h2>
	<StreamGrid streams={live} />
</section>
