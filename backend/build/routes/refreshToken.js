"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.default)();
/*Eu terei que fazer uma condição no meu fetch, eu deixarei esse fetch dentro do fetch de alguma req, porque ai a cada req do usuario o refresh ira gerar sozinho!*/
router.post("/refreshToken", (req, res) => {
    const refresh = req.cookies.refresh_token;
    if (!refresh) {
        return res.status(401).json({ mensagem: "Acesso negado. Token não fornecido." });
    }
    ;
    try {
        // Verificando o refresh
        const refreshTokenVerificando = jsonwebtoken_1.default.verify(refresh, process.env.REFRESH_SECRET ?? '');
        // Criando um novo token
        const token = jsonwebtoken_1.default.sign({ id: refreshTokenVerificando.id }, process.env.JWT_SECRET ?? '', { expiresIn: '10m' });
        // Cookie config
        const cookie1Config = {
            maxAge: 10 * 60 * 1000, // 10 minutos
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: false, // Quando for para producao deixar true!
            sameSite: 'strict' // Protege contra ataques CSRF
        };
        // Criando um Novo access token!
        res.cookie('acess_token', token, cookie1Config);
        // Retornando sucesso!
        return res.status(200).json({ mensagem: "Refresh feito com sucesso" });
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
});
exports.default = router;
