<script lang="ts">
	import type { PageData } from "./$types";
	import { generateSlug, generateUUID, parseTags } from "./utils";
    import { JSONEditor } from 'svelte-jsoneditor'

    export let data: PageData; 
    
    let title: string = ""; 
    let description: string = "";
    let tags: string = "";
    
    let content = {
        json: data.collection   
    };

    const id = generateUUID();
    const entryIndex = data.collection.length;

    $: content.json[entryIndex] = {
        "id": id,
        "title": title,
        "description": description, 
        "tags": parseTags(tags), 
        "path": generateSlug(title),
        "type": "blog"
    };
    
    const copy = () => {
        const json = JSON.stringify(content.json, null, 2);
        navigator.clipboard.writeText(json);
        alert(`Copied to clipboard ${json}`)
	}

</script>

<div>
    <h2 class="item-heading">add new entry</h2>
    <div class="p-2">
        <div class="flex items-center justify-between">
            <div class="font-semibold">collection.json</div>
            <button on:click={copy} class="px-2 py-0.5 rounded-md bg-blue-600 text-white hover:bg-blue-800 flex items-center font-medium text-sm">
                copy
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>                          
            </button>
        </div>
        <div class="h-full mb-2 w-full break-all">
            <JSONEditor bind:content />
        </div>
        <div class="flex justify-end">
            Modify <a href="https://github.com/aritra1999/store/edit/master/rand0m/collection.json" target="_blank" rel="noreferrer" class="underline">collection.json</a>
        </div>
    </div>
</div>
