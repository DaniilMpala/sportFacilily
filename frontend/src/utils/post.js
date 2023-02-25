export default async (url, body) => {
    let data = await (await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })).json()

    return data
}