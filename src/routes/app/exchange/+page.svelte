<script lang="ts">
	import { onMount } from 'svelte';
	import { getCountryCurrencySymbol, getListItemFromCountryLocal, roundOff } from './utils';

	const desiredCurrencies = ['INR', 'EUR', 'USD', 'JPY', 'CAD', 'GBP'];
	const BASE = 'INR'

	let exchangeRates: Record<string, number> = {};
	let rates: Record<string, number> = {};
	let inputValue: number = 100; 
	let selectedCurrency: string = desiredCurrencies[0];

	onMount(async function () {
		const url = `https://v6.exchangerate-api.com/v6/9ef965b573df66e9a4da2d12/latest/${BASE}`;
		const response = await fetch(url);
		exchangeRates = (await response.json()).conversion_rates;
		// exchangeRates = {
		// 	"INR": 1,
		// 	"EUR": 0.013,
		// 	"USD": 0.014,
		// 	"JPY": 1.54,
		// 	"CAD": 0.018,
		// 	"GBP": 0.011
		// }
		setCurrencyRates();
	});

	function setCurrencyRates() {
		desiredCurrencies.map((desiredCurrency: string) => {
			rates[desiredCurrency] = roundOff(inputValue * (exchangeRates[desiredCurrency] / exchangeRates[selectedCurrency]));
		});
	}	

</script>

<div class="grid sm:grid-cols-3 grid-cols-1 gap-4">
	<div class="p-4 border-[3px] border-slate-100 rounded-lg">
		<div class="mb-2">
			<select bind:value={selectedCurrency} on:change={setCurrencyRates} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
				{#each desiredCurrencies as desiredCurrency}
					<option value="{desiredCurrency}">{getListItemFromCountryLocal(desiredCurrency)}</option>
				{/each}
			</select>
		</div>
		<div class="flex items-center input">
			<div >
				{getCountryCurrencySymbol(selectedCurrency)}
			</div>
			<input type="number" on:keyup={setCurrencyRates}  bind:value={inputValue} class="w-full"/>
		</div>
	</div>
	{#each desiredCurrencies as desiredCurrency}
		<div class="p-4 border-[3px] border-slate-100 rounded-lg">
			<div class="p-2 text-lg font-semibold text-slate-800">
				{getListItemFromCountryLocal(desiredCurrency)}
			</div>
			<div class="input">
				<div>
					{new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: desiredCurrency
					  }).format(rates[desiredCurrency])}
				</div>
			</div>
		</div>
	{/each}
</div>


