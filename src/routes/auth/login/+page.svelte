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
			<h1 class="text-2xl font-semibold leading-6">Log in</h1>
			<form
				action="?/login"
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
					<Label for="email" class="text-muted-foreground font-normal">Email</Label>
					<Input
						type="email"
						name="email"
						placeholder="e.g., email@example.com"
						required
						disabled={loading}
					/>
				</div>
				<div class="space-y-1">
					<Label for="password" class="text-muted-foreground font-normal">Password</Label>
					<Input
						type="password"
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
					Log in
				</Button>
				{#if form?.error}
					<div>
						<span class="text-red-600">{form.error}</span>
					</div>
				{/if}
			</form>
			<p class="text-muted-foreground text-sm">
				Don't have an account? <a
					href="/auth/signup"
					class="hover:text-primary underline underline-offset-4 transition-all">Sign up</a
				>
			</p>
		</div>
	</div>
</div>
