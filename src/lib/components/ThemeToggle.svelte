<script lang="ts">
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';
	let theme = $state<Theme>('light');

	onMount(() => {
		// app.html already set data-theme before paint; just read it back.
		theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
	});

	function toggle() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// Storage can be blocked (private mode); the theme still applies for this visit.
		}
	}
</script>

<button
	type="button"
	onclick={toggle}
	class="inline-flex min-h-11 cursor-pointer items-center rounded-full border-[1.5px] border-line bg-transparent px-4 font-sans text-sm font-semibold text-ink"
>
	{theme === 'dark' ? 'Light theme' : 'Dark theme'}
</button>
