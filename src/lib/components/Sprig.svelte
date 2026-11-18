<!--
	Hand-drawn leaves that hang over section edges, like sketches tucked into a field
	journal. Purely decorative: hidden from screen readers and clicks, and only shown
	on extra-large screens (xl and up), where there is margin for them.
	Position it with a class on the wrapper, e.g. "-top-40 -right-16 w-52 rotate-12".
	The line art was generated once from simple curves and saved as plain paths.
-->
<script lang="ts">
	let { kind, class: className = '' }: { kind: 'branch' | 'fern' | 'leaf'; class?: string } =
		$props();
</script>

<div
	aria-hidden="true"
	class={[
		'pointer-events-none absolute z-10 hidden drop-shadow-[0_3px_3px_rgb(42_34_22/0.12)] select-none xl:block',
		className
	]}
>
	<svg
		viewBox={kind === 'leaf' ? '-10 -70 260 140' : '0 -20 200 400'}
		class="block h-auto w-full overflow-visible"
	>
		<g
			filter="url(#rough)"
			stroke="var(--c-sprig-ink)"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill-opacity="0.9"
		>
			{#if kind === 'branch'}
				<path
					d="M100 360L101.2 351.3L102.5 342.6L103.7 333.8L104.9 325.1L106.1 316.4L107.3 307.7L108.5 299L109.6 290.3L110.7 281.5L111.8 272.8L112.8 264.1L113.8 255.4L114.7 246.7L115.6 237.9L116.5 229.2L117.3 220.5L118 211.8L118.7 203.1L119.3 194.4L119.9 185.6L120.4 176.9L120.8 168.2L121.2 159.5L121.5 150.8L121.7 142.1L121.9 133.3L122 124.6L122 115.9L122 107.2L121.8 98.5L121.7 89.7L121.4 81L121.1 72.3L120.7 63.6L120.2 54.9L119.7 46.2L119.1 37.4L118.5 28.7L117.8 20"
					fill="none"
					stroke-width="2.4"
				/>
				<path
					transform="translate(105.3 322.2) rotate(-32.2)"
					d="M0 0C16.8 -21.5 47.1 -19.4 67.3 0C47.1 19.4 16.8 21.5 0 0ZM2 0Q33.6 -1.7 61.9 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(110.3 284.4) rotate(-145.6)"
					d="M0 0C16.1 -20.7 45.2 -18.6 64.6 0C45.2 18.6 16.1 20.7 0 0ZM2 0Q32.3 -1.7 59.4 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(114.7 246.7) rotate(-36.7)"
					d="M0 0C15.5 -19.8 43.3 -17.8 61.8 0C43.3 17.8 15.5 19.8 0 0ZM2 0Q30.9 -1.6 56.9 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(118.2 208.9) rotate(-141.1)"
					d="M0 0C14.8 -18.9 41.4 -17 59.1 0C41.4 17 14.8 18.9 0 0ZM2 0Q29.6 -1.5 54.4 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(120.7 171.1) rotate(-41.1)"
					d="M0 0C14.1 -18 39.5 -16.2 56.4 0C39.5 16.2 14.1 18 0 0ZM2 0Q28.2 -1.4 51.9 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(121.9 133.3) rotate(-136.7)"
					d="M0 0C13.4 -17.2 37.6 -15.5 53.7 0C37.6 15.5 13.4 17.2 0 0ZM2 0Q26.8 -1.4 49.4 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(121.8 95.6) rotate(-45.6)"
					d="M0 0C12.7 -16.3 35.7 -14.7 50.9 0C35.7 14.7 12.7 16.3 0 0ZM2 0Q25.5 -1.3 46.9 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(120.4 57.8) rotate(-132.2)"
					d="M0 0C12.1 -15.4 33.8 -13.9 48.2 0C33.8 13.9 12.1 15.4 0 0ZM2 0Q24.1 -1.2 44.4 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(117.8 20) rotate(-90)"
					d="M0 0C11 -13 30.8 -11.7 44 0C30.8 11.7 11 13 0 0ZM2 0Q22 -1 40.5 0"
					style="fill: var(--c-sprig-1)"
				/>
			{:else if kind === 'fern'}
				<path
					d="M100 360L100.7 352.3L101.5 344.6L102.2 336.9L103 329.2L103.7 321.5L104.4 313.8L105.1 306.2L105.8 298.5L106.4 290.8L107.1 283.1L107.7 275.4L108.3 267.7L108.8 260L109.4 252.3L109.9 244.6L110.4 236.9L110.8 229.2L111.2 221.5L111.6 213.8L111.9 206.2L112.2 198.5L112.5 190.8L112.7 183.1L112.9 175.4L113 167.7L113.1 160L113.2 152.3L113.2 144.6L113.2 136.9L113.1 129.2L113 121.5L112.8 113.8L112.6 106.2L112.4 98.5L112.1 90.8L111.8 83.1L111.5 75.4L111.1 67.7L110.7 60"
					fill="none"
					stroke-width="2.4"
				/>
				<path
					transform="translate(102.1 338.6) rotate(-31.4)"
					d="M0 0C14.8 -10.1 41.5 -9.1 59.3 0C41.5 9.1 14.8 10.1 0 0ZM2 0Q29.7 -0.8 54.6 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(102.1 338.6) rotate(-148.6)"
					d="M0 0C13.4 -10.1 37.4 -9.1 53.4 0C37.4 9.1 13.4 10.1 0 0ZM2 0Q26.7 -0.8 49.1 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(104.1 317.1) rotate(-147.1)"
					d="M0 0C14.2 -9.6 39.7 -8.7 56.7 0C39.7 8.7 14.2 9.6 0 0ZM2 0Q28.3 -0.8 52.2 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(104.1 317.1) rotate(-32.9)"
					d="M0 0C12.8 -9.6 35.7 -8.7 51 0C35.7 8.7 12.8 9.6 0 0ZM2 0Q25.5 -0.8 46.9 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(106 295.7) rotate(-34.3)"
					d="M0 0C13.5 -9.2 37.8 -8.3 54 0C37.8 8.3 13.5 9.2 0 0ZM2 0Q27 -0.7 49.7 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(106 295.7) rotate(-145.7)"
					d="M0 0C12.2 -9.2 34 -8.3 48.6 0C34 8.3 12.2 9.2 0 0ZM2 0Q24.3 -0.7 44.7 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(107.8 274.3) rotate(-144.3)"
					d="M0 0C12.8 -8.7 36 -7.9 51.4 0C36 7.9 12.8 8.7 0 0ZM2 0Q25.7 -0.7 47.3 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(107.8 274.3) rotate(-35.7)"
					d="M0 0C11.6 -8.7 32.4 -7.9 46.2 0C32.4 7.9 11.6 8.7 0 0ZM2 0Q23.1 -0.7 42.5 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(109.3 252.9) rotate(-37.1)"
					d="M0 0C12.2 -8.3 34.1 -7.5 48.7 0C34.1 7.5 12.2 8.3 0 0ZM2 0Q24.4 -0.7 44.8 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(109.3 252.9) rotate(-142.9)"
					d="M0 0C11 -8.3 30.7 -7.5 43.8 0C30.7 7.5 11 8.3 0 0ZM2 0Q21.9 -0.7 40.3 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(110.7 231.4) rotate(-141.4)"
					d="M0 0C11.5 -7.8 32.2 -7 46.1 0C32.2 7 11.5 7.8 0 0ZM2 0Q23 -0.6 42.4 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(110.7 231.4) rotate(-38.6)"
					d="M0 0C10.4 -7.8 29 -7 41.5 0C29 7 10.4 7.8 0 0ZM2 0Q20.7 -0.6 38.1 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(111.8 210) rotate(-40)"
					d="M0 0C10.8 -7.4 30.4 -6.6 43.4 0C30.4 6.6 10.8 7.4 0 0ZM2 0Q21.7 -0.6 39.9 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(111.8 210) rotate(-140)"
					d="M0 0C9.8 -7.4 27.3 -6.6 39.1 0C27.3 6.6 9.8 7.4 0 0ZM2 0Q19.5 -0.6 35.9 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(112.6 188.6) rotate(-138.6)"
					d="M0 0C10.2 -6.9 28.5 -6.2 40.7 0C28.5 6.2 10.2 6.9 0 0ZM2 0Q20.4 -0.6 37.5 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(112.6 188.6) rotate(-41.4)"
					d="M0 0C9.2 -6.9 25.7 -6.2 36.7 0C25.7 6.2 9.2 6.9 0 0ZM2 0Q18.3 -0.6 33.7 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(113 167.1) rotate(-42.9)"
					d="M0 0C9.5 -6.5 26.7 -5.8 38.1 0C26.7 5.8 9.5 6.5 0 0ZM2 0Q19 -0.5 35 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(113 167.1) rotate(-137.1)"
					d="M0 0C8.6 -6.5 24 -5.8 34.3 0C24 5.8 8.6 6.5 0 0ZM2 0Q17.1 -0.5 31.5 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(113.2 145.7) rotate(-135.7)"
					d="M0 0C8.9 -6 24.8 -5.4 35.4 0C24.8 5.4 8.9 6 0 0ZM2 0Q17.7 -0.5 32.6 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(113.2 145.7) rotate(-44.3)"
					d="M0 0C8 -6 22.3 -5.4 31.9 0C22.3 5.4 8 6 0 0ZM2 0Q15.9 -0.5 29.3 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(113 124.3) rotate(-45.7)"
					d="M0 0C8.2 -5.6 22.9 -5 32.8 0C22.9 5 8.2 5.6 0 0ZM2 0Q16.4 -0.4 30.1 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(113 124.3) rotate(-134.3)"
					d="M0 0C7.4 -5.6 20.6 -5 29.5 0C20.6 5 7.4 5.6 0 0ZM2 0Q14.7 -0.4 27.1 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(112.6 102.9) rotate(-132.9)"
					d="M0 0C7.5 -5.1 21.1 -4.6 30.1 0C21.1 4.6 7.5 5.1 0 0ZM2 0Q15.1 -0.4 27.7 0"
					style="fill: var(--c-sprig-1)"
				/>
				<path
					transform="translate(112.6 102.9) rotate(-47.1)"
					d="M0 0C6.8 -5.1 19 -4.6 27.1 0C19 4.6 6.8 5.1 0 0ZM2 0Q13.6 -0.4 24.9 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(111.8 81.4) rotate(-48.6)"
					d="M0 0C6.9 -4.7 19.2 -4.2 27.5 0C19.2 4.2 6.9 4.7 0 0ZM2 0Q13.7 -0.4 25.3 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					transform="translate(111.8 81.4) rotate(-131.4)"
					d="M0 0C6.2 -4.7 17.3 -4.2 24.7 0C17.3 4.2 6.2 4.7 0 0ZM2 0Q12.4 -0.4 22.7 0"
					style="fill: var(--c-sprig-3)"
				/>
				<path
					transform="translate(110.7 60) rotate(-90)"
					d="M0 0C6.5 -6 18.2 -5.4 26 0C18.2 5.4 6.5 6 0 0ZM2 0Q13 -0.5 23.9 0"
					style="fill: var(--c-sprig-1)"
				/>
			{:else}
				<path d="M-10 0L8 0" stroke-width="3" />
				<path
					d="M0 0C57.5 -62 161 -55.8 230 0C161 55.8 57.5 62 0 0ZM2 0Q115 -5 211.6 0"
					style="fill: var(--c-sprig-2)"
				/>
				<path
					d="M30 0Q48 -22 60 -32M30 0Q48 22 60 32M60 0Q78 -20 90 -28M60 0Q78 20 90 28M90 0Q108 -18 120 -24M90 0Q108 18 120 24M120 0Q138 -16 150 -20M120 0Q138 16 150 20M150 0Q168 -14 180 -16M150 0Q168 14 180 16M180 0Q198 -12 210 -12M180 0Q198 12 210 12"
					fill="none"
					stroke-width="1.3"
					opacity="0.75"
				/>
			{/if}
		</g>
	</svg>
</div>
