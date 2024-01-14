<script>
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { MoreHorizontal } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { tasks } from '../../stores/task-store';

	export let id;

	const deleteTask = async () => {
		toast.promise(
			fetch('/api/delete-task', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id })
			})
				.then(async (response) => {
					const data = await response.json();

					if (response.ok) {
						$tasks = $tasks.filter((task) => task.id !== id);

						return data;
					} else {
						throw new Error(data.message);
					}
				})
				.catch((error) => {
					return error;
				}),
			{
				loading: 'Deleting task. Please wait...',
				success: (data) => {
					return data.message;
				},
				error: (error) => {
					return error.message;
				}
			}
		);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoreHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
				Copy task ID
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item href={`/app/${id}`}>View task details</DropdownMenu.Item>
		<DropdownMenu.Item on:click={deleteTask}>Delete task</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
