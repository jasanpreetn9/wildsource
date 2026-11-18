<script lang="ts">
	import './layout.css';
	import { dev } from '$app/env';
	import { page } from '$app/state';
	import { inject, pageview } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit-next';
	import favicon from '#lib/assets/favicon.svg';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SketchDefs from '#lib/components/SketchDefs.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// Vercel Web Analytics and Speed Insights. Both only run in the browser, and only
	// report data when the site is deployed on Vercel.
	//
	// @vercel/analytics/sveltekit uses $app/stores, which SvelteKit 3 removed, so we use
	// the plain inject() and report page views ourselves from $app/state instead.
	inject({ mode: dev ? 'development' : 'production', disableAutoTrack: true });
	injectSpeedInsights();

	$effect(() => {
		// Group views by route (/streams/[id]) as well as the actual path.
		if (page.route.id) pageview({ route: page.route.id, path: page.url.pathname });
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SketchDefs />
<!-- overflow-x-clip keeps the leaf sketches that hang past the edges from adding a sideways scroll. -->
<div class="topo overflow-x-clip">
	<SiteHeader />
	<main>
		{@render children()}
	</main>
	<SiteFooter />
</div>
