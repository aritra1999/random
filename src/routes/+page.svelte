<script lang="ts"> 
    import List from "$lib/components/List.svelte";
	import type { PageData } from "./$types";
    import type { Item } from "$lib/types/types";
	import { collectionStore, searchStore } from "$lib/store/store";
	import { filterItemListBySearchString, SEARCH_THRESHOLD } from "$lib/utils/utils";
	import Search from "$lib/components/Search.svelte";

    let items: Item[] = filterItemListBySearchString($collectionStore, $searchStore);
    $: items = filterItemListBySearchString($collectionStore, $searchStore);    

</script>

<div class="flex items-center justify-between mb-3">
    <div class="text-sm text-blue-600 rounded-lg" role="alert">
        {#if $searchStore.length >= SEARCH_THRESHOLD}
            Found 
            <span class="font-semibold">{items.length}</span> 
            items, searching for 
            <span class="font-semibold">{$searchStore}</span>
        {/if}
    </div>
    <Search />
</div>
<div class="h-full w-full">
    <List items={items} />
</div>