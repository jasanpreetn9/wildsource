<script lang="ts">
	import { resolve } from '$app/paths';
	import TextField from '#lib/components/TextField.svelte';
	import { REPO_URL } from '#lib/config.ts';
	import { HABITATS } from '#lib/types.ts';

	const STEP_NAMES = ['Stream', 'Details', 'Review'];
	const empty = { stream: '', name: '', habitat: 'Woodland', region: '', about: '', host: '' };

	let step = $state(1);
	let tried = $state(false);
	let form = $state({ ...empty });

	const invalid = $derived({
		stream: !/^https?:\/\/\S+$/.test(form.stream.trim()),
		name: !form.name.trim(),
		host: !form.host.trim()
	});

	// Only show errors after the person has tried to continue from that step.
	const showIf = (onStep: number, bad: boolean, message: string) =>
		tried && step === onStep && bad ? message : undefined;
	const errors = $derived({
		stream: showIf(1, invalid.stream, 'Enter a full link that starts with https://'),
		name: showIf(1, invalid.name, 'Give your camera a name.'),
		host: showIf(2, invalid.host, 'Tell us how to credit you.')
	});

	const orNotSet = (v: string) => v.trim() || 'Not set';
	const rows = $derived([
		{ k: 'Stream link', v: orNotSet(form.stream) },
		{ k: 'Camera name', v: orNotSet(form.name) },
		{ k: 'Habitat', v: form.habitat },
		{ k: 'Region', v: orNotSet(form.region) },
		{ k: 'About', v: orNotSet(form.about) },
		{ k: 'Host', v: orNotSet(form.host) }
	]);

	// v0.1: submissions are reviewed as GitHub issues (see ROADMAP.md).
	// Opens the "Add a stream" issue form (.github/ISSUE_TEMPLATE/add-stream.yml) with its
	// fields filled in. Each key below is a field id in that template, so keep them in sync.
	const issueUrl = $derived.by(() => {
		const params = new URLSearchParams({
			template: 'add-stream.yml',
			title: `Add stream: ${form.name.trim()}`,
			'stream-link': form.stream.trim(),
			'camera-name': form.name.trim(),
			habitat: form.habitat,
			region: form.region.trim(),
			about: form.about.trim(),
			credit: form.host.trim()
		});
		return `${REPO_URL}/issues/new?${params}`;
	});

	function next() {
		if (step === 1 && (invalid.stream || invalid.name)) return void (tried = true);
		if (step === 2 && invalid.host) return void (tried = true);
		if (step === 3) window.open(issueUrl, '_blank', 'noopener');
		tried = false;
		step = Math.min(4, step + 1);
	}

	function reset() {
		form = { ...empty };
		tried = false;
		step = 1;
	}
</script>

<svelte:head>
	<title>Add a camera · WildSource</title>
</svelte:head>

<section
	class="mx-auto box-border flex max-w-[820px] flex-col gap-8 px-[clamp(20px,5vw,40px)] pt-10 pb-24"
>
	<div class="flex flex-col gap-3.5">
		<h1 class="m-0 font-display text-[clamp(32px,7vw,52px)] leading-[1.05] font-semibold text-head">
			Add your camera
		</h1>
		<p class="m-0 text-[19px] text-pretty text-muted">
			Share a live stream with the world. It joins the same catalog as everyone else’s, and the
			catalog is free for anyone to reuse.
		</p>
	</div>

	<ol class="m-0 flex list-none flex-wrap gap-x-7 gap-y-3 p-0">
		{#each STEP_NAMES as name, i (name)}
			{@const n = i + 1}
			{@const lit = step >= n}
			<li class="flex items-center gap-2.5" aria-current={step === n ? 'step' : undefined}>
				<span
					class={[
						'inline-flex size-10 items-center justify-center rounded-full border-2 font-bold',
						lit ? 'border-primary bg-primary text-on-primary' : 'border-line text-ink'
					]}
				>
					{step > n ? '✓' : n}
				</span>
				<span class={['font-bold', step === n ? 'text-ink' : 'text-muted']}>{name}</span>
			</li>
		{/each}
	</ol>

	<div
		class="flex flex-col gap-[22px] rounded-3xl border border-line bg-surface p-[clamp(20px,5vw,40px)]"
	>
		{#if step === 1}
			<TextField
				id="stream"
				label="Stream link"
				type="url"
				placeholder="https://"
				hint="A public link to your live stream."
				error={errors.stream}
				bind:value={form.stream}
			/>
			<TextField
				id="name"
				label="Camera name"
				placeholder="e.g. Porch feeder cam"
				hint="What people will see in the catalog."
				error={errors.name}
				bind:value={form.name}
			/>
		{:else if step === 2}
			<div class="flex flex-col gap-1.5">
				<label for="habitat" class="text-base font-bold">Habitat</label>
				<select id="habitat" bind:value={form.habitat} class="field px-3">
					{#each [...HABITATS, 'Other'] as h (h)}
						<option>{h}</option>
					{/each}
				</select>
			</div>
			<TextField
				id="region"
				label="Region"
				placeholder="e.g. Montana, US"
				hint="A town, park or area, ending with the country. Keep it as general as you like."
				bind:value={form.region}
			/>
			<TextField
				id="about"
				label="About this camera"
				multiline
				hint="What does it watch, and what should people look for?"
				bind:value={form.about}
			/>
			<TextField
				id="host"
				label="Your name"
				autocomplete="name"
				hint="How you want to be credited as the host."
				error={errors.host}
				bind:value={form.host}
			/>
		{:else if step === 3}
			<dl class="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
				{#each rows as r (r.k)}
					<dt class="text-muted">{r.k}</dt>
					<dd class="m-0 [overflow-wrap:anywhere]">{r.v}</dd>
				{/each}
			</dl>
			<p class="m-0 rounded-[14px] bg-surface2 px-[18px] py-4 text-[15px] text-pretty">
				Adding a camera lists it in the catalog. The listing details (name, habitat, region, link)
				are free for anyone to reuse. Your video stays yours, and is only ever shown through your
				own player. Your submission opens as a GitHub issue so a volunteer can review it.
			</p>
		{:else}
			<div role="status" class="flex flex-col items-start gap-[18px]">
				<span
					aria-hidden="true"
					class="inline-flex size-14 items-center justify-center rounded-full bg-primary text-on-primary"
				>
					<svg
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"><path d="M5 12l5 5 9-10" /></svg
					>
				</span>
				<h2 class="m-0 font-display text-[clamp(26px,5vw,34px)] font-semibold text-head">
					Thanks for keeping a window open on the wild.
				</h2>
				<p class="m-0 text-[17px] text-muted">
					Submit the GitHub issue that just opened. A volunteer will review it, and your camera
					appears in the catalog once it is approved.
					<a href={issueUrl} target="_blank" rel="noopener external" class="text-link"
						>Open it again</a
					>
				</p>
				<div class="flex flex-wrap gap-3">
					<a href={resolve('/streams')} class="btn-primary">See the catalog</a>
					<button type="button" onclick={reset} class="btn-quiet">Add another</button>
				</div>
			</div>
		{/if}

		{#if step < 4}
			<div class="flex flex-wrap gap-3 pt-2">
				{#if step > 1}
					<button type="button" onclick={() => (step -= 1)} class="btn-quiet">Back</button>
				{/if}
				<button type="button" onclick={next} class="btn-primary px-8">
					{step === 3 ? 'Add my camera' : 'Continue'}
				</button>
			</div>
		{/if}
	</div>
</section>
