<script lang="ts">
    import { page } from '$app/stores';
    import { searchStore } from '$lib/store/searchStore';
</script>  
<nav class="flex items-center justify-between pb-4 px-2 border-b border-slate-100 h-16 mb-6">
  <a href="/" class="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>      
    <span class="self-center whitespace-nowrap text-xl font-extrabold dark:text-white hidden sm:block">
      rand0m
    </span>
  </a>
  {#if $page.url.pathname === '/'}
    <div class="flex md:order-2">
      <input bind:value={$searchStore} id="search-navbar" class="pl-10 input" placeholder="Search..." />
    </div>
  {/if}
</nav>
