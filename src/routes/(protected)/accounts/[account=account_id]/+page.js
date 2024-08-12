export async function load({ params, fetch }) {

    const result = await fetch(`http://127.0.0.1:8000/accounts/${params.account}`)
    const account = await result.json()

    return {"account": account }
}
