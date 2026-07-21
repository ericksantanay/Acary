"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = verificarToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verificarToken(req, res, next) {
    // Pegando o acess Token
    const accessToken = req.cookies.acess_token;
    // Verificando se veio pelo req
    if (!accessToken) {
        return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido." });
    }
    try {
        // Valida o token. Se falhar, o código pula direto para o bloco catch. 
        const { id } = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET ?? '');
        req.userId = id;
        // Next (Proximo)
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
    ;
}
;
