<script lang="ts"> 
    import List from "$lib/components/List.svelte";
	import type { PageData } from "./$types";
    import type { Item } from "$lib/types/types";
	import { searchStore } from "$lib/store/searchStore";
	import { buildCategories, buildItemList, SEARCH_THRESHOLD } from "$lib/utils/utils";
    import { Dropdown } from 'flowbite-svelte'

    export let data: PageData;
    let selectedCategories = new Set<string>();
    let items: Item[] = buildItemList(data.collection, $searchStore, Array.from(selectedCategories));
    let categories = buildCategories(items);

    function selectCategory(category: string) {        
        selectedCategories.add(category);
        console.log(selectedCategories);
    }

    $: items = buildItemList(data.collection, $searchStore, Array.from(selectedCategories));

</script>

<div class="flex items-center justify-between">
    <div class="p-2 mb-4 text-sm text-blue-600 rounded-lg " role="alert">
        {#if $searchStore.length >= SEARCH_THRESHOLD}
            Found 
            <span class="font-semibold">{items.length}</span> 
            items, searching for 
            <span class="font-semibold">{$searchStore}</span>
        {/if}
    </div>
    <div class="mb-3">
        <button class="flex text-slate-800 items-center py-2 px-4 bg-white rounded-lg shadow-lg shadow-slate-200">
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 ml-3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
        </button>
        <Dropdown>
            <div class="flex flex-col divide-y divide-slate-200">
                {#each categories as category}
                    <button on:click={() => selectCategory(category)} class="py-1.5 px-3">{category}</button>
                {/each}
            </div>
        </Dropdown>
    </div>
</div>
<div class="h-full w-full">
    <List items={items} />
</div>