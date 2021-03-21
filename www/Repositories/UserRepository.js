"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Models/User"));
const User_2 = __importDefault(require("../Entities/User"));
const RepositoryManager_1 = __importDefault(require("../Core/RepositoryManager"));
const Helpers_1 = __importDefault(require("../Core/Helpers"));
class UserRepository extends RepositoryManager_1.default {
    static findOneByEmailAndPassword(email, password) {
        const _super = Object.create(null, {
            findOneByParams: { get: () => super.findOneByParams }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.findOneByParams.call(this, { where: { email, password: Helpers_1.default.hashPassword(password) } });
        });
    }
}
exports.default = UserRepository;
UserRepository.model = User_1.default;
UserRepository.entity = User_2.default;
