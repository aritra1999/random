<script lang="ts">
    import { searchStore } from '$lib/store/store';
    export let showSearch: boolean;   
    const toggleSearch = () => { 
        showSearch = !showSearch 
        if(!showSearch) searchStore.set('');
    };


    function init(el: HTMLInputElement){
        el.focus()
    }
</script>


{#if showSearch}
    <div class="fixed top-0 left-0 w-screen h-16 backdrop-blur-sm bg-white/50 flex items-center justify-between px-6">
        <div class="flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>      
            <input bind:value={$searchStore} use:init class="bg-transparent w-full text-slate-800" placeholder="Search..." />
        </div>
        <div>
            <button on:click={toggleSearch} class="bg-slate-100 p-2.5 rounded-lg text-slate-700 hover:text-blue-500 hover:bg-blue-50 hover:ring-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>  
            </button>        
        </div>
    </div>
{:else}
    <button on:click={toggleSearch} class="bg-slate-100 p-2.5 rounded-lg text-slate-700 hover:text-blue-500 hover:bg-blue-50 hover:ring-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>      
    </button>
{/if}