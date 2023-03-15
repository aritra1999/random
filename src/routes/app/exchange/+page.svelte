<script lang="ts">
	import { onMount } from 'svelte';
	import { getCountryCurrencySymbol, getListItemFromCountryLocal, roundOff } from './utils';
	import Loading from '$lib/components/Loading.svelte';

	const desiredCurrencies = ['INR', 'EUR', 'USD', 'JPY', 'CAD', 'GBP', 'AED', 'CHF', 'ZAR'];
	const BASE = 'INR'

	let loading = false; 

	let exchangeRates: Record<string, number> = {};
	let rates: Record<string, number> = {};
	let inputValue: number = 100; 
	let selectedCurrency: string = desiredCurrencies[0];

	onMount(async function () {
		loading = true; 
		const url = `https://v6.exchangerate-api.com/v6/9ef965b573df66e9a4da2d12/latest/${BASE}`;
		const response = await fetch(url);
		exchangeRates = (await response.json()).conversion_rates;
		loading = false; 
		setCurrencyRates();
	});

	function setCurrencyRates() {
		desiredCurrencies.map((desiredCurrency: string) => {
			rates[desiredCurrency] = roundOff(inputValue * (exchangeRates[desiredCurrency] / exchangeRates[selectedCurrency]));
		});
	}	

</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-1">
	<div class="flex items-center justify-between input py-4 border-none rounded-lg">	
		<div class="flex items-center">
			<div class="mr-1">{getCountryCurrencySymbol(selectedCurrency)}</div>
			<input type="number" on:keyup={setCurrencyRates}  bind:value={inputValue} class="border-0 p-0 text-lg font-medium bg-transparent w-24"/>
		</div>
		<select bind:value={selectedCurrency} on:change={setCurrencyRates} id="countries" class="bg-gray-100 border-0 font-medium w-full text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">				
			{#each desiredCurrencies as desiredCurrency}
				<option class="text-right" value="{desiredCurrency}">{getListItemFromCountryLocal(desiredCurrency)}</option>
			{/each}
		</select>		
	</div>
	{#each desiredCurrencies as desiredCurrency}
		{#if desiredCurrency !== selectedCurrency}
			<div class="flex items-center justify-between input border-none">
				<div class="text-md font-medium">
					{#if loading}
						<Loading />
					{:else}
						{new Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: desiredCurrency
						}).format(rates[desiredCurrency])}
					{/if}
					
				</div>
				<div class="p-2 text-sm font-medium text-slate-800">
					{getListItemFromCountryLocal(desiredCurrency)}
				</div>
			</div>	
		{/if}
		
	{/each}
</div>


