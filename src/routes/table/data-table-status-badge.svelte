<script>
	export let value;
</script>

{#if value === 'Processing'}
	<span class="rounded bg-yellow-200 px-2 py-1 text-yellow-600">{value}</span>
{:else if value === 'Success'}
	<span class="rounded bg-green-200 px-2 py-1 text-green-600">{value}</span>
{:else if value === 'Failed'}
	<span class="rounded bg-red-200 px-2 py-1 text-red-600">{value}</span>
{/if}
