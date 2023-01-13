<script lang="ts"> 
    import Loading from '../../components/Loading.svelte';

    let loading = false;

</script>

<form> 
    <div class="flex items-center">
        <div class="w-1/2"> 
            <textarea placeholder="Enter string" rows="5"></textarea>
        </div>
        <div class="w-1/2"> 
            <textarea placeholder="Enter string" rows="5"></textarea>
        </div>
    </div>
    <button type="submit" class="submit-button">
        <Loading />
        submit
    </button>
</form> 