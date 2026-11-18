<script lang="ts">
	import { resolve } from '$app/paths';
	import CtaBand from '#lib/components/CtaBand.svelte';
	import { REPO_URL, SITE_URL } from '#lib/config.ts';

	const uses = [
		{ title: 'In a classroom', body: 'Put a live habitat on the screen while you teach.' },
		{ title: 'In a visitor center', body: 'Show what is outside the window, live, from anywhere.' },
		{ title: 'In an app', body: 'Build a nature app on top of the open list of streams.' },
		{ title: 'On a wall display', body: 'Turn any screen into a window on the wild.' }
	];

	// Always the public address, even when running locally, since people copy this command.
	const catalogUrl = `${SITE_URL}/api/streams.json`;
</script>

<svelte:head>
	<title>Reuse the catalog · WildSource</title>
</svelte:head>

<section class="container-page flex flex-col gap-6 pt-12 pb-[72px]">
	<h1 class="heading-xl max-w-[900px] text-[clamp(36px,8vw,64px)]">
		The whole catalog is free to reuse.
	</h1>
	<p class="m-0 max-w-[640px] text-xl text-pretty text-muted">
		WildSource is open source, and the list of streams it collects is open data. Use it to bring
		live nature into a classroom, an app or a wall display.
	</p>
	<div class="flex flex-wrap gap-3.5">
		<a href="#get" class="btn-primary">Get the catalog</a>
		<a href={REPO_URL} rel="external" class="btn-outline">Read the source</a>
	</div>
</section>

<section class="container-page flex flex-col gap-8 pt-6 pb-[88px]">
	<h2 class="heading-md">Where it can go</h2>
	<div class="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-6">
		{#each uses as use (use.title)}
			<div class="flex flex-col gap-2.5 rounded-[20px] border border-line bg-surface p-7">
				<h3 class="m-0 font-display text-[22px] font-semibold">{use.title}</h3>
				<p class="m-0 text-pretty text-muted">{use.body}</p>
			</div>
		{/each}
	</div>
</section>

<section class="bg-surface2">
	<div id="get" class="container-page flex flex-wrap items-start gap-12 py-[clamp(48px,9vw,88px)]">
		<div class="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
			<h2 class="heading-md">Take it with you</h2>
			<p class="m-0 text-lg text-pretty">
				Pull the full list of streams, or embed a single stream on your own page.
			</p>
			<ul class="m-0 flex flex-col gap-2 pl-5 text-[17px]">
				<li>
					<a href={resolve('/api/streams.json')} class="text-link">The catalog as data</a>: names,
					habitats, regions and links. Free to reuse.
				</li>
				<li>
					An embed for any single stream, from its page. It uses the owner’s own player, so their
					settings and terms apply.
				</li>
				<li>
					<a href={REPO_URL} rel="external" class="text-link">The source code for the site itself</a
					>
				</li>
			</ul>
		</div>
		<pre
			class="m-0 box-border min-w-0 flex-[1_1_420px] overflow-x-auto rounded-[20px] bg-code-bg p-7 font-mono text-sm leading-[1.8] text-[#e8efe3]"># the whole catalog
curl {catalogUrl}

# one stream, on your page
&lt;iframe src="https://www.youtube.com/embed/VIDEO_ID"&gt;&lt;/iframe&gt;</pre>
	</div>
</section>

<section class="container-page flex flex-col gap-4 py-[clamp(48px,9vw,72px)]">
	<h2 class="heading-md">Who owns what</h2>
	<p class="m-0 max-w-[720px] text-lg text-pretty">
		The catalog (the list of streams and the details we write about them) is free for anyone to
		reuse. The video itself is not ours: every stream belongs to the person or group who runs the
		camera. WildSource never copies or re-hosts video. It only shows streams through their owner’s
		own player, and you should do the same. If you want to record, download or rebroadcast a stream,
		ask its owner.
	</p>
	<p class="m-0 max-w-[720px] text-lg text-pretty">
		The photographs on this site are © Jasanpreet Nagra, all rights reserved. They are not part of
		the catalog or the open source code, and can’t be reused without permission.
	</p>
</section>

<CtaBand
	title="Found a bug? Want to improve it?"
	body="WildSource is open source and community-run. Fixes, new ideas and new cameras all welcome."
	externalHref={REPO_URL}
	label="Open the repository"
/>
