<script lang="ts">
	import { getLocation } from '$lib/utils/utils';
	import type { Item } from '$lib/types/types';
	import ListItemBody from '$lib/components/ListItemBody.svelte';

	let { item }: { item: Item } = $props();
	let location = $derived(getLocation(item.type, item.path));
</script>

{#if location === ''}
	<div class="list-item group hover:border-zinc-600">
		<ListItemBody {item} />
	</div>
{:else}
	<a
		href={location}
		target="_blank"
		rel="noreferrer"
		class="list-item group hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
	>
		<ListItemBody {item} />
	</a>
{/if}
