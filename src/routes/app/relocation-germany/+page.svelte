<script lang="ts">
    import { Modal } from 'flowbite-svelte'

    import Loading from '../../../components/Loading.svelte';

    import { fetchConvertionRate, fetchTax, parseDeductions } from './calculator';

    let expenseModal = false;
    let deductionsModal = false;
    
    let loading:boolean = false;
    let result: boolean = false; 
    let error: boolean = false;
    let errorMessage: string; 

    const eurFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    const inrFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

    let details = {
        salary: 0,
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

    let salary: number; 
    let taxBreakDown: string; 
    let convertionRate:number = 0; 


    async function calculate() {
        loading = true;
        error = false;
        if(!salary) {
            error = true; 
            errorMessage = 'Please enter salary'
            loading = false; 
            return; 
        }

        convertionRate = await fetchConvertionRate();
        taxBreakDown = await fetchTax(salary);

        details.salary = salary;
        details.afterTax = parseDeductions(taxBreakDown);
        
        result = true; 
        loading = false;
    }
</script>

<div>
    <div class="flex items-center justify-between">
        <h1 class="item-heading">🇩🇪 -> 💶 ??</h1>
        <div class="w-fit submit-button my-2 flex items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>              
            <a href="https://www.arbeitnow.com/tools/salary-calculator/germany" target="_blank" rel="noreferrer">tax calulator</a>
        </div>
    </div>
    <hr>
    {#if error } 
        <div class="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <div>
                <span class="font-medium">{errorMessage}</span>
            </div>
        </div>
    {/if }
    <label for="salary">🇩🇪 salary -  💶/year</label>
    <div class="flex my-2">
        <input type="number" data-type="currency" placeholder="€4.000" bind:value={salary} required/>
        <button class="submit-button" on:click={() => {calculate()}}>
            {#if loading}<Loading />{/if}
            calulate
        </button>
    </div>
    <hr>
    {#if result}
        <div>
            <h1 class="item-heading">result </h1>
            
            <div id="alert-1" class="flex p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <div class="ml-3 text-sm font-medium">
                    convertion rate: <b>  €1 = ₹{convertionRate} </b>
                </div>
            </div>
            <div>
                <div class="flex items-center justify-between">
                    <h1 class="item-heading">
                        🇩🇪  - {eurFormatter.format(details.salary)} 
                    </h1>
                    <h1 class="item-heading">
                        🇮🇳 - {inrFormatter.format(details.salary * convertionRate)}
                    </h1>
                </div>
                <hr>
                <div class="relative overflow-x-auto sm:rounded-lg">
                    <table class="w-full text-sm text-right text-gray-500">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="font-medium text-gray-900 whitespace-nowrap bg-gray-50 text-right">
                                    
                                </th>
                                <th class="font-medium text-gray-900 whitespace-nowrap bg-gray-50 text-right">
                                    🇩🇪 /year
                                </th>
                                <th class="font-medium text-gray-900 whitespace-nowrap bg-gray-50 text-right">
                                    🇮🇳 /year
                                </th>
                                <th class="font-medium text-gray-900 whitespace-nowrap bg-gray-50 text-right">
                                    🇩🇪 /month
                                </th>
                                <th class="font-medium text-gray-900 whitespace-nowrap bg-gray-50 text-right">
                                    🇮🇳 /month
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200 ">
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                                    salary
                                </th>
                                <td>
                                    {eurFormatter.format(details.salary)}
                                </td>
                                <td>
                                    {inrFormatter.format(details.salary*convertionRate)}
                                </td>
                                <td>
                                    {eurFormatter.format(details.salary/12)}
                                </td>
                                <td>
                                    {inrFormatter.format((details.salary*convertionRate)/12)}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-red-50">
                                    tax & insurance deduciton 
                                    <button on:click={() => (deductionsModal = true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" /></svg>
                                    </button>
                                </th>
                                <td >
                                    - {eurFormatter.format(details.salary - details.afterTax)}
                                </td>
                                <td >
                                    - {inrFormatter.format((details.salary - details.afterTax)*convertionRate)}
                                </td>
                                <td >
                                    - {eurFormatter.format((details.salary - details.afterTax)/12)}
                                </td>
                                <td >
                                    - {inrFormatter.format(((details.salary - details.afterTax)*convertionRate)/12)}
                                </td>
                            </tr>
                            <tr class="font-medium border-b border-gray-200">
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-blue-50 ">
                                    after tax
                                </th>
                                <td class="bg-blue-50">
                                    {eurFormatter.format(details.afterTax)}
                                </td>
                                <td class="bg-blue-50">
                                    {inrFormatter.format(details.afterTax*convertionRate)}
                                </td>
                                <td class="bg-blue-50">
                                    {eurFormatter.format(details.afterTax/12)}
                                </td>
                                <td class="bg-blue-50">
                                    {inrFormatter.format((details.afterTax*convertionRate)/12)}
                                </td>
                            </tr>
                            <tr class="border-b border-gray-200">
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-rose-50 ">
                                    expenses
                                    <button on:click={() => (expenseModal = true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/></svg>
                                    </button>
                                </th>
                                <td>
                                    - {eurFormatter.format(details.expenses.total)}
                                </td>
                                <td>
                                    - {inrFormatter.format(details.expenses.total*convertionRate)}
                                </td>
                                <td>
                                    - {eurFormatter.format(details.expenses.total/12)}
                                </td>
                                <td>
                                    - {inrFormatter.format((details.expenses.total*convertionRate)/12)}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="font-medium text-gray-900 whitespace-nowrap bg-green-100 ">
                                    balance
                                </th>
                                <td>
                                    {eurFormatter.format(details.afterTax - details.expenses.total)}
                                </td>
                                <td>
                                    {inrFormatter.format((details.afterTax - details.expenses.total)*convertionRate)}
                                </td>
                                <td>
                                    {eurFormatter.format((details.afterTax - details.expenses.total)/12)}
                                </td>
                                <td>
                                    {inrFormatter.format(((details.afterTax - details.expenses.total)*convertionRate)/12)}
                                </td>
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
                <th></th>
                <th>🇩🇪 /year</th>
                <th>🇮🇳 /year</th>
                <th>🇩🇪 /month</th>
                <th>🇮🇳 /month</th>
            </thead>
            <tbody class="text-right">
                <tr>
                    <th> Rent </th> 
                    <td> {eurFormatter.format(details.expenses.rent)} </td>
                    <td> {inrFormatter.format(details.expenses.rent*convertionRate)} </td>
                    <td> {eurFormatter.format(details.expenses.rent/12)} </td>
                    <td> {inrFormatter.format((details.expenses.rent*convertionRate)/12)} </td>
                </tr>
                <tr class="bg-gray-50">
                    <th> Groceries </th> 
                    <td> {eurFormatter.format(details.expenses.groceries)} </td>
                    <td> {inrFormatter.format(details.expenses.groceries*convertionRate)} </td>
                    <td> {eurFormatter.format(details.expenses.groceries/12)} </td>
                    <td> {inrFormatter.format((details.expenses.groceries*convertionRate)/12)} </td>
                </tr>
                <tr>
                    <th> Electricity </th> 
                    <td> {eurFormatter.format(details.expenses.electricity)} </td>
                    <td> {inrFormatter.format(details.expenses.electricity*convertionRate)} </td>
                    <td> {eurFormatter.format(details.expenses.electricity/12)} </td>
                    <td> {inrFormatter.format((details.expenses.electricity*convertionRate)/12)} </td>
                </tr>
                <tr class="bg-gray-50">
                    <th> Internet </th> 
                    <td> {eurFormatter.format(details.expenses.internet)} </td>
                    <td> {inrFormatter.format(details.expenses.internet*convertionRate)} </td>
                    <td> {eurFormatter.format(details.expenses.internet/12)} </td>
                    <td> {inrFormatter.format((details.expenses.internet*convertionRate)/12)} </td>
                </tr>
                <tr>
                    <th> Mobile </th> 
                    <td> {eurFormatter.format(details.expenses.mobile)} </td>
                    <td> {inrFormatter.format(details.expenses.mobile*convertionRate)} </td>
                    <td> {eurFormatter.format(details.expenses.mobile/12)} </td>
                    <td> {inrFormatter.format((details.expenses.mobile*convertionRate)/12)} </td>
                </tr>
                <tr class="bg-gray-50">
                    <th> Misc </th> 
                    <td> {eurFormatter.format(details.expenses.miscellaneous)} </td>
                    <td> {inrFormatter.format(details.expenses.miscellaneous*convertionRate)} </td>
                    <td> {eurFormatter.format(details.expenses.miscellaneous/12)} </td>
                    <td> {inrFormatter.format((details.expenses.miscellaneous*convertionRate)/12)} </td>
                </tr>
            </tbody>
        </table>
    </div>
</Modal>