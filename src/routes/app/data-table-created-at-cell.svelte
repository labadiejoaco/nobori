<script>
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let value;

	const date = new Date(value);

	const formattedShort = new Intl.DateTimeFormat('en-US', {
		month: '2-digit',
		day: '2-digit',
		year: '2-digit'
	}).format(date);

	const formattedLong = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	}).format(date);
</script>

<Tooltip.Root>
	<Tooltip.Trigger>{formattedShort}</Tooltip.Trigger>
	<Tooltip.Content>
		<p>{formattedLong}</p>
	</Tooltip.Content>
</Tooltip.Root>
