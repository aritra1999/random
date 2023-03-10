<script lang="ts">
    import { Modal } from 'flowbite-svelte'

    import Loading from "$lib/components/Loading.svelte";

    import { eurFormatter, fetchConversionRate, fetchTax, inrFormatter, parseDeductions } from './utils';
	import TableRow from './TableRow.svelte';

    let expenseModal = false;
    let deductionsModal = false;
    let loading:boolean = false;
    let result: boolean = false; 
    let error: boolean = false;
    let errorMessage: string; 
    
    let details = {
        salary: null,
        afterTax: 0,
        expenses: {
            total: 18000,
            rent: 8400,
            groceries: 3600,
            electricity: 840,
            mobile: 180,
            internet: 480,
            miscellaneous: 4500
        }
    }

    let taxBreakDown: string; 
    let conversionRate:number = 0; 
    const tableHeaders = ["", "🇩🇪 /year", "🇩🇪 /month", "🇮🇳 /year", "🇮🇳 /month"]

    async function calculate() {
        loading = true;
        error = false;

        if(!details.salary) {
            error = true; 
            errorMessage = 'Please enter salary'
            loading = false; 
            return; 
        }

        conversionRate = await fetchConversionRate();
        taxBreakDown = await fetchTax(details.salary);
        details.afterTax = parseDeductions(taxBreakDown);
        
        result = true; 
        loading = false;
    }
</script>

<div>
    <div class="flex items-center justify-between">
        <h1 class="item-heading">🇩🇪 - 💶 ??</h1>
        <div class="w-fit submit-button my-2 flex items-center space-x-4">
            <div> 🇩🇪</div>
            <a href="https://www.arbeitnow.com/tools/salary-calculator/germany" target="_blank" rel="noreferrer"> tax calculator</a>
        </div>
    </div>
    <hr>
    {#if error } 
        <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div class="font-medium">{errorMessage}</div>
        </div>
    {/if }
    <div class="flex my-2 space-x-2">
        <div class="flex items-center justify-between input w-52">
            <div>€</div>     
            <div>
                <input class="w-24 bg-transparent border-none p-0" type="number" data-type="currency" placeholder="100.000" bind:value={details.salary} required/>
            </div>
            <div class="mb-0.5">/year</div>
        </div>
        <button class="submit-button" on:click={() => {calculate()}}>
            {#if loading}<Loading />{/if} calculate
        </button>
    </div>
    <hr>
    {#if result && details.salary}
        <div>
            <h1 class="item-heading">result </h1>
            <div id="alert-1" class="flex p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg dark:bg-gray-800 dark:text-blue-400" role="alert">                
                <span class="sr-only">
                    Info
                </span>
                <div class="ml-3 text-sm font-medium">
                    <div class="item-heading flex items-center">
                        <svg aria-hidden="true" class="flex-shrink-0 mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                         conversion rate: <b>  €1 = ₹{conversionRate} </b> 
                    </div>
                    <div> 🇩🇪  - {eurFormatter.format(details.salary)} </div>
                    <div> 🇮🇳 - {inrFormatter.format(details.salary * conversionRate)} </div>
                </div>
            </div>
            <div>
                <div class="relative overflow-x-auto sm:rounded-lg">
                    <table class="w-full text-sm text-right text-gray-500">
                        <thead>
                            <tr class="border-b border-gray-200">
                                {#each tableHeaders as header}
                                    <th class="font-medium text-gray-900 whitespace-nowrap bg-gray-50 text-right">{header}</th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200 ">
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                                    salary
                                </th>
                                <TableRow baseValue={details.salary} conversionRate={conversionRate}/>
                            </tr>
                            <tr>
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-red-50">
                                    tax & insurance deductions
                                    <button on:click={() => (deductionsModal = true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
                                    </button>
                                </th>
                                <TableRow baseValue={details.salary - details.afterTax} conversionRate={conversionRate} isNegative={true}/>
                            </tr>
                            <tr class="font-medium border-b border-gray-200">
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-blue-50 ">
                                    after tax
                                </th>
                                <TableRow baseValue={details.afterTax} conversionRate={conversionRate} bgColor={"bg-blue-50"}/>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-rose-50 ">
                                    expenses
                                    <button on:click={() => (expenseModal = true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/></svg>
                                    </button>
                                </th>
                                <TableRow baseValue={details.expenses.total} conversionRate={conversionRate} isNegative={true}/>
                            </tr>
                            <tr>
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-green-100 ">
                                    balance
                                </th>
                                <TableRow baseValue={details.afterTax - details.expenses.total} conversionRate={conversionRate}/>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    {/if}
</div>

<Modal title="deductions details" bind:open={deductionsModal} placement="top-center" autoclose>
    <div class="p-3 space-y-2">
        {@html taxBreakDown}
    </div>
</Modal>
<Modal title="expense breakdown" bind:open={expenseModal} placement="top-center" autoclose>
    <div class="p-3 space-y-2">
        <table>
            <thead class="bg-gray-50">
                {#each tableHeaders as header}
                    <th>{header}</th>
                {/each}
            </thead>
            <tbody class="text-right">
                {#each Object.entries(details.expenses) as [key, value]}
                    <tr class="bg-gray-50">
                        <th>{key}</th>
                        <TableRow baseValue={value} conversionRate={conversionRate}/>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</Modal>