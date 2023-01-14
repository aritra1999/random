<script lang="ts"> 
    import { sineIn } from 'svelte/easing';
    import { Drawer, Button, CloseButton, A } from 'flowbite-svelte'
    
    import hidden from '../store/hiddenStore';
    import component from '../store/itemStore';

    export let item; 

    async function triggerComponent() {
        $hidden = false;
        $component = (await import(`../items/${item.componentFile}`)).default;
    }
</script> 


<div on:click={() => triggerComponent()} on:click={() => {$hidden=false}} class="flex items-center justify-between px-6 py-3 m-2 rounded-lg font-semibold border-[3px] border-slate-100 hover:border-blue-600 group">
    <div>{item.title}</div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-300 group-hover:text-blue-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>  
</div>


