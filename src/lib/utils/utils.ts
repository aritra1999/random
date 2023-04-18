import type { Item } from "$lib/types/types";

export const SEARCH_THRESHOLD = 1;

const iconMap: Record<string, string> = {
    link: "🔗",
    blog: "📄",
    application: "🔥",
    gist: "📐",
    linkList: "🔗",
    game: "🎮",
    default: "❓",
}

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

export function getIcon(type: string, icon: string | undefined): string {    
    if (icon) {
        return isValidURL(icon) ? `<img src=${icon} alt="❓" class="h-5 w-5"/>` : `<div>${icon}</div>`;
    }
    return  `<div>${iconMap[type] || iconMap['default']}</div>`;
}

export function buildItemList(items: Item[], searchString: string): Item[] {
    if (searchString.length >= SEARCH_THRESHOLD) {
        const searchTerm = searchString.toLocaleLowerCase();
        return items.filter((item: Item) => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.icon?.toLowerCase().includes(searchTerm) || 
            item.description?.toLowerCase().includes(searchTerm) ||
            item.type.includes(searchTerm)
        )
    }
    return items; 
}

export async function sleep (time: number) {
    console.log(`Sleeping for ${time}ms`);
    new Promise(resolve => setTimeout(resolve, time));
}

export function isValidURL(url: string): boolean {
    try { 
        return Boolean(new URL(url)); 
    } catch(e) { 
        return false; 
    }
}