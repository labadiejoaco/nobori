<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Loader2 } from 'lucide-svelte';

	export let form;

	let loading = false;
</script>

<div class="h-screen px-4">
	<div class="flex h-full w-full items-center justify-center">
		<div class="max-w-sm flex-1 space-y-4">
			<h1 class="text-2xl font-semibold leading-6">Sign up</h1>
			<form
				action="?/signup"
				method="post"
				use:enhance={() => {
					loading = true;

					return async ({ update }) => {
						loading = false;

						update();
					};
				}}
				class="space-y-4"
			>
				<div class="space-y-1">
					<Label for="email" class="font-normal text-muted-foreground">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						placeholder="e.g., email@example.com"
						required
						disabled={loading}
					/>
				</div>
				<div class="space-y-1">
					<Label for="password" class="font-normal text-muted-foreground">Password</Label>
					<Input
						type="password"
						id="password"
						name="password"
						placeholder="e.g., ••••••••"
						required
						disabled={loading}
					/>
				</div>
				<Button type="submit" disabled={loading} class="w-full">
					{#if loading}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
					{/if}
					Sign Up
				</Button>
				{#if form?.error}
					<div>
						<span class="text-red-600">{form.error}</span>
					</div>
				{/if}
			</form>
			<p class="text-sm text-muted-foreground">
				Already have an account? <a
					href="/auth/login"
					class="underline underline-offset-4 transition-all hover:text-primary">Log in</a
				>
			</p>
		</div>
	</div>
</div>
