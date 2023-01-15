<script lang="ts">
	import type { Item } from "../types";
 
    export let item: Item;
</script> 


<a href="/app{item.path}" class="flex items-center justify-between px-6 py-3 rounded-lg font-semibold border-[3px] border-slate-100 hover:border-blue-600 group m-2">
    <div>{item.title}</div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-slate-300 group-hover:text-blue-600">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>  
</a>


