export async function load({ fetch }) {

    const result = await fetch("http://127.0.0.1:8000/accounts")
    const accounts = await result.json()

    return {"accounts": accounts }
}
