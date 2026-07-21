"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarRole = verificarRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
async function verificarRole(req, res, next) {
    const accessTokenJwt = req.cookies.acess_token;
    if (!accessTokenJwt) {
        return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido." });
    }
    ;
    try {
        // Verificando o jwt
        const { id } = jsonwebtoken_1.default.verify(accessTokenJwt, process.env.JWT_SECRET ?? '');
        // Buscando o user pelo id
        const user = await prisma_1.default.usuario.findUnique({
            where: {
                id: id
            }
        });
        // Verificando se esse usuario existe
        if (!user) {
            return res.status(404).json({ mensagem: "Usuario não existe" });
        }
        ;
        // Verificando o role
        if (user.role !== "admin") {
            return res.status(403).json({ mensagem: "Voce não tem permissão." });
        }
        ;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
    ;
}
;
