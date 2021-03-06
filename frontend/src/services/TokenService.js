import jwtDecode from "jwt-decode";

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
        
        localStorage.setItem("authTokens", JSON.stringify(authTokens));
    }
    removeAuthTokens() {
        localStorage.removeItem("authTokens");
    }
    getUser () {
        const access = this.getLocalAccessToken()
        return jwtDecode(access)
    }
}

export default new TokenService();