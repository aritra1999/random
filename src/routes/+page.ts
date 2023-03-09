export const load = async ({ fetch}) => {
    const URL = "https://raw.githubusercontent.com/aritra1999/shelf/master/rand0m/collection.json";
    const response = await fetch(URL,{method:'GET'});
    const collection = await response.json();  

    return {
        collection
    }; 
}