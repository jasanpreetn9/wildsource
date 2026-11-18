<!--
	A small sketched badge for a host card, picked from the kind of cameras they run.
	`tone` picks the circle colour from the same palette as the stream tiles.
-->
<script lang="ts">
	let { camType, tone = 0 }: { camType: string; tone?: number } = $props();

	const kind = $derived(
		/bird/i.test(camType) ? 'bird' : /desert|waterhole/i.test(camType) ? 'desert' : 'paw'
	);
</script>

<svg viewBox="0 0 64 64" aria-hidden="true" class="size-16 flex-none">
	<circle cx="32" cy="32" r="30" style="fill: var(--tile-{tone}-sky)" />
	<g
		filter="url(#rough)"
		fill="none"
		stroke="var(--c-sprig-ink)"
		stroke-width="2.2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		{#if kind === 'bird'}
			<path
				d="M14 40 C 20 26, 36 22, 46 28 L 56 24 L 50 32 C 50 44, 36 50, 24 46 Z M 24 46 L 18 56 M 30 47 L 28 56 M 30 30 C 34 34, 40 34, 44 32"
			/>
			<circle cx="46" cy="27" r="1.4" fill="var(--c-sprig-ink)" />
		{:else if kind === 'desert'}
			<path
				d="M8 46 C 20 38, 34 38, 56 46 M 14 54 C 28 48, 44 48, 58 54 M32 40 L 32 16 M 32 26 C 24 26, 24 20, 24 16 M 32 30 C 40 30, 40 22, 40 18"
			/>
			<circle cx="48" cy="14" r="5" />
		{:else}
			<ellipse cx="32" cy="40" rx="11" ry="9" />
			<ellipse cx="18" cy="26" rx="4.5" ry="6" />
			<ellipse cx="27" cy="18" rx="4.5" ry="6" />
			<ellipse cx="38" cy="18" rx="4.5" ry="6" />
			<ellipse cx="47" cy="26" rx="4.5" ry="6" />
		{/if}
	</g>
</svg>
