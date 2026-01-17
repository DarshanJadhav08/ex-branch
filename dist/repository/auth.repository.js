"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const authUser_model_1 = require("../model/authUser.model");
class AuthRepository {
    static createUser(data) {
        return authUser_model_1.AuthUser.create(data);
    }
    static findByName(first_name, last_name) {
        return authUser_model_1.AuthUser.findOne({ where: { first_name, last_name } });
    }
}
exports.AuthRepository = AuthRepository;
