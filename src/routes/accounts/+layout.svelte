<svelte:head>
    <title>Kubera</title>
</svelte:head>

<section>
    <nav>
        <h1>Kubera</h1>
        <ul>
            <li><a href="/accounts">Accounts</a></li>
            <li><a href="/transactions">Transactions</a></li>
        </ul>
    </nav>

    <main>
        <slot />
    </main>
</section>

<style lang="scss">
section {
    display: flex;
    min-height: 100vh;

    nav {
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 1.8rem;
        padding-right: 1.8rem;
        background-color: $primary-color;
        color: $background-color;
        box-shadow: 4px 0px 20px 2px $text-color;

        h1 {
            font-size: 3.2rem;
            font-family: "Baloo Paaji 2";
            font-weight: 600;
        }

        ul {
            font-size: 2rem;
            list-style-type: none;
            width: 14rem;
            padding-left: 0.8rem;
            margin-top: 1rem;

            li {
                margin-bottom: 1.2rem;

                &:last-child {
                    margin-bottom: 0;
                }
            }
        }

        a {
            color: $background-color;
            font-weight: 500;

            &:hover::after {
                content: "\203A";
                margin-left: 0.5em;
            }
        }
    }

    main {
        flex-grow: 1;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 2.6rem;
        padding-right: 2.6rem;
    }
}
</style>
