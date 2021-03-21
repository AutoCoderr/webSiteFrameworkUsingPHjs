"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Produit_1 = __importDefault(require("../Models/Produit"));
const Produit_2 = __importDefault(require("../Entities/Produit"));
const RepositoryManager_1 = __importDefault(require("../Core/RepositoryManager"));
class ProduitRepository extends RepositoryManager_1.default {
}
exports.default = ProduitRepository;
ProduitRepository.model = Produit_1.default;
ProduitRepository.entity = Produit_2.default;
