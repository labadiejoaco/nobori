<script>
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Table from '$lib/components/ui/table';
	import { Textarea } from '$lib/components/ui/textarea';
	import { cn } from '$lib/utils';
	import { ArrowUpDown, ChevronDown, Loader2 } from 'lucide-svelte';
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { toast } from 'svelte-sonner';
	import { readable } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms/client';
	import { tasks } from '../../stores/task-store';
	import Actions from './data-table-actions.svelte';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import DataTablePriorityCell from './data-table-priority-cell.svelte';
	import DataTableStatusCell from './data-table-status-cell.svelte';
	import DataTableTitleCell from './data-table-title-cell.svelte';

	export let data;

	const { form, enhance, constraints, errors, delayed } = superForm(data.form, {
		onUpdated({ form }) {
			toast(form.message);
		},
		resetForm: true
	});

	const table = createTable(readable($tasks), {
		sort: addSortBy({
			toggleOrder: ['desc', 'asc']
		}),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: (_, { pluginStates }) => {
				const { allPageRowsSelected } = pluginStates.select;
				return createRender(DataTableCheckbox, {
					checked: allPageRowsSelected
				});
			},
			accessor: 'id',
			cell: ({ row }, { pluginStates }) => {
				const { getRowState } = pluginStates.select;
				const { isSelected } = getRowState(row);

				return createRender(DataTableCheckbox, {
					checked: isSelected
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: 'Created at',
			accessor: 'created_at',
			cell: ({ value }) => {
				const date = new Date(value);

				const formatted = new Intl.DateTimeFormat('en-US', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				}).format(date);

				return formatted;
			},
			plugins: {
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: 'Title',
			accessor: 'title',
			cell: ({ value }) => {
				return createRender(DataTableTitleCell, {
					value
				});
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			header: 'Status',
			accessor: 'status',
			cell: ({ value }) => {
				return createRender(DataTableStatusCell, {
					value
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: 'Priority',
			accessor: 'priority',
			cell: ({ value }) => {
				return createRender(DataTablePriorityCell, {
					value
				});
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			header: '',
			accessor: ({ id }) => id,
			cell: (item) => {
				return createRender(Actions, { id: item.value });
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	const hideableCols = ['created_at', 'title', 'status', 'priority'];
</script>

<div>
	<div class="mb-4 flex items-center justify-between gap-4">
		<div class="flex gap-4">
			<Input type="text" placeholder="Filter tasks..." bind:value={$filterValue} />
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" builders={[builder]}>
						Columns <ChevronDown class="ml-2 h-4 w-4" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					{#each flatColumns as col}
						{#if hideableCols.includes(col.id)}
							<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
								{col.header}
							</DropdownMenu.CheckboxItem>
						{/if}
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<Dialog.Root>
			<Dialog.Trigger asChild let:builder>
				<Button builders={[builder]}>Create Task</Button>
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
							{...$constraints.title}
							disabled={$delayed}
							bind:value={$form.title}
						/>
						{#if $errors.title}
							<span class="text-sm font-medium text-red-600">{$errors.title}</span>
						{/if}
					</div>
					<div class="space-y-1">
						<Label for="description"
							>Description <span class="text-muted-foreground">(optional)</span></Label
						>
						<Textarea
							id="description"
							name="description"
							placeholder="Add task details here..."
							{...$constraints.description}
							disabled={$delayed}
							bind:value={$form.description}
						/>
						{#if $errors.description}
							<span class="text-sm font-medium text-red-600">{$errors.description}</span>
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
								<option value="" disabled selected>Select priority</option>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						{#if $errors.priority}
							<span class="text-sm font-medium text-red-600">{$errors.priority}</span>
						{/if}
					</div>
				</form>
				<Dialog.Footer>
					<Button type="submit" form="add-task">
						{#if $delayed}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Add Task
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>
	<div class="rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
										{#if cell.id === 'created_at'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown
													class={cn(
														$sortKeys[0]?.id === cell.id && 'text-foreground',
														'ml-2 h-4 w-4'
													)}
												/>
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
										<Render of={cell.render()} />
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="mt-4 flex items-center justify-end space-x-2">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of{' '}
			{$rows.length} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
