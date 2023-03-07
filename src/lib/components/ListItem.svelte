<script lang="ts">
	import type { Item } from "$lib/types/types"; 
    export let item: Item;
</script> 


<a href="{item.type === 'link' ? '' : item.type === 'blog' ? '/blog/' : '/app/'}{item.path}" target="_blank" rel="noreferrer" class="inline-block w-full px-6 py-3 rounded-lg font-semibold border-[3px] border-slate-100 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 group mb-4">
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
                {:else}
                    ❓
                {/if}
            </div>
        {/if}
        <div>
            <span>{item.title}</span>
        </div>
    </div>
    {#if item.description}
        <div class="mt-2 text-sm text-gray-500">{item.description}</div>
    {/if}
    {#if item.tags}
        <div class="mt-2">
            {#each item.tags as tag}
                <div class="tag">{tag}</div>
            {/each}
        </div>
    {/if}
    
</a>


