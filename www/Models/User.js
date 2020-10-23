const app = require("./../autoloader");

const Helpers = app.Core.Helpers,
    Model = app.Core.Model;

module.exports =
class User extends Model {

    static table = "User";

    id = null;
    email = null;
    firstname = null;
    lastname = null;
    permission = null;
    password = null;

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
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
        this.password = Helpers.hashPassword(password);
    }
    getPassword() {
        return this.password;
    }

}