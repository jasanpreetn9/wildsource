<script lang="ts">
	let { size = 40 }: { size?: number } = $props();
</script>

<!-- A sketched badge: mountains, a sun and a sprout, drawn with the shared #rough filter. -->
<svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
	<g
		filter="url(#rough)"
		fill="none"
		stroke="var(--c-head)"
		stroke-width="2.2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<circle cx="24" cy="24" r="20" style="fill: var(--c-avatar)" />
		<path d="M10 33 L19 22 L25 28 L31 19 L39 31" />
		<circle cx="33" cy="13" r="3.4" stroke="none" style="fill: var(--c-accent)" />
		<path d="M24 38 C 22 32, 26 30, 24 26" stroke="var(--c-primary)" />
	</g>
</svg>
