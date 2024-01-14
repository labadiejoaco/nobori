import { redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const taskUpdateSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(100),
	status: z.enum(['todo', 'in progress', 'done', 'canceled']),
	priority: z.enum(['low', 'medium', 'high'])
});

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession();

	if (!session) {
		throw redirect(303, '/auth/login');
	}

	const { data } = await event.locals.supabase
		.from('tasks')
		.select('id, created_at, title, description, status, priority')
		.eq('id', event.params.id);

	const taskDefaultValuesSchema = taskUpdateSchema.merge(
		z.object({
			title: z.string().min(1).max(100).default(data[0].title),
			description: z.string().min(1).max(100).default(data[0].description),
			status: z.enum(['todo', 'in progress', 'done', 'canceled']).default(data[0].status),
			priority: z.enum(['low', 'medium', 'high']).default(data[0].priority)
		})
	);

	const form = await superValidate(event, taskDefaultValuesSchema);

	return {
		form,
		task: data[0]
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	'update-task': async (event) => {
		const form = await superValidate(event, taskUpdateSchema);

		if (!form.valid) {
			return message(form, 'Oops! Something went wrong. Please check your input and try again.');
		}

		const { error } = await event.locals.supabase
			.from('tasks')
			.update({
				title: form.data.title,
				description: form.data.description,
				status: form.data.status,
				priority: form.data.priority
			})
			.eq('id', event.params.id);

		if (error) {
			return message(form, "Sorry, we couldn't update your task. Please try again later.", {
				status: 500
			});
		}

		return message(form, 'Task successfully updated!');
	}
};
