<script lang="ts">
	import type { Item } from '../types';
    import ListItem from './ListItem.svelte';

    export let items: Item[]; 
    
</script>

<div class="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
    {#each items as item}
        <ListItem item={item} />
    {/each}
</div> 

