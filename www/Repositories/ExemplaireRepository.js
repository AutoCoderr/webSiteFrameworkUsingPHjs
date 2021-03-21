"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exemplaire_1 = __importDefault(require("../Models/Exemplaire"));
const Exemplaire_2 = __importDefault(require("../Entities/Exemplaire"));
const RepositoryManager_1 = __importDefault(require("../Core/RepositoryManager"));
class ExemplaireRepository extends RepositoryManager_1.default {
}
exports.default = ExemplaireRepository;
ExemplaireRepository.model = Exemplaire_1.default;
ExemplaireRepository.entity = Exemplaire_2.default;
