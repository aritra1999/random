import type { PageServerLoad } from "./$types";


export const load = async ({ }) => {

    const URL = "https://raw.githubusercontent.com/aritra1999/store/master/rand0m/collection.json";
    const response = await fetch(URL,{
                        method:'GET',
                        headers:{ 'Content-Type':'application/json', 'Accept':'application/json'},
                    });
    const collection = await response.json();
    return {
        items: collection
    }; 
}