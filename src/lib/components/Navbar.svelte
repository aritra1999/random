<script lang="ts">

	import Search from "./Search.svelte";
  let showSearch = false; 
</script>

<nav class="mb-4 border-[2px] border-slate-100 rounded-lg fixed w-screen {showSearch ? 'bg-transparent text-transparent' : 'backdrop-blur-sm bg-white/50'}">
  <div class="container mx-auto flex items-center justify-between px-2 h-16">
    <a href="/" class="flex items-center ml-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>      
      <span class="self-center whitespace-nowrap text-xl font-extrabold dark:text-white hidden sm:block">
        rand0m
      </span>
    </a>
    <div>
      <Search bind:showSearch/>
    </div>
  </div>
</nav>
