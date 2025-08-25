<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	let { data }: { data: PageData } = $props();
</script>

<div class="prose prose-lg mx-auto">
	<SvelteMarkdown source={data.content} />
</div>
