<script>
	export let value;

	const statuses = {
		todo: 'bg-blue-200 text-blue-600',
		'in progress': 'bg-yellow-200 text-yellow-600',
		done: 'bg-green-200 text-green-600',
		canceled: 'bg-red-200 text-red-600'
	};
</script>

<span class={`whitespace-nowrap rounded px-2 py-1 capitalize ${statuses[value]}`}>{value}</span>
