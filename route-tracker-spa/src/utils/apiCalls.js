const normal = "/api/public";
const authorized = "/api/secure";


export const normalApiCall = async () => {
    return await fetch(normal).then(r => {
        console.log(r.status);
        return r.status
    });
}

export const authorizedApiCall = async (token) => {

    const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);

    let options = {
        // method: method,
        headers: headers,
        // body: data ? JSON.stringify(data) : null,
    };

    return await fetch(authorized, options).then(r => r.status);
}
