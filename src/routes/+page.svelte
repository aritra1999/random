<script lang="ts">
	import List from '$lib/components/List.svelte';
	import type { Item } from '$lib/types/types';
	import { collectionStore, searchStore } from '$lib/store/store';
	import { filterItemListBySearchString, SEARCH_THRESHOLD } from '$lib/utils/utils';

	let items = $derived(filterItemListBySearchString($collectionStore, $searchStore));
</script>

<div class="text-sm text-blue-600 mb-3" role="alert">
	{#if $searchStore.length >= SEARCH_THRESHOLD}
		Found
		<span class="font-semibold">{items.length}</span>
		items, searching for
		<span class="font-semibold">{$searchStore}</span>
	{/if}
</div>
<div class="h-full w-full">
	<List {items} />
</div>
