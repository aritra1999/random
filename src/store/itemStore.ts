import { writable } from 'svelte/store'
import Default from '../items/default.svelte';

const component = writable(Default);


export default component;