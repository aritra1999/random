<script lang="ts"> 
    import Loading from "$lib/components/Loading.svelte";
    let inputString:string = '';
    let encodedString:string = '';
    let loading:boolean = false;

    function encodeString() {
        loading = true;
        encodedString = btoa(inputString);
        loading = false; 
    }

</script>


<h2 class="item-heading">base 64 encoder</h2>
<div class="flex items-center sm:flex-row flex-col">
    <div class="sm:w-1/2 w-full p-2"> 
        <label for="inputString" >enter string</label> 
        <textarea name="inputString" placeholder="enter string" rows="3" bind:value={inputString} required></textarea>
    </div>
    <div class="sm:w-1/2 w-full p-2"> 
        <label for="encodedString" >encoded string</label> 
        <textarea class="" name="encodedString" placeholder="Enter string" rows="3" bind:value={encodedString} disabled={true}></textarea>
    </div>
</div>
<button on:click={() => encodeString()} class="submit-button">
    {#if loading}
        <Loading />
    {/if}
    submit
</button>
