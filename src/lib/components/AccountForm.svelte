<script>
import { createEventDispatcher } from 'svelte'
import { page } from "$app/stores"

import { KUBERA_SERVER } from "$env/static/public"

const parentRoute = $page.url.pathname.slice(0, $page.url.pathname.lastIndexOf("/"))

export let name = ""
export let type = "equity"
export let error

const submitName = name ? "Update" : "Create"

const dispatch = createEventDispatcher()

$: account = {
    name: name.trim(),
    type: type.trim()
}

function submit() {
    dispatch("submit", account)
}
</script>


<form action="{KUBERA_SERVER}/accounts">
    {#if error}
        <p class="flash">{error}</p>
    {/if}

    <label for="name-input">Name</label>
    <input id="name-input" type="text" name="name" placeholder="Account name..." bind:value={name}>

    <label for="type-input">Type</label>
    <select id="type-input" name="type" bind:value={type}>
        <option value="equity">Equity</option>
        <option value="asset">Asset</option>
        <option value="liability">Liability</option>
        <option value="revenue">Revenue</option>
        <option value="expense">Expense</option>
    </select>
    <fieldset class="form-controls">
        <a class="button secondary" href="{parentRoute}">Cancel</a>
        <button type="submit" name="submit" value="create"
        on:click|preventDefault={submit}>{submitName}</button>
    </fieldset>
</form>


<style lang="scss">
@use "$styles/theme" as *;

    form {
        display: grid;
        margin-left: 0.3rem;
        grid-template-columns: max-content max-content;
        font-size: 1.4rem;
        column-gap: 0.6rem;
        row-gap: 1.4rem;
        align-items: center;

        p.flash {
            grid-column-start: 1;
            grid-column-end: 3;
            color: $error-color;
            font-size: 1.2rem;
            text-align: center;
        }

        label {
            color: $text-color;
            font-weight: 600;
            text-align: right;

            &::after {
                content: ":";
            }
        }

        input, select {
            font-family: "Quicksand", sans-serif;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            font-size: 1.4rem;
            line-height: 2rem;
        }

        input#name-input {
            width: 20rem;
        }

        select#type-input {
            width: 8rem;
        }

        fieldset.form-controls {
            border-style: none;
            grid-column-start: 1;
            grid-column-end: 3;
            display: flex;
            justify-content: flex-end;
            gap: 1rem;

            a.button, button[type="submit"] {
                font-size: 1.4rem;
                background-color: $primary-color;
                color: $background-color;
                padding-top: 0.4rem;
                padding-bottom: 0.4rem;
                border-radius: 0.3rem;
                font-weight: 600;
                cursor: pointer;
                border-style: solid;
                border-width: 2px;
                border-color: $primary-color;
                width: 7rem;
                text-align: center;

                &:hover {
                    background-color: scale-color($primary-color, $lightness: 5%);
                }
            }

            a.secondary {
                background-color: $background-color;
                color: $primary-color;
                border-style: solid;
                border-color: $primary-color;
                border-width: 2px;

                &:hover {
                    background-color: scale-color($background-color, $lightness: -15%);
                }
            }
        }
    }
</style>
