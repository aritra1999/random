import type { Item } from "$lib/types/types";

export const SEARCH_THRESHOLD = 1;

export function getLocation(type: string, path: string): string {
    const locationMap: Record<string, string> = {
        link: path,
        blog: `/blog/${encodeURIComponent(path)}`,
        application: `/app/${path}`,
        game: `/app/${path}`,
    }

    return locationMap[type] || "";
}

export function getIcon(type: string): string {    
    const iconMap: Record<string, string> = {
        link: "🔗",
        blog: "📄",
        application: "🔥",
        gist: "📐",
        game: "🎮",
        default: "❓",
    }

    return iconMap[type] || iconMap.default;
}

export function buildItemList(items: Item[], searchString: string): Item[] {
    if (searchString.length >= SEARCH_THRESHOLD) {
        return items.filter((item: Item) => isItemMatch(item, searchString))
    }
    return items; 
}

export function isItemMatch(item: Item, searchTerm: string): boolean | undefined {
    return (item.title.toLowerCase().includes(searchTerm) || 
        item.icon?.toLowerCase().includes(searchTerm) || 
        item.description?.toLowerCase().includes(searchTerm) ||
        item.tags?.join().toLowerCase().includes(searchTerm));
}

export async function sleep (time: number) {
    console.log(`Sleeping for ${time}ms`);
    new Promise(resolve => setTimeout(resolve, time));
}