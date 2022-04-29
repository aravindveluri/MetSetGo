class TokenService {
    getLocalRefreshToken() {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        return authTokens?.refresh;
    }
    getLocalAccessToken() {
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        return authTokens?.access;
    }
    updateLocalAccessToken(token) {
        let authTokens = JSON.parse(localStorage.getItem("authTokens"));
        authTokens.access = token;
        localStorage.setItem("authTokens", JSON.stringify(authTokens));
    }
    getAuthTokens() {
        return JSON.parse(localStorage.getItem("authTokens"));
    }
    setAuthTokens(authTokens) {
        console.log(JSON.stringify(authTokens));
        localStorage.setItem("authTokens", JSON.stringify(authTokens));
    }
    removeAuthToken() {
        localStorage.removeItem("authTokens");
    }
}

export default new TokenService();