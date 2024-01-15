"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    constructor() {
        this.user = [];
        this.user = this.user;
    }
    createUser({ id, name }) {
        this.user.push({ id, name });
    }
    getUser() {
        return this.user;
    }
}
exports.default = UserManager;
