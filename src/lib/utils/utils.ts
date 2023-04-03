import type { Item } from "$lib/types/types";

export const SEARCH_THRESHOLD = 1;

export function getLocation(type: string, path: string): string {    
    const locationMap: Record<string, string> = {
        link: path,
        blog: `/blog/${encodeURIComponent(path)}`,
        application: `/app/${path}`,
        game: `/app/${path}`,
        default: "",
    }

    return locationMap[type] || locationMap['default'];
}

export function getIcon(type: string): string {    
    const iconMap: Record<string, string> = {
        link: "🔗",
        blog: "📄",
        application: "🔥",
        gist: "📐",
        linkList: "🔗",
        game: "🎮",
        default: "❓",
    }

    return iconMap[type] || iconMap['default'];
}

export function buildItemList(items: Item[], searchString: string): Item[] {
    if (searchString.length >= SEARCH_THRESHOLD) {
        const searchTerm = searchString.toLocaleLowerCase();
        return items.filter((item: Item) => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.icon?.toLowerCase().includes(searchTerm) || 
            item.description?.toLowerCase().includes(searchTerm) ||
            item.tags?.join().toLowerCase().includes(searchTerm)
        ) 
    }

    return items; 
}

export async function sleep (time: number) {
    console.log(`Sleeping for ${time}ms`);
    new Promise(resolve => setTimeout(resolve, time));
}