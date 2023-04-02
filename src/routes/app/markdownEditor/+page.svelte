<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
    import controls from './controls.json';
    let input = "";


    function execute(control: { type: string; icon: string; content: string; }) {
        const editor = document.getElementById("editor") as HTMLInputElement;
        
        const startPosition = editor.selectionStart ?? 0;
        const endPosition = editor.selectionEnd ?? 0;

        input = input.slice(0, startPosition) + '\n' + control.content + input.slice(endPosition);
        editor.focus();    
    }

</script>
<div class="flex w-full h-full">
    <div class="w-1/2 h-[calc(100vh-10rem)] border-r border-slate-200">
        <div class="flex divider-2 divider-slate-200">
            {#each controls as control}
                <button class="p-2 font-extralight" on:click={() => execute(control)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" stroke-width="0.5" stroke="currentColor" class="w-4 h-4">
                        {@html control.icon}
                    </svg>                      
                </button>
            {/each}
        </div>
        <textarea bind:value={input} id="editor" class="border-0 resize-none px-4 py-2 h-full w-full"></textarea>
    </div>
    <div class="w-1/2 h-[calc(100vh-10rem)] px-4 py-2 prose prose-md">
        <SvelteMarkdown source={input} />
    </div>
</div>