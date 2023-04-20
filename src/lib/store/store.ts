import type { Item } from "$lib/types/types";
import { writable } from "svelte/store";

export const searchStore = writable<string>("");
export const collectionStore = writable<Item[]>([]);