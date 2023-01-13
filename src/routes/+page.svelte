<script> 
    import collection from '../collection.json';
    import hidden from '../store/hiddenStore';
    import component from '../store/itemStore';

    import { sineIn } from 'svelte/easing';
    import { Drawer, Button, CloseButton, A } from 'flowbite-svelte'

    
    import Links from '../groups/Links.svelte';
    import Calculators from '../groups/Calculators.svelte';
    import Games from '../groups/Games.svelte';
    
    const links = collection.links;
    const games = collection.games; 
    const calculators = collection.calculators; 
    
    let transitionParamsBottom = {
        y: 320,
        duration: 200,
        easing: sineIn
    };
    
</script>

<Calculators calculators={calculators} />
<Links links={links} />
<Games games={games} />
<Drawer placement='bottom' width='w-full' transitionType="fly" transitionParams={transitionParamsBottom} bind:hidden={$hidden} id='sidebar8'>
    <div class='flex items-center'>
        <h5 id="drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">Explore</h5>
        <CloseButton on:click={() => ($hidden = true)} class='mb-4 dark:text-white'/>
    </div>
    <p class="max-w-lg mb-6 text-sm text-gray-500 dark:text-gray-400">
        <svelte:component this={$component} />
    </p>
</Drawer>