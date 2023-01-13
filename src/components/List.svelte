<script lang="ts">
    import ListItem from './ListItem.svelte';
    export let items; 
    
</script>

<div class="columns-3 p-4">
    {#each items as item}
        <ListItem item={item} />
    {/each}
</div> 

