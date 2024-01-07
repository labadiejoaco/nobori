<script>
	import { goto } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import DataTable from './data-table.svelte';

	export let data;

	const DUMMY_DATA = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com'
		},
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com'
		}
	];

	const logout = async () => {
		await data.supabase.auth.signOut();

		goto('/auth/login');
	};
</script>

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
	<DataTable data={DUMMY_DATA} />
</div>
