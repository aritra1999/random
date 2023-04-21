<script lang="ts">
    import { searchStore } from '$lib/store/store';
</script>

<div class="flex items-center justify-between px-4 py-2 bg-white rounded-lg border-[2px] border-slate-100 hover:border-black focus:border-black space-x-3 w-full sm:w-96">
    <input bind:value={$searchStore} class="" placeholder="Search..." />
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>      
</div>