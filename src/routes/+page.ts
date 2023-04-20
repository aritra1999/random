import { collectionStore } from "$lib/store/store";
import { fetchCollection } from "$lib/utils/utils";


export const load = async () => {
    const collection = await fetchCollection();  
    collectionStore.set(collection);
}
