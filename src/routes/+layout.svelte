<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
	import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar />
<div class="container py-4 px-2 mx-auto">
    <slot />
</div> 
<Footer />
