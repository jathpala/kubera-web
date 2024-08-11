import { error } from "@sveltejs/kit";

export async function load({ fetch }) {

    const result = await fetch(import.meta.env['KUBERA_SERVER'])
    const data = await result.json()

    if (data.service !== 'kubera') {
        error(418, {
                    message: "Invalid service"
                });
    }

    return data
}
