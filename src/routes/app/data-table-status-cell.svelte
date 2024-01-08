<script>
	export let value;
</script>

{#if value === 'Todo'}
	<span class="whitespace-nowrap rounded bg-blue-200 px-2 py-1 text-blue-600">{value}</span>
{:else if value === 'In Progress'}
	<span class="whitespace-nowrap rounded bg-yellow-200 px-2 py-1 text-yellow-600">{value}</span>
{:else if value === 'Done'}
	<span class="whitespace-nowrap rounded bg-green-200 px-2 py-1 text-green-600">{value}</span>
{:else if value === 'Canceled'}
	<span class="whitespace-nowrap rounded bg-red-200 px-2 py-1 text-red-600">{value}</span>
{/if}
