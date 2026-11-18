<!--
	A hand-drawn edge for the top or bottom of a coloured section, so sections meet
	along a hill line or a mountain ridge instead of a straight cut. It is filled
	with currentColor: give it the section's colour as a text class (text-band).
	The parent section needs `relative`.
-->
<script lang="ts">
	let {
		shape = 'hills',
		side = 'top',
		class: className = ''
	}: { shape?: 'hills' | 'ridge'; side?: 'top' | 'bottom'; class?: string } = $props();

	const paths = {
		hills:
			'M0 40 L0 22 C 120 8, 220 30, 340 18 S 560 4, 700 20 S 940 34, 1080 16 S 1320 8, 1440 24 L1440 40 Z',
		ridge:
			'M0 40 L0 26 L90 14 L170 24 L260 8 L360 22 L450 12 L560 26 L660 10 L770 22 L880 6 L990 20 L1100 12 L1200 26 L1320 10 L1440 22 L1440 40 Z'
	};
</script>

<svg
	viewBox="0 0 1440 40"
	preserveAspectRatio="none"
	aria-hidden="true"
	class={[
		'pointer-events-none absolute left-0 block h-6 w-full sm:h-10',
		side === 'top' ? 'bottom-full -mb-px' : 'top-full -mt-px -scale-y-100',
		className
	]}
>
	<path d={paths[shape]} fill="currentColor" />
</svg>
