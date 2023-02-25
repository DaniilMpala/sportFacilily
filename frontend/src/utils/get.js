export default async (url, paramsUrl) => {
    const params = Object.entries(paramsUrl).map(([key, value]) => `${key}=${value}`).join('&');
    
    
    let data = await (await fetch(`${url}/?${params}`, {
        method: "get",
        headers: { "Content-Type": "application/json" },
    })).json()

    return data
}