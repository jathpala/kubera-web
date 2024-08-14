<script>
import { invalidateAll } from "$app/navigation";
import { page } from "$app/stores";
import {
    Edit3Icon,
    Trash2Icon,
    PlusIcon
} from "svelte-feather-icons";

export let data;

let error

async function deleteAccount(event) {
    let id
    if (event.target.attributes.href) {
        // The event was triggered by the <a> element
        id = event.target.attributes.href.value.split("/").at(-1)
    } else {
        // The event was triggered by the <svg> element
        id = event.target.closest("a").attributes.href.value.split("/").at(-1)
    }

    const deleteRoute = [import.meta.env["KUBERA_SERVER"], "accounts", id].join("/")

    const result = await fetch(deleteRoute, {
        method: "DELETE",
    })
    switch (result.status) {
        case 200:
            // Success
            // goto(parentRoute, {invalidateAll: true})
            invalidateAll()
            break
        default:
            // Other error
            error = "Unable to delete account"
            console.log(error)
            break
    }
}
</script>

<svelte:head>
    <title>Kubera</title>
</svelte:head>

<header>
    <h1>Accounts</h1>
    <a href="{$page.url.pathname}/create"><PlusIcon size="1x" /><span>New</span></a>
</header>

{#each ["Equity", "Asset", "Liability", "Revenue", "Expense"] as type}
    <section>
        <h2>{type}</h2>
        <table class="accounts">
            <thead>
                <tr>
                    <th>Name</th>
                    <th class="right-align">Balance</th>
                    <th class="right-align">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="placeholder">
                    <td colspan="3">No accounts</td>
                </tr>
                {#each data.accounts as account}
                    {#if account.type === type.toLowerCase()}
                        <tr>
                            <td>
                                <a href="{$page.url.pathname}/{account.id}">
                                    {account.name}
                                </a>
                            </td>
                            <td class="right-align">$500.00</td>
                            <td class="right-align">
                                <a href="{$page.url.pathname}/{account.id}">
                                    <Edit3Icon size="0.9x" />
                                </a>
                                <a href="{$page.url.pathname}/{account.id}"
                                   on:click|preventDefault={deleteAccount}>
                                    <Trash2Icon size="0.9x" />
                                </a>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </section>
{/each}

<style lang="scss">
@use '$styles/variables' as *;

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            color: $primary-color;
            font-size: 2.6rem;
        }

        a {
            color: $background-color;
            background-color: $primary-color;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            padding-left: 0.6rem;
            padding-right: 0.6rem;
            font-size: 1.3rem;
            display: flex;
            column-gap: 0.3rem;
            align-items: center;
            border-radius: 0.3rem;
            box-shadow: 0px 0px 20px 2px $text-color;

            &:hover {
                background-color: scale-color($primary-color, $lightness: 10%);
            }
        }
    }

    section {
        margin-top: 2rem;

        h2 {
            color: $primary-color;
            font-size: 1.6rem;
            margin-bottom: 0.4rem;
            text-decoration: underline;
        }
    }

    table {
        border-collapse: collapse;
        width: calc(100% - 0.3rem);
        margin-left: 0.3rem;
        table-layout: fixed;

        thead {
            font-size: 1.3rem;

            tr {
                background-color: scale-color($primary-color, $lightness: 70%);

                th {
                    padding-top: 0.4rem;
                    padding-bottom: 0.4rem;
                    padding-left: 0.6rem;
                    padding-right: 0.6rem;
                    text-align: left;
                    color: $text-color;
                }
            }
        }

        tbody {
            font-size: 1.2rem;

            tr {
                background-color: scale-color($text-color, $lightness: 90%);

                &:nth-child(2n + 1) {
                    background-color: scale-color(
                        $primary-color,
                        $lightness: 80%
                    );
                }

                td {
                    padding-top: 0.4rem;
                    padding-bottom: 0.4rem;
                    padding-left: 0.6rem;
                    padding-right: 0.6rem;
                    color: $text-color;
                }

                &.placeholder {
                    display: none;
                    background-color: scale-color($text-color, $lightness: 90%);
                    color: scale-color($text-color, $lightness: 50%);

                    &:only-child {
                        display: table-row;
                    }
                }

                a {
                    color: $text-color;

                    &:hover {
                        color: scale-color($text-color, $lightness: 30%);
                    }
                }
            }
        }

        .right-align {
            text-align: right;
        }
    }
</style>
