<script lang="ts">
    import type { Item } from "$lib/types/types";
	import { getIcon, sleep } from "$lib/utils/utils";
    import SvelteMarkdown from "svelte-markdown";

    export let item: Item; 
    $: iconElement = getIcon(item.type, item.icon);
</script>

<div class="flex items-center space-x-3">
    {@html iconElement}
    <div class="font-semibold text-lg">{item.title}</div>
</div>
<div>
    {#if item.description} description {/if}
    <div class="font-medium text-xs my-2 prose prose-lg">
        <SvelteMarkdown source={item.description} />
    </div>


    {#if item.links} 
        <div class="text-xs divide-y divide-slate-200 mt-2">
            {#each item.links as link}
                <div class="px-3 py-2.5 flex items-center space-x-3">
                    {#if link.logo}
                        <img src="{link.logo}" alt="📜" class="h-4 w-4">
                    {:else}
                        <div class="text-md">📜</div>
                    {/if}
                    <a href="{link.link}" target="_blank" rel="noreferrer">{link.title}</a>
                </div>
            {/each}
        </div>
    {/if}

    {#if item.tags}
        <div class="mt-2">
            <div class="tag">{item.type}</div>
            {#each item.tags as tag}
                <div class="tag">{tag}</div>
            {/each}
        </div>
    {/if}
</div>