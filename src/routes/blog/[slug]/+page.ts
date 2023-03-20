export async function load ({ params, fetch }) {
    const URL = `https://raw.githubusercontent.com/${decodeURIComponent(params.slug)}`;
    const response = await fetch(URL,{ method:'GET' });
    return {
        content: await response.text()
    }
}