"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const route_errors_1 = require("@src/common/util/route-errors");
const HttpStatusCodes_1 = __importDefault(require("@src/common/constants/HttpStatusCodes"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async login(email, password) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.UNAUTHORIZED, 'Invalid email or password');
        }
        const [credential] = user.Credential;
        if (!credential) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.UNAUTHORIZED, 'User has no credentials');
        }
        const isValid = await bcrypt_1.default.compare(password, credential.passwordHash);
        if (!isValid) {
            throw new route_errors_1.RouteError(HttpStatusCodes_1.default.UNAUTHORIZED, 'Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role.name,
        }, "Tefis", { expiresIn: '1d' });
        return { token };
    }
}
exports.AuthService = AuthService;
