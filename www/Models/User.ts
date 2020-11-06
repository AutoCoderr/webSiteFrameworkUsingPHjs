import Helpers from "../Core/Helpers";
import Model from "../Core/Model";
import Exemplaire from "./Exemplaire";

export default class User extends Model {

    static table = "User";

    id: number = 0;
    email: string = "";
    firstname: string = "";
    lastname: string = "";
    permission: string = "";
    password: string = "";

    exemplaires: Array<typeof Exemplaire> = [];

    setId(id: number) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    setEmail(email: string) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }

    setFirstname(firstname: string) {
        this.firstname = firstname.trim();
    }
    getFirstname() {
        return this.firstname;
    }

    setLastname(lastname: string) {
        this.lastname = lastname.trim();
    }
    getLastname() {
        return this.lastname;
    }

    setPermission(permission: string = "user") {
        if (permission !== "user" && permission !== "seller" && permission !== "admin") {
            permission = "user";
        }
        this.permission = permission;
    }
    getPermission() {
        return this.permission;
    }

    setPassword(password: string) {
        this.password = Helpers.hashPassword(password);
    }
    getPassword() {
        return this.password;
    }

    getExemplaires() {
        return this.exemplaires;
    }

}
