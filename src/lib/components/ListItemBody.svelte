<script lang="ts">
    import { onMount } from "svelte";
    import type { Item } from "$lib/types/types";
	import { getIcon, sleep } from "$lib/utils/utils";
    import Loading from "$lib/components/Loading.svelte";
    import SvelteMarkdown from "svelte-markdown";

    export let item: Item; 
    let loading = false;
    
    onMount(async () => {
        if (item.type === "gist") {
            loading = true;
            item.description = await (await fetch(item.path)).text(); 
            loading = false; 
        } 
    });

    $: iconElement = getIcon(item.type, item.icon);
</script>

<div class="flex items-center space-x-3">
    {@html iconElement}
    <div class="font-semibold text-lg">{item.title}</div>
</div>

{#if loading}
<div class="w-full flex justify-center py-2">
    <Loading />
</div>
{:else} 
    {#if item.description}
        <div class="font-medium text-xs my-2 prose prose-lg">
            <SvelteMarkdown source={item.description} />
        </div>
    {/if}
{/if}

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