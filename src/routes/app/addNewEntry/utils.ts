export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export function parseTags(rawTags: string): string {
    const tags = rawTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

    let final: string = "";

    tags.forEach((tag) => {
        final += `"${tag}",`;
    });

    return "[" + final.slice(0, - 1) + "]";
}
