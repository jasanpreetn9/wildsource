<script lang="ts">
	import { resolve } from '$app/paths';
	import { REPO_URL } from '#lib/config.ts';
	import Edge from './Edge.svelte';
</script>

<footer class="relative mt-10 bg-forest text-band-muted">
	<Edge shape="hills" class="text-forest" />
	<div class="container-page flex flex-wrap justify-between gap-x-10 gap-y-4 py-9 text-[15px]">
		<span>WildSource is open source. Streams belong to the people who run them.</span>
		<span class="flex flex-wrap gap-x-7 gap-y-2">
			<a href={resolve('/reuse')} class="text-on-band">Reuse the catalog</a>
			<a href={REPO_URL} rel="external" class="text-on-band">Source code</a>
			<a href="{REPO_URL}/blob/main/LICENSE" rel="external" class="text-on-band">License</a>
		</span>
	</div>
</footer>
