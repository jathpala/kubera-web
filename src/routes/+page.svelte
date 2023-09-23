<script>
    export let data;
</script>

<svelte:head>
    <title>Kubera</title>
</svelte:head>

<main>
    <h1>Kubera</h1>
    <h2>Version: {data.version}</h2>
</main>

<style lang="scss">
@use "$styles/variables" as *;

main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        margin: 0;
        margin-top: -5rem;     // Prevents heading moving down when bringing next element up
        margin-bottom: -5rem;  // Brings next element up closer to heading text
        color: $primary-color;
        font-family: 'Baloo Paaji 2', sans-serif;
        font-size: 10rem;
    }

    h2 {
        margin: 0;
        color: $secondary-color;
        font-family: 'Quicksand', sans-serif;
        font-size: 0.7rem;
        font-style: italic;
    }
}
</style>
