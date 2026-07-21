"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
// Rota para o cadastro
router.post("/cadastroDeUsuarios", async (req, res) => {
    const { nome, email, senha, perfil } = req.body;
    if (!nome || !email || !senha || !perfil) {
        return res
            .status(404)
            .json({ mensagem: "Preencha os campos corretamente e cadastre-se." });
    }
    //
    try {
        // Senha com criptografia
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(senha, salt);
        // Buscando o usuario
        const users = await prisma_1.default.usuario.findUnique({
            where: {
                email: email,
            },
        });
        // Verificação
        if (!users) {
            await prisma_1.default.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: hash,
                    perfil: perfil,
                    role: "cliente",
                },
            });
            return res.status(201).json({ mensagem: "Conta criada com sucesso." });
        }
        else {
            return res.status(409).json({ mensagem: "Usuario ja existe." });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor." });
    }
});
exports.default = router;
