<script lang="ts"> 
    import Loading from "$lib/components/Loading.svelte";

    let inputString: string = '';
    let outputString: string = '';
    let encodedLoading: boolean = false;
    let decodedLoading: boolean = false;

    function encodeString() {
        encodedLoading = true;
        outputString = btoa(inputString);
        encodedLoading = false; 
    }

    function decodeString() {
        decodedLoading = true;
        outputString = atob(inputString);
        decodedLoading = false; 
    }

</script>

<h2 class="item-heading">base 64 encoder</h2>
<div class="flex items-center sm:flex-row flex-col">
    <div class="sm:w-1/2 w-full p-2"> 
        <label for="inputString" >input </label> 
        <textarea class="input h-48 w-full" name="encodeString" placeholder="enter string" rows="3" bind:value={inputString} required></textarea>
    </div>
    <div class="sm:w-1/2 w-full p-2"> 
        <label for="encodedString" >output</label> 
        <textarea class="input h-48 w-full" name="decodeString" placeholder="output string" rows="3" bind:value={outputString} disabled={true}></textarea>
    </div>
</div>
<div class="flex items-center space-x-2">
    <button on:click={() => encodeString()} class="submit-button">
        {#if encodedLoading}<Loading />{/if}
        encode
    </button>
    <button on:click={() => decodeString()} class="submit-button">
        {#if decodedLoading}<Loading />{/if}
        decode
    </button>
</div>
