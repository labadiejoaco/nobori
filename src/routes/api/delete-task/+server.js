import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals: { supabase } }) {
	const { id } = await request.json();

	const { error: err } = await supabase.from('tasks').delete().eq('id', id);

	if (err) {
		error(500, { message: 'Oops! Something went wrong while deleting the task.' });
	}

	return new Response(JSON.stringify({ message: 'Task successfully deleted!' }));
}
