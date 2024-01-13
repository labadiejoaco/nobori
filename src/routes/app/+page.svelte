<script>
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Toaster } from '$lib/components/ui/sonner';
	import { tasks } from '../../stores/task-store';
	import DataTable from './data-table.svelte';

	export let data;

	const logout = async () => {
		await data.supabase.auth.signOut();

		goto('/auth/login');
	};

	$: $tasks = data.tasks;
</script>

<Toaster position="bottom-center" />
<div class="container mx-auto py-8">
	<div class="mb-6 flex items-center justify-between gap-4">
		<div class="flex items-center">
			<div>
				<h1 class="text-2xl font-medium">Welcome back!</h1>
				<p class="text-muted-foreground">
					Let's make today productive! Your tasks are waiting for you.
				</p>
			</div>
		</div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
					<Avatar.Root class="h-9 w-9">
						<Avatar.Fallback>{data.session?.user.email?.charAt(0).toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Label class="font-normal">
					<div class="flex flex-col space-y-1">
						<p class="truncate text-sm font-medium leading-none">
							User ID: {data.session?.user.id}
						</p>
						<p class="text-xs leading-none text-muted-foreground">{data.session?.user.email}</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={logout} class="cursor-pointer">Log out</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	{#key $tasks}
		<DataTable {data} />
	{/key}
</div>
