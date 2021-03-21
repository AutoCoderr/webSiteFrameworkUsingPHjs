"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produit_1 = __importDefault(require("./Produit"));
const User_1 = __importDefault(require("./User"));
const EntityManager_1 = __importDefault(require("../Core/EntityManager"));
const Exemplaire_1 = __importDefault(require("../Models/Exemplaire"));
class Exemplaire extends EntityManager_1.default {
    constructor() {
        super(...arguments);
        this.ModelInstance = Exemplaire_1.default;
        this.units = null;
        this.User = null;
        this.Produit = null;
        this.UserId = null;
        this.ProduitId = null;
    }
    setUnits(units) {
        this.units = units;
    }
    getUnits() {
        return this.units;
    }
    setUser(user) {
        this.User = user;
        this.UserId = user.getId();
    }
    getUser() {
        if (!(this.User instanceof User_1.default) && this.User != null) {
            this.User = (new User_1.default()).hydrate(this.User);
        }
        return this.User;
    }
    setProduit(produit) {
        this.Produit = produit;
        this.ProduitId = produit.getId();
    }
    getProduit() {
        if (!(this.Produit instanceof Produit_1.default) && this.Produit != null) {
            this.Produit = (new Produit_1.default()).hydrate(this.Produit);
        }
        return this.Produit;
    }
}
exports.default = Exemplaire;
User_1.default.prototype.getExemplaires = Produit_1.default.prototype.getExemplaires = function () {
    if (this.Exemplaires instanceof Array) {
        for (let i = 0; i < this.Exemplaires.length; i++) {
            if (!(this.Exemplaires[i] instanceof Exemplaire)) {
                this.Exemplaires[i] = (new Exemplaire()).hydrate(this.Exemplaires[i]);
            }
        }
    }
    return this.Exemplaires;
};
