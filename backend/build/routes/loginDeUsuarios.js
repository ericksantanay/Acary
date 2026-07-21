"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.default)();
router.post("/loginUsuario", async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(404).json({ mensagem: "Faça o login corretamente." });
    }
    ;
    try {
        // Usuario
        const user = await prisma_1.default.usuario.findUnique({
            where: {
                email: email
            }
        });
        // Validação se o usuario existe
        if (!user) {
            return res.status(404).json({ mensagem: "Usuário ou senha incorretos" });
        }
        ;
        const password = await bcrypt_1.default.compare(senha, user.senha);
        // Verificando se a senha esta correta;
        if (!password) {
            return res.status(404).json({ mensagem: "Usuário ou senha incorretos" });
        }
        // Opções dos cookie
        const cookie1Config = {
            maxAge: 10 * 60 * 1000, // 10 minutos
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: false, // Quando for para producao deixar true!
            sameSite: 'strict' // Protege contra ataques CSRF
        };
        const cookie2Config = {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
            httpOnly: true, //JavaScript não pode acessar esse cookie
            secure: false, // Quando for para producao deixar true!
            sameSite: 'strict' // Protege contra ataques CSRF
        };
        // Criando o Token
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET ?? "", { expiresIn: "10m" });
        const refresh = jsonwebtoken_1.default.sign({ id: user.id }, process.env.REFRESH_SECRET ?? "", { expiresIn: "7d" });
        res.cookie('acess_token', token, cookie1Config);
        res.cookie('refresh_token', refresh, cookie2Config);
        return res.status(200).json({ mensagem: "Login efetuado com sucesso" });
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
    ;
});
exports.default = router;
