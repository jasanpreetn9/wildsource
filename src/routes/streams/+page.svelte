<script lang="ts">
	import { resolve } from '$app/paths';
	import { countries, countryOf, streams } from '#lib/catalog.ts';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import StreamGrid from '#lib/components/StreamGrid.svelte';
	import { HABITATS } from '#lib/types.ts';

	const PAGE_SIZE = 9;
	const filters = ['All', ...HABITATS] as const;
	type Sort = 'live' | 'newest' | 'az';

	let habitat = $state<string>('All');
	let country = $state(''); // '' means every region
	let query = $state('');
	let sort = $state<Sort>('live');
	let limit = $state(PAGE_SIZE);

	const matches = $derived.by(() => {
		const q = query.trim().toLowerCase();
		const filtered = streams.filter(
			(s) =>
				(habitat === 'All' || s.habitat === habitat) &&
				(!country || countryOf(s) === country) &&
				(!q || `${s.title} ${s.habitat} ${s.region}`.toLowerCase().includes(q))
		);
		return filtered.toSorted((a, b) => {
			if (sort === 'az') return a.title.localeCompare(b.title);
			if (sort === 'newest') return b.added.localeCompare(a.added);
			return Number(b.live) - Number(a.live);
		});
	});

	const shown = $derived(matches.slice(0, limit));

	function clear() {
		habitat = 'All';
		country = '';
		query = '';
	}
</script>

<svelte:head>
	<title>Every stream · WildSource</title>
</svelte:head>

<section class="container-page flex flex-col gap-3.5 pt-10 pb-2">
	<h1 class="m-0 font-display text-[clamp(34px,7vw,56px)] leading-[1.05] font-semibold text-head">
		Every stream
	</h1>
	<p class="m-0 max-w-[640px] text-[19px] text-pretty text-muted">
		Cameras kept by ordinary people, from every kind of habitat. Filter by habitat or region, or
		search by name.
	</p>
</section>

<section class="container-page flex flex-col gap-5 pt-6">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div role="group" aria-label="Filter by habitat" class="flex flex-wrap gap-2">
			{#each filters as label (label)}
				{@const on = habitat === label}
				<button
					type="button"
					aria-pressed={on}
					onclick={() => {
						habitat = label;
						limit = PAGE_SIZE;
					}}
					class={[
						'min-h-11 cursor-pointer rounded-full border-[1.5px] px-[18px] font-sans text-[15px] font-bold',
						on ? 'border-primary bg-primary text-on-primary' : 'border-line bg-surface text-ink'
					]}
				>
					{label}
				</button>
			{/each}
		</div>
		<!-- Each label stays with its control when the row wraps on narrow screens. -->
		<div class="flex flex-wrap items-center gap-x-5 gap-y-3">
			<div class="flex items-center gap-2.5">
				<label for="q" class="text-[15px] font-semibold">Search</label>
				<input
					id="q"
					type="search"
					bind:value={query}
					placeholder="Name, habitat or place"
					class="field min-h-[46px] w-[220px] max-w-full text-base"
				/>
			</div>
			<div class="flex items-center gap-2.5">
				<label for="region" class="text-[15px] font-semibold">Region</label>
				<select
					id="region"
					bind:value={country}
					onchange={() => (limit = PAGE_SIZE)}
					class="field min-h-[46px] w-auto px-3 text-base"
				>
					<option value="">All regions</option>
					{#each countries as c (c)}
						<option value={c}>{c}</option>
					{/each}
				</select>
			</div>
			<div class="flex items-center gap-2.5">
				<label for="sort" class="text-[15px] font-semibold">Sort</label>
				<select id="sort" bind:value={sort} class="field min-h-[46px] w-auto px-3 text-base">
					<option value="live">Live now first</option>
					<option value="newest">Newest</option>
					<option value="az">A to Z</option>
				</select>
			</div>
		</div>
	</div>
	<span class="text-[15px] text-muted" aria-live="polite">
		Showing {shown.length} of {matches.length} streams
	</span>
</section>

<section class="container-page flex flex-col gap-10 pt-6 pb-[72px]">
	{#if matches.length === 0}
		<div
			role="status"
			class="flex flex-col items-start gap-4 rounded-3xl border border-line bg-surface p-[clamp(28px,6vw,64px)]"
		>
			<svg
				width="56"
				height="56"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.8"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
				class="text-muted"
			>
				<circle cx="11" cy="11" r="7" />
				<path d="M20 20l-4-4" />
			</svg>
			<h2 class="m-0 font-display text-[clamp(26px,5vw,34px)] font-semibold text-head">
				No streams match that.
			</h2>
			<p class="m-0 max-w-[520px] text-[17px] text-pretty text-muted">
				Try a different word, or clear the filters to see every stream. If nothing is there yet for
				your corner of the wild, you could be the first to add it.
			</p>
			<div class="flex flex-wrap gap-3">
				<button type="button" onclick={clear} class="btn-primary">Clear filters</button>
				<a href={resolve('/add')} class="btn-quiet">Add a camera</a>
			</div>
		</div>
	{:else}
		<StreamGrid streams={shown} />
		{#if shown.length < matches.length}
			<div class="flex justify-center">
				<button type="button" onclick={() => (limit += PAGE_SIZE)} class="btn-outline">
					Load more streams
				</button>
			</div>
		{/if}
	{/if}
</section>

<CtaBand
	title="Not seeing your corner of the wild?"
	body="Add your camera and it appears right here, next to everyone else’s."
	href={resolve('/add')}
	label="Add a camera"
/>
