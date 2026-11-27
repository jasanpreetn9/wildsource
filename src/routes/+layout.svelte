<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SketchDefs from '#lib/components/SketchDefs.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
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
