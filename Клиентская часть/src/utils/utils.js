export const auth = () => {
    const jwt = JSON.parse(localStorage.getItem("jwt"));

    if (jwt && jwt.accessToken) {
        return {Authorization: "Bearer " + jwt.accessToken};
    } else {
        return {};
    }
}

export const role = () =>{
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt && jwt.roles) {
        return jwt.roles[0];
    } else {
        return null;
    }
}