export async function load ({ params, fetch }) {

    const URL = `https://raw.githubusercontent.com/aritra1999/blogs/master/${params.slug}/README.md`
    const response = await fetch(URL,{ method:'GET' });
    return {
        props: {
            slug: params.slug,
            content: await response.text()
        }
    }
}