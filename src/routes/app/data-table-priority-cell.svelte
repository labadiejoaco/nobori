<script>
	import { AlertTriangle, Circle, Triangle } from 'lucide-svelte';

	export let value;
</script>

<div class="flex items-center">
	{#if value === 'low'}
		<Triangle class="mr-2 h-4 w-4 rotate-180 text-muted-foreground" />
	{:else if value === 'medium'}
		<Circle class="mr-2 h-4 w-4 text-muted-foreground" />
	{:else if value === 'high'}
		<AlertTriangle class="mr-2 h-4 w-4 text-muted-foreground" />
	{/if}
	<span class="capitalize">{value}</span>
</div>
