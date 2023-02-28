<script lang="ts">
	import type { Item } from "$lib/types/types";
    import ListItem from "$lib/components/ListItem.svelte";

    export let items: Item[]; 
    
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
    {#each items as item}
        <ListItem item={item} />
    {/each}
</div> 

