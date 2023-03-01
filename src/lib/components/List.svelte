<script lang="ts">
	import type { Item } from "$lib/types/types";
    import ListItem from "$lib/components/ListItem.svelte";

    export let items: Item[]; 
    


</script>

<!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "> -->
<div class="h-full w-full">
    <div class="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
        {#each items as item}
            <ListItem item={item} />
        {/each}
    </div> 
</div>

