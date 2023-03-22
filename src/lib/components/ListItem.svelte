<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import { getIcon, getLocation } from "$lib/utils/utils";
	import { onMount } from "svelte";
	import type { Item } from "$lib/types/types";

    export let item: Item;
    let location: string; 
    let icon: string;

    onMount(async() => {
        if (item.type === "gist") {
            item.description = await (await fetch(item.path)).text(); 
        } 
    })

    $: location = getLocation(item.type, item.path);
    $: icon = getIcon(item.type);
</script> 

<a href={location} target="_blank" rel="noreferrer" class="inline-block w-full px-6 py-3 rounded-lg border-[3px] border-slate-100 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 group mb-4">
    <div class="flex items-center space-x-3">
        {#if item.icon}
            <img src={item.icon} alt="❓" class="h-5 w-5"/>
        {:else}
            <div>{icon}</div>
        {/if}
        <div class="font-semibold text-lg">{item.title}</div>
    </div>
    {#if item.description}
        <div class="font-medium text-xs my-2 prose prose-lg">
            <SvelteMarkdown source={item.description} />
        </div>
    {/if}
    {#if item.tags}
        <div class="mt-2">
            {#each item.tags as tag}
                <div class="tag">{tag}</div>
            {/each}
        </div>
    {/if}
</a>


