export function generateSlug(title: string): string {
    return title.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
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
