<script>
	import * as Pagination from '$lib/components/ui/pagination';
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { tasks } from '../../stores/task-store';

	export let pageRows, pluginStates, rows;

	const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } = pluginStates.page;

	const { selectedDataIds } = pluginStates.select;
</script>

<div class="rounded-b-md border border-t-0 p-2">
	<Pagination.Root count={$tasks.length} perPage={10} let:pages let:currentPage>
		<Pagination.Content class="flex w-full justify-between">
			<Pagination.Item>
				<Pagination.PrevButton
					on:click={() => ($pageIndex = $pageIndex - 1)}
					variant="outline"
					class="px-4"
				>
					<ArrowLeft class="h-4 w-4" />
					<span class="hidden sm:block">Previous</span>
				</Pagination.PrevButton>
			</Pagination.Item>
			<div class="flex space-x-2">
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link
								on:click={() => ($pageIndex = page.value - 1)}
								{page}
								isActive={currentPage == page.value}
							>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
			</div>
			<Pagination.Item>
				<Pagination.NextButton
					on:click={() => ($pageIndex = $pageIndex + 1)}
					variant="outline"
					class="px-4"
				>
					<span class="hidden sm:block">Next</span>
					<ArrowRight class="h-4 w-4" />
				</Pagination.NextButton>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>
