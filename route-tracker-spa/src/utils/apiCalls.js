const normal = "/api/public";
const newUser = "api/new-user";


export const normalApiCall = async () => {
    return await fetch(normal).then(r => {
        console.log(r.status);
        return r.status
    });
}

export const registerNewUser = (token) => {

    const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);

    let options = {
        method: "POST",
        headers: headers,
    };

    return fetch(newUser, options);
}
