<script lang="ts"> 
    import type { Item } from "$lib/types/types";
    import items from "$lib/data/collection.json";
    import { searchStore } from "$lib/store/searchStore";

    import List from "$lib/components/List.svelte";
    
    let itemList = items;
    const SEARCH_THRESHOLD = 1;
    
    $: ($searchStore.length >= SEARCH_THRESHOLD) ? 
        itemList = items.filter((item: Item) => {     
            const searchTerm = $searchStore.toLocaleLowerCase();
            return  item.title.toLowerCase().includes(searchTerm) || 
                    item.icon?.toLowerCase().includes(searchTerm) || 
                    item.tags?.join().toLowerCase().includes(searchTerm);
        }) : itemList = items;
    
</script>

{#if $searchStore.length >= SEARCH_THRESHOLD}
    <div class="p-2 mb-4 text-sm text-blue-600 rounded-lg " role="alert">
        Found <span class="font-semibold">{itemList.length}</span> items, searching for <span class="font-semibold">{$searchStore}</span>
    </div>
{/if}

<List items={itemList} />


