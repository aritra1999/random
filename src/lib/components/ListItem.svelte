<script lang="ts">
	import type { Item } from "$lib/types/types"; 
	import { onMount } from "svelte";
	import SvelteMarkdown from "svelte-markdown";
    export let item: Item;
    onMount(async () => {
        if(item.type === "gist") {
            try {
                item.description = await (await fetch(item.path, {method: 'GET'})).text();
            } catch {
                item.description = "Error loading gist"
            }
            item.path = "";
        }

        item.path = `${item.type === 'link' ? '' : item.type === 'blog' ? '/blog/' : '/app/'}${item.path}`;
    });
    
</script> 


<a href={item.path} target="_blank" rel="noreferrer" class="inline-block w-full px-6 py-3 rounded-lg border-[3px] border-slate-100 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 group mb-4">
    <div class="flex items-center space-x-2">
        {#if item.icon}
            <img src={item.icon} alt="" class="h-5 w-5"/>
        {:else}
            <div class="mr-2">
                {#if item.type === "link"}    
                    🔗
                {:else if item.type === "application"}
                    🔥
                {:else if item.type === "game"}
                    🎮
                {:else if item.type === "blog"}
                    📄
                {:else if item.type === "gist"}
                    📐
                {:else}
                    ❓
                {/if}
            </div>
        {/if}
        <div>
            <span class="font-semibold">
                {item.title}
            </span>
            <span class="tag">
                {item.type}
            </span>
        </div>
    </div>
    {#if item.description}
        <div class="my-1 font-medium text-sm">
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


