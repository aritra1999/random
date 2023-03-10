<script lang="ts">
	import { eurFormatter, inrFormatter } from "./utils";

    export let baseValue: number; 
    export let conversionRate: number; 
    export let bgColor: string = "bg-transparent"; 
    export let isNegative: boolean = false; 

</script>

<td class="{bgColor}">
    {#if isNegative }- {/if}{eurFormatter.format(baseValue)}
</td>
<td class={bgColor}>
    {#if isNegative }- {/if}{eurFormatter.format(baseValue/12)}
</td>
<td class={bgColor}>
    {#if isNegative }- {/if}{inrFormatter.format(baseValue*conversionRate)}
</td>
<td class={bgColor}>
    {#if isNegative }- {/if}{inrFormatter.format((baseValue*conversionRate)/12)}
</td>