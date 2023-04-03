<script lang="ts">
	import { getLocation } from "$lib/utils/utils";
	import { onMount } from "svelte";
	import type { Item } from "$lib/types/types";
	import ListItemBody from "$lib/components/ListItemBody.svelte";

    export let item: Item;
    let location: string; 

    onMount(async() => {
        if (item.type === "gist") {
            item.description = await (await fetch(item.path)).text(); 
        } 
    })

    $: location = getLocation(item.type, item.path);
</script> 

{#if location === "" }
    <div class="inline-block w-full px-6 py-3 rounded-lg border-[3px] border-slate-100 hover:border-zinc-600 group mb-4">
        <ListItemBody item={item} />
    </div>
{:else}
    <a href={location} target="_blank" rel="noreferrer" class="inline-block w-full px-6 py-3 rounded-lg border-[3px] border-slate-100 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 group mb-4">
        <ListItemBody item={item} />
    </a>
{/if}
