<script lang="ts">
	import { eurFormatter, inrFormatter } from './utils';

	let {
		baseValue,
		conversionRate,
		bgColor = 'bg-transparent',
		isNegative = false
	}: {
		baseValue: number;
		conversionRate: number;
		bgColor?: string;
		isNegative?: boolean;
	} = $props();
</script>

<td class={bgColor}>
	{#if isNegative}-
	{/if}{eurFormatter.format(baseValue)}
</td>
<td class={bgColor}>
	{#if isNegative}-
	{/if}{eurFormatter.format(baseValue / 12)}
</td>
<td class={bgColor}>
	{#if isNegative}-
	{/if}{inrFormatter.format(baseValue * conversionRate)}
</td>
<td class={bgColor}>
	{#if isNegative}-
	{/if}{inrFormatter.format((baseValue * conversionRate) / 12)}
</td>
