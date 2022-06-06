class Auth {
    constructor() {
        this.authenticated = false;
        this.admin = false;
    }

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    setAdmin() {
        this.admin = true;
    }

    isAdmin() {
        return this.admin;
    }
}

export default new Auth();
