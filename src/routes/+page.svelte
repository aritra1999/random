<script lang="ts"> 
    import type { Item } from "$lib/types/types";
    import { searchStore } from "$lib/store/searchStore";

    import List from "$lib/components/List.svelte";
    
    const SEARCH_THRESHOLD = 1;
    
    export let data: {items: Item[]}; 
    const ogData = data;

    $: ($searchStore.length >= SEARCH_THRESHOLD) ? 
        data.items = data.items.filter((item: Item) => {     
            const searchTerm = $searchStore.toLocaleLowerCase();
            return  item.title.toLowerCase().includes(searchTerm) || 
                    item.icon?.toLowerCase().includes(searchTerm) || 
                    item.tags?.join().toLowerCase().includes(searchTerm);
        }) : data = ogData;
    
</script>

{#if $searchStore.length >= SEARCH_THRESHOLD}
    <div class="p-2 mb-4 text-sm text-blue-600 rounded-lg " role="alert">
        Found <span class="font-semibold">{data.items.length}</span> items, searching for <span class="font-semibold">{$searchStore}</span>
    </div>
{/if}

<List items={data.items} />


