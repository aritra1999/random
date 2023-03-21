export function generateSlug(title: string): string {
    return title.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
}

export function parseTags(rawTags: string): string[] {
    const tags = rawTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    return tags;
    // let final: string = "";

    // tags.forEach((tag) => {
    //     final += `"${tag}",`;
    // });

    // return "[" + final.slice(0, - 1) + "]";
}

export function generateUUID(): string {
    let d = new Date().getTime(), d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }

        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
  };
  
