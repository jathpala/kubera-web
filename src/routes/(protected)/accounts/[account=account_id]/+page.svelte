<script>
  import AccountForm from "$lib/components/AccountForm.svelte"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"

  export let data

  const updateRoute = [import.meta.env["KUBERA_SERVER"], "accounts", $page.params.account].join("/")
  const parentRoute = $page.url.pathname.slice(0, $page.url.pathname.lastIndexOf("/"))

  let error

  async function sendAccount(event) {
    const result = await fetch(updateRoute, {
      method: "PUT",
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
  <h1>Account</h1>
</header>

<section>
  <AccountForm
    on:submit={sendAccount}
    bind:error
    name={data.account.name}
    type={data.account.type} />
</section>

<style lang="scss">
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
