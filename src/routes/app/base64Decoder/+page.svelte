<script lang="ts"> 
    import Loading from "$lib/components/Loading.svelte";
    let inputString:string = '';
    let decodedString:string = '';
    let loading:boolean = false;

    function decodeString() {
        loading = true;
        decodedString = atob(inputString);
        loading = false; 
    }

</script>


<h2 class="item-heading">base 64 decoder</h2>
<div class="flex items-center sm:flex-row flex-col">
    <div class="sm:w-1/2 w-full p-2"> 
        <label for="inputString" >enter string</label> 
        <textarea class="input w-full" name="inputString" placeholder="enter string" rows="3" bind:value={inputString} required></textarea>
    </div>
    <div class="sm:w-1/2 w-full p-2"> 
        <label for="decodedString" >decoded string</label> 
        <textarea class="input w-full" name="decodedString" placeholder="Enter string" rows="3" bind:value={decodedString} disabled={true}></textarea>
    </div>
</div>
<button on:click={() => decodeString()} class="submit-button">
    {#if loading}
        <Loading />
    {/if}
    submit
</button>
