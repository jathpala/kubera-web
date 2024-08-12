import { error } from "@sveltejs/kit"
import { KUBERA_SERVER } from "$env/static/public"

export async function load({ fetch }) {

    const result = await fetch(KUBERA_SERVER)
    const data = await result.json()

    if (data.service !== "kubera") {
        error(500, { message: "Invalid service" })
    }

    return data
}
