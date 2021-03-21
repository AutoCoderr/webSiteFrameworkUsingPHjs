"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = __importDefault(require("../Core/Helpers"));
const EntityManager_1 = __importDefault(require("../Core/EntityManager"));
const User_1 = __importDefault(require("../Models/User"));
class User extends EntityManager_1.default {
    constructor() {
        super(...arguments);
        this.ModelInstance = User_1.default;
        this.email = null;
        this.firstname = null;
        this.lastname = null;
        this.permission = null;
        this.password = null;
        this.Exemplaires = null;
    }
    setEmail(email) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }
    setFirstname(firstname) {
        this.firstname = firstname.trim();
    }
    getFirstname() {
        return this.firstname;
    }
    setLastname(lastname) {
        this.lastname = lastname.trim();
    }
    getLastname() {
        return this.lastname;
    }
    setPermission(permission = "user") {
        if (permission !== "user" && permission !== "seller" && permission !== "admin") {
            permission = "user";
        }
        this.permission = permission;
    }
    getPermission() {
        return this.permission;
    }
    setPassword(password) {
        this.password = Helpers_1.default.hashPassword(password);
    }
    getPassword() {
        return this.password;
    }
    getExemplaires() {
        return this.Exemplaires;
    }
}
exports.default = User;
