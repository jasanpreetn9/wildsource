<script lang="ts">
	import { resolve } from '$app/paths';
	import TextField from '#lib/components/TextField.svelte';

	type Mode = 'in' | 'up' | 'reset';

	const COPY = {
		in: { title: 'Sign in', sub: 'Manage your cameras and your host profile.', cta: 'Sign in' },
		up: {
			title: 'Create an account',
			sub: 'Add cameras and keep them up to date.',
			cta: 'Create account'
		},
		reset: {
			title: 'Reset your password',
			sub: 'Enter your email and we will send you a link to choose a new one.',
			cta: 'Send reset link'
		}
	} as const;

	let mode = $state<Mode>('in');
	let tried = $state(false);
	let done = $state(false);
	let name = $state('');
	let email = $state('');
	let password = $state('');

	const invalid = $derived({
		name: mode === 'up' && !name.trim(),
		email: !/^\S+@\S+\.\S+$/.test(email.trim()),
		password: mode !== 'reset' && password.length < 8
	});
	const hasErrors = $derived(invalid.name || invalid.email || invalid.password);

	function submit(event: SubmitEvent) {
		event.preventDefault();
		if (hasErrors) {
			tried = true;
			return;
		}
		// TODO(v0.2): connect to Supabase Auth. Until then, nothing is sent anywhere.
		done = true;
	}

	function switchTo(next: Mode) {
		mode = next;
		tried = false;
	}
</script>

<svelte:head>
	<title>{COPY[mode].title} · WildSource</title>
</svelte:head>

<section
	class="mx-auto box-border flex max-w-[520px] flex-col gap-7 px-[clamp(20px,5vw,40px)] pt-14 pb-24"
>
	<div class="flex flex-col gap-2.5">
		<h1 class="m-0 font-display text-[clamp(30px,6vw,44px)] leading-[1.08] font-semibold text-head">
			{done ? 'Accounts are coming soon' : COPY[mode].title}
		</h1>
		{#if !done}
			<p class="m-0 text-lg text-pretty text-muted">{COPY[mode].sub}</p>
		{/if}
	</div>

	<div
		class="flex flex-col gap-[22px] rounded-3xl border border-line bg-surface p-[clamp(20px,5vw,40px)]"
	>
		{#if done}
			<div role="status" class="flex flex-col items-start gap-4">
				<p class="m-0 text-[17px] text-pretty text-muted">
					WildSource doesn’t have accounts yet, so nothing was sent. Until then, you can add a
					camera without signing in.
				</p>
				<a href={resolve('/add')} class="btn-primary">Add a camera</a>
			</div>
		{:else}
			<form novalidate onsubmit={submit} class="flex flex-col gap-[22px]">
				{#if tried && hasErrors}
					<div
						role="alert"
						class="rounded-[14px] border-[1.5px] border-err bg-err-bg px-4 py-3.5 text-[15px] font-semibold"
					>
						Please fix the highlighted fields and try again.
					</div>
				{/if}
				{#if mode === 'up'}
					<TextField
						id="name"
						label="Your name"
						autocomplete="name"
						error={tried && invalid.name && 'Enter your name.'}
						bind:value={name}
					/>
				{/if}
				<TextField
					id="email"
					label="Email"
					type="email"
					autocomplete="email"
					error={tried && invalid.email && 'Enter an email like name@example.com.'}
					bind:value={email}
				/>
				{#if mode !== 'reset'}
					<TextField
						id="password"
						label="Password"
						type="password"
						autocomplete={mode === 'up' ? 'new-password' : 'current-password'}
						error={tried &&
							invalid.password &&
							(mode === 'up'
								? 'Use at least 8 characters.'
								: 'Enter your password (at least 8 characters).')}
						bind:value={password}
					/>
				{/if}
				<button type="submit" class="btn-primary min-h-[54px] text-[17px]">{COPY[mode].cta}</button>
				<div class="flex flex-wrap justify-between gap-x-4 gap-y-1.5 text-[15px]">
					{#if mode === 'in'}
						<button type="button" onclick={() => switchTo('reset')} class="link-button">
							Forgot your password?
						</button>
					{/if}
					<button
						type="button"
						onclick={() => switchTo(mode === 'in' ? 'up' : 'in')}
						class="link-button"
					>
						{mode === 'in'
							? 'Create an account'
							: mode === 'up'
								? 'I already have an account'
								: 'Back to sign in'}
					</button>
				</div>
			</form>
		{/if}
	</div>
</section>

<style>
	.link-button {
		min-height: 44px;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--c-link);
		font: 700 15px var(--font-sans, sans-serif);
		text-decoration: underline;
		cursor: pointer;
	}
</style>
