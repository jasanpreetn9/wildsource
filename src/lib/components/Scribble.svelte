<!--
	Underlines its text with a hand-drawn marker stroke in the accent colour.
	Used for one word in a heading, and for the current page in the nav.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, double = false }: { children: Snippet; double?: boolean } = $props();
</script>

<span class="relative whitespace-nowrap"
	>{@render children()}<svg
		viewBox="0 0 200 20"
		preserveAspectRatio="none"
		aria-hidden="true"
		class="pointer-events-none absolute -bottom-[0.14em] -left-[2%] h-[0.3em] min-h-2 w-[104%] overflow-visible"
	>
		<path
			filter="url(#rough)"
			d={double
				? 'M4 12 C 50 4, 120 3, 196 9 M 14 16 C 70 10, 130 10, 186 14'
				: 'M4 11 C 60 4, 130 4, 196 9'}
			fill="none"
			stroke="var(--c-accent)"
			stroke-width="5"
			stroke-linecap="round"
		/>
	</svg></span
>
