"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntityManager_1 = __importDefault(require("../Core/EntityManager"));
const Produit_1 = __importDefault(require("../Models/Produit"));
class Produit extends EntityManager_1.default {
    constructor() {
        super(...arguments);
        this.ModelInstance = Produit_1.default;
        this.name = null;
        this.description = null;
        this.units = null;
        this.Exemplaires = null;
    }
    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }
    setName(name) {
        this.name = name.trim();
    }
    getName() {
        return this.name;
    }
    setDescription(description) {
        this.description = description.trim();
    }
    getDescription() {
        return this.description;
    }
    setUnits(units) {
        this.units = units;
    }
    getUnits() {
        return this.units;
    }
    getExemplaires() {
        return this.Exemplaires;
    }
}
exports.default = Produit;
