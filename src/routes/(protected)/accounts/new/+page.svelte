<script>
import AccountForm from "$lib/components/AccountForm.svelte"
import { goto } from "$app/navigation"
import { page } from "$app/stores"

import { KUBERA_SERVER } from "$env/static/public"

const createRoute = [KUBERA_SERVER, "accounts"].join("/")
const parentRoute = $page.url.pathname.slice(0, $page.url.pathname.lastIndexOf("/"))

let error

async function sendAccount(event) {
    const result = await fetch(createRoute, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event.detail)
    })
    const data = await result.json()
    switch (result.status) {
        case 201:
            // Success
            goto(parentRoute, {invalidateAll: true})
            break
        case 400:
            // Account already exists
            error = data.detail
            break
            case 422:
        default:
            // Other error
            console.error(data)
            error = "Unable to create account"
            break
    }
}
</script>

<svelte:head>
<title>Kubera</title>
</svelte:head>


<header>
    <h1>Create Account</h1>
</header>

<section>
    <AccountForm on:submit={sendAccount} bind:error={error}/>
</section>


<style lang="scss">
@use "$styles/theme" as *;
header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        color: $primary-color;
        font-size: 2.6rem;
    }
}

section {
    margin-top: 2rem;
}
</style>
