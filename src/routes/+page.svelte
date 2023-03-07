<script> 
    import List from "$lib/components/List.svelte";
	import type { PageData } from "./$types";
    
    export let data: PageData;
    let items: Item[] = data.collection;
    const ogItems = items;
    const SEARCH_THRESHOLD = 1;

    $: ($searchStore.length >= SEARCH_THRESHOLD) ? 
        items = ogItems.filter((item: Item) => {     
            const searchTerm = $searchStore.toLocaleLowerCase();
            return  item.title.toLowerCase().includes(searchTerm) || 
                    item.icon?.toLowerCase().includes(searchTerm) || 
                    item.description?.toLowerCase().includes(searchTerm) ||
                    item.tags?.join().toLowerCase().includes(searchTerm);
        }) : items = ogItems;
    
</script>

{#if $searchStore.length >= SEARCH_THRESHOLD}
    <div class="p-2 mb-4 text-sm text-blue-600 rounded-lg " role="alert">
        Found 
        <span class="font-semibold">{items.length}</span> 
        items, searching for 
        <span class="font-semibold">{$searchStore}</span>
    </div>
{/if}
<List items={items} />


