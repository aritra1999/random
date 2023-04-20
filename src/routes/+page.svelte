<script lang="ts"> 
    import List from "$lib/components/List.svelte";
	import type { PageData } from "./$types";
    import type { Item } from "$lib/types/types";
	import { collectionStore, searchStore } from "$lib/store/store";
	import { filterItemListBySearchString, SEARCH_THRESHOLD } from "$lib/utils/utils";

    let items: Item[] = filterItemListBySearchString($collectionStore, $searchStore);
    $: items = filterItemListBySearchString($collectionStore, $searchStore);    

</script>

<div class="flex items-center justify-between">
    {#if $searchStore.length >= SEARCH_THRESHOLD}
        <div class="p-2 mb-4 text-sm text-blue-600 rounded-lg " role="alert">
            Found 
            <span class="font-semibold">{items.length}</span> 
            items, searching for 
            <span class="font-semibold">{$searchStore}</span>
        </div>
    {/if}
</div>
<div class="h-full w-full">
    <List items={items} />
</div>