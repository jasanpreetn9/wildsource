<script lang="ts">
	import type { ResolvedPathname } from '$app/types';

	let {
		title,
		body,
		label,
		href,
		externalHref
	}: {
		title: string;
		body: string;
		label: string;
		/** An in-app link, from resolve(). */
		href?: ResolvedPathname;
		/** A link to another site. */
		externalHref?: string;
	} = $props();
</script>

<!-- A note pinned to the page: a dashed paper card with a faint sketch of a trail camera. -->
<section class="container-page py-[clamp(56px,9vw,96px)]">
	<div
		class="relative isolate flex flex-wrap items-center justify-between gap-x-12 gap-y-6 overflow-hidden rounded-[22px] border-[1.5px] border-dashed border-field-line bg-surface2 p-[clamp(28px,5vw,56px)]"
	>
		<div class="flex flex-[1_1_480px] flex-col gap-3">
			<h2 class="heading-lg">{title}</h2>
			<p class="m-0 max-w-[620px] text-lg text-pretty text-muted">{body}</p>
		</div>
		{#if externalHref}
			<a href={externalHref} rel="external" class="btn-primary">{label}</a>
		{:else if href}
			<a {href} class="btn-primary">{label}</a>
		{/if}
		<svg
			viewBox="0 0 260 180"
			aria-hidden="true"
			class="pointer-events-none absolute right-[2%] -bottom-2.5 -z-10 w-[260px] opacity-[0.14]"
		>
			<g
				filter="url(#rough-strong)"
				fill="none"
				stroke="var(--c-head)"
				stroke-width="2.4"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="88" y="40" width="80" height="62" rx="10" />
				<circle cx="128" cy="70" r="17" />
				<circle cx="128" cy="70" r="8" />
				<rect x="98" y="48" width="14" height="8" rx="2" />
				<path d="M120 102 L 116 176 M136 102 L 140 176 M 100 176 L 156 176" />
				<path
					d="M40 176 C 46 150, 34 140, 44 120 M 44 148 C 30 142, 26 134, 22 126 M 44 136 C 56 128, 60 120, 66 112"
				/>
				<path d="M200 176 C 196 160, 210 150, 204 134 M 204 156 C 216 150, 222 142, 228 136" />
			</g>
		</svg>
	</div>
</section>
