<!--
	Map of streams, using MapLibre with free OpenFreeMap tiles (no key needed).
	MapLibre needs the browser (WebGL, window), so it's loaded in onMount, never during
	server rendering. Locations are deliberately rough; see `location` in types.ts.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import type { Map as MapLibreMap } from 'maplibre-gl';
	import type { Stream } from '#lib/types.ts';

	let { streams }: { streams: Stream[] } = $props();

	let container: HTMLDivElement;
	let lib = $state<typeof import('maplibre-gl')>();
	let map = $state<MapLibreMap>();

	const styleUrl = () =>
		`https://tiles.openfreemap.org/styles/${document.documentElement.dataset.theme === 'dark' ? 'dark' : 'positron'}`;

	onMount(() => {
		let observer: MutationObserver | undefined;
		let destroyed = false;

		(async () => {
			const [maplibre, worker] = await Promise.all([
				import('maplibre-gl'),
				import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'),
				import('maplibre-gl/dist/maplibre-gl.css')
			]);
			if (destroyed) return; // left the map view before MapLibre finished loading
			maplibre.setWorkerUrl(worker.default);

			const m = new maplibre.Map({
				container,
				style: styleUrl(),
				center: [0, 20],
				zoom: 1,
				// Page scroll stays page scroll; zoom needs Ctrl/Cmd, and phones pan with two fingers.
				cooperativeGestures: true,
				attributionControl: { compact: false }
			});
			m.addControl(new maplibre.NavigationControl({ showCompass: false }));

			// Swap to the dark or light map when the site theme changes.
			observer = new MutationObserver(() => m.setStyle(styleUrl()));
			observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });

			lib = maplibre;
			map = m;
		})();

		return () => {
			destroyed = true;
			observer?.disconnect();
			map?.remove();
		};
	});

	// One pin per stream; redrawn whenever the filtered list changes.
	$effect(() => {
		if (!lib || !map) return;
		const { Marker, Popup, LngLatBounds } = lib;

		const markers = streams.map((s) => {
			const pin = document.createElement('button');
			pin.type = 'button';
			pin.className = s.live ? 'stream-pin' : 'stream-pin stream-pin--offline';
			pin.setAttribute('aria-label', `${s.title}, ${s.region}`);

			return new Marker({ element: pin })
				.setLngLat([s.location.lng, s.location.lat])
				.setPopup(new Popup({ offset: 14, maxWidth: '260px' }).setDOMContent(popupFor(s)))
				.addTo(map!);
		});

		// shortcut: no clustering, so streams sharing a rough point stack; add clustering past ~50 streams.
		if (streams.length) {
			const bounds = new LngLatBounds();
			for (const s of streams) bounds.extend([s.location.lng, s.location.lat]);
			map.fitBounds(bounds, {
				padding: Math.min(60, container.clientWidth / 16),
				maxZoom: 5,
				duration: 0
			});
		}

		return () => markers.forEach((m) => m.remove());
	});

	// Built from DOM nodes, so stream text is never parsed as HTML.
	function popupFor(s: Stream): HTMLElement {
		const box = document.createElement('div');
		box.className = 'stream-popup';
		const link = document.createElement('a');
		link.href = resolve('/streams/[id]', { id: s.id });
		link.textContent = s.title;
		const meta = document.createElement('p');
		meta.textContent = `${s.live ? 'Live' : 'Offline'} · ${s.habitat} · ${s.region}`;
		box.append(link, meta);
		return box;
	}
</script>

<div
	bind:this={container}
	role="region"
	aria-label="Map of streams. Use Tab to move between pins and Enter to open one."
	class="relative isolate aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-line bg-surface2 sm:aspect-auto sm:h-[min(70vh,560px)]"
></div>

<!-- Landscape on phones: the map can't zoom out past the point where the world fills its height,
	so a tall phone-shaped map could never show every continent at once. -->

<style>
	/* The button is 24px (the minimum touch target); the visible dot inside it is 20px. */
	:global(.stream-pin) {
		width: 24px;
		height: 24px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: none;
		cursor: pointer;
	}
	:global(.stream-pin)::after {
		content: '';
		position: absolute;
		inset: 2px;
		border-radius: 50%;
		border: 3px solid var(--c-surface);
		background: var(--c-primary);
		box-shadow: 0 2px 6px rgb(0 0 0 / 0.35);
	}
	:global(.stream-pin--offline)::after {
		background: var(--c-muted);
	}
	:global(.stream-pin:focus-visible) {
		outline: 3px solid var(--c-accent);
		outline-offset: 2px;
	}
	/* MapLibre popups are always white, so fix the text colours instead of inheriting the theme. */
	:global(.stream-popup) {
		color: #2b2a24;
		font-family: var(--font-sans);
	}
	:global(.stream-popup a) {
		color: #3f5a3c;
		font-weight: 700;
		font-size: 16px;
	}
	:global(.stream-popup p) {
		margin: 4px 0 0;
		font-size: 13px;
		color: #5d5a4e;
	}
</style>
