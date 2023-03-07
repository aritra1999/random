<script lang="ts">
	import type { PageData } from "./$types";
    import SvelteMarkdown from 'svelte-markdown'

    export let data: PageData; 
</script>

<div class="prose prose-lg mx-auto">
    <SvelteMarkdown  source={data.props.content} />
</div>

