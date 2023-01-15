<script> 
    import collection from '../collection.json';
    import Links from '../groups/Links.svelte';
    import Calculators from '../groups/Calculators.svelte';
    import Games from '../groups/Games.svelte';
    
    const links = collection.links;
    const games = collection.games; 
    const calculators = collection.calculators; 
    
</script>

<Calculators calculators={calculators} />
<Links links={links} />
<Games games={games} />