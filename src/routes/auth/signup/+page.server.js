import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { getSession } }) {
	const session = await getSession();

	if (session) {
		throw redirect(303, '/app');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (error) {
			return fail(500, { error: 'Server error. Try again later.', success: false });
		}

		throw redirect(303, '/app');
	}
};
