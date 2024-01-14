<script>
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Toaster } from '$lib/components/ui/sonner';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Loader2 } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, enhance, constraints, errors, delayed } = superForm(data.form, {
		onUpdated({ form }) {
			toast(form.message);
		}
	});

	const logout = async () => {
		await data.supabase.auth.signOut();

		goto('/auth/login');
	};

	$: ({ task } = data);
</script>

<Toaster position="bottom-center" />
<div class="container mx-auto py-8">
	<div class="mb-4 flex items-center justify-between gap-4">
		<div class="flex items-center">
			<div>
				<h1 class="text-2xl font-medium">Task Details</h1>
				<p class="text-muted-foreground">Update your task details.</p>
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
	<Separator class="mb-4" />
	<form action="?/update-task" method="post" use:enhance class="space-y-4">
		<div class="space-y-1">
			<Label for="id">Id</Label>
			<Input type="text" id="id" name="id" placeholder={task.id} disabled bind:value={task.id} />
		</div>
		<div class="space-y-1">
			<Label for="created-at">Created at</Label>
			<Input
				type="text"
				id="created-at"
				name="created-at"
				placeholder={task.created_at}
				disabled
				bind:value={task.created_at}
			/>
		</div>
		<div class="space-y-1">
			<Label for="title">Title</Label>
			<Input
				type="text"
				id="title"
				name="title"
				placeholder={task.title}
				{...$constraints.title}
				disabled={$delayed}
				bind:value={$form.title}
			/>
			{#if $errors.title}
				<span class="text-sm font-medium text-red-600">{$errors.title}</span>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="description">Description</Label>
			<Textarea
				id="description"
				name="description"
				placeholder={task.description}
				{...$constraints.description}
				disabled={$delayed}
				bind:value={$form.description}
			/>
			{#if $errors.description}
				<span class="text-sm font-medium text-red-600">{$errors.description}</span>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="status">Status</Label>
			<div>
				<select
					id="status"
					name="status"
					{...$constraints.status}
					disabled={$delayed}
					bind:value={$form.status}
					class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<option value="todo">Todo</option>
					<option value="in progress">In Progress</option>
					<option value="done">Done</option>
					<option value="canceled">Canceled</option>
				</select>
			</div>
			{#if $errors.status}
				<span class="text-sm font-medium text-red-600">{$errors.status}</span>
			{/if}
		</div>
		<div class="space-y-1">
			<Label for="priority">Priority</Label>
			<div>
				<select
					id="priority"
					name="priority"
					{...$constraints.priority}
					disabled={$delayed}
					bind:value={$form.priority}
					class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
			</div>
			{#if $errors.priority}
				<span class="text-sm font-medium text-red-600">{$errors.priority}</span>
			{/if}
		</div>
		<Button type="submit">
			{#if $delayed}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			Update Task
		</Button>
	</form>
</div>
