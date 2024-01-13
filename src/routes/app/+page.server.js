import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const taskSchema = z.object({
	title: z.string().min(2).max(100),
	description: z.string().min(2).max(100),
	priority: z.enum(['low', 'medium', 'high'])
});

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();

	if (!session) {
		throw redirect(303, '/auth/login');
	}

	const form = await superValidate(event, taskSchema);

	const { data: tasks } = await event.locals.supabase
		.from('tasks')
		.select('id, created_at, title, status, priority')
		.order('created_at', { ascending: false });

	return {
		form,
		tasks
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	'add-task': async (event) => {
		const form = await superValidate(event, taskSchema);

		if (!form.valid) {
			return message(form, 'Oops! Something went wrong. Please check your input and try again.');
		}

		const session = await event.locals.getSession();

		const { data, error } = await event.locals.supabase
			.from('tasks')
			.insert({
				user_id: session.user.id,
				title: form.data.title,
				description: form.data.description,
				status: 'todo',
				priority: form.data.priority
			})
			.select();

		if (error) {
			return message(form, "Sorry, we couldn't create your task. Please try again later.", {
				status: 500
			});
		}

		return message(form, 'Task successfully created!');
	}
};
