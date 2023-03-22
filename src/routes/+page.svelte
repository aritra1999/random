<script lang="ts"> 
    import List from "$lib/components/List.svelte";
	import type { PageData } from "./$types";
    import type { Item } from "$lib/types/types";
	import { searchStore } from "$lib/store/searchStore";
	import { buildItemList, SEARCH_THRESHOLD } from "$lib/utils/utils";
    
    export let data: PageData;
    let items: Item[];

    $: items = buildItemList(data.collection, $searchStore);
        
</script>

{#if $searchStore.length >= SEARCH_THRESHOLD}
    <div class="p-2 mb-4 text-sm text-blue-600 rounded-lg " role="alert">
        Found 
        <span class="font-semibold">{items.length}</span> 
        items, searching for 
        <span class="font-semibold">{$searchStore}</span>
    </div>
{/if}
<div class="h-full w-full">
    <List items={items} />
</div>