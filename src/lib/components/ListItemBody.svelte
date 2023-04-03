<script lang="ts">
    import type { Item } from "$lib/types/types";
	import { getIcon } from "$lib/utils/utils";
    import SvelteMarkdown from "svelte-markdown";
    export let item: Item; 
    $: icon = getIcon(item.type);
</script>
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