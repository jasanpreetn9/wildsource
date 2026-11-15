<script lang="ts">
	import { resolve } from '$app/paths';
	import { hostToneOf } from '#lib/catalog.ts';
	import StreamGrid from '#lib/components/StreamGrid.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { host, cameras, others } = $derived(data);

	async function share() {
		const url = location.href;
		if (navigator.share) await navigator.share({ title: host.name, url }).catch(() => {});
		else await navigator.clipboard.writeText(url);
	}
</script>

<svelte:head>
	<title>{host.name} · WildSource</title>
</svelte:head>

<section class="container-page flex flex-wrap items-center gap-8 pt-10 pb-14">
	<span aria-hidden="true" class="size-[120px] flex-none rounded-full bg-avatar"></span>
	<div class="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
		<h1 class="m-0 font-display text-[clamp(32px,7vw,52px)] leading-[1.05] font-semibold text-head">
			{host.name}
		</h1>
		<span class="text-muted">{host.region} · Hosting since {host.since}</span>
		{#if host.bio}
			<p class="m-0 max-w-[700px] text-[19px] text-pretty">{host.bio}</p>
		{/if}
	</div>
	<div class="flex flex-wrap gap-3">
		<a href={host.url} rel="external" class="btn-outline">Visit {host.name}</a>
		<button type="button" onclick={share} class="btn-quiet">Share profile</button>
	</div>
</section>

<section class="container-page flex flex-col gap-7 pt-6 pb-[72px]">
	<h2 class="heading-md">Cameras run by {host.name}</h2>
	<StreamGrid streams={cameras} />
</section>

{#if others.length}
	<section class="bg-surface2">
		<div class="container-page flex flex-col gap-7 py-[clamp(48px,9vw,72px)]">
			<h2 class="heading-md">Other people on WildSource</h2>
			<div class="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
				{#each others as other (other.id)}
					<a
						href={resolve('/hosts/[id]', { id: other.id })}
						class="flex items-center gap-4 rounded-[20px] border border-line bg-surface p-5 text-ink no-underline"
					>
						<span
							aria-hidden="true"
							class="size-[52px] flex-none rounded-full"
							style="background: var(--tile-{hostToneOf(other)}-sky)"
						></span>
						<div class="flex flex-col">
							<span class="font-display text-xl font-semibold">{other.name}</span>
							<span class="text-sm text-muted">{other.camType} · {other.region}</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}
