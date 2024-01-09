<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Plus } from 'lucide-svelte';
	import DataTable from './data-table.svelte';

	export let data;

	const logout = async () => {
		await data.supabase.auth.signOut();

		goto('/auth/login');
	};
</script>

<Dialog.Root>
	<Dialog.Trigger asChild let:builder>
		<Button builders={[builder]} class="fixed bottom-5 right-5 z-10 h-12 w-12 rounded-full"
			><Plus /></Button
		>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create a New Task</Dialog.Title>
			<Dialog.Description>Provide details for your new task below.</Dialog.Description>
		</Dialog.Header>
		<form id="add-task" action="?/add-task" method="post" use:enhance class="space-y-4">
			<div class="space-y-1">
				<Label for="title">Title</Label>
				<Input
					type="text"
					id="title"
					name="title"
					placeholder="e.g., Update software and apps"
					required
				/>
			</div>
			<div class="space-y-1">
				<Label for="description">Description</Label>
				<Textarea
					id="description"
					name="description"
					placeholder="Add task details here..."
					required
				/>
			</div>
			<div class="space-y-1">
				<Label for="priority">Priority</Label>
				<Select.Root portal={null}>
					<Select.Trigger>
						<Select.Value placeholder="Select priority" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Priority</Select.Label>
							<Select.Item value="Low">Low</Select.Item>
							<Select.Item value="Medium">Medium</Select.Item>
							<Select.Item value="High">High</Select.Item>
						</Select.Group>
					</Select.Content>
					<Select.Input id="priority" name="priority" />
				</Select.Root>
			</div>
		</form>
		<Dialog.Footer>
			<Button type="submit" form="add-task">Add Task</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
<div class="container mx-auto py-8">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-medium">Welcome back!</h1>
			<p class="text-muted-foreground">
				Let's make today productive! Your tasks are waiting for you.
			</p>
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
	<DataTable data={data.tasks} />
</div>
