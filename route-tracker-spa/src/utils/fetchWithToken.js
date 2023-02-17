const fetchWithToken = async (accessToken, method, endpoint, data = null) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;
    headers.append("Authorization", bearer);

    if (data) headers.append('Content-Type', 'application/json');

    let options = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
    };

    return await fetch(`api/${endpoint}`, options).then(r => r.json())
}

export default fetchWithToken;