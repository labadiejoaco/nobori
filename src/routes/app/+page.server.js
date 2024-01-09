import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { getSession, supabase } }) {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth/login');
	}

	const { data: tasks } = await supabase
		.from('tasks')
		.select('id, created_at, title, status, priority');

	return {
		tasks
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	'add-task': async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();

		const title = formData.get('title');
		const description = formData.get('description');
		const priority = formData.get('priority');
	}
};
