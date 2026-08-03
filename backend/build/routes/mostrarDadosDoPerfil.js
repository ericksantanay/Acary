"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/mostrarDadosDoPerfil", auth_1.verificarToken, async (req, res) => {
    const usuario = req.userId;
    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuario não existe." });
    }
    ;
    try {
        const usuarioListagemDoPerfil = await prisma_1.default.usuario.findUnique({
            where: {
                id: usuario
            },
            select: {
                nome: true,
                email: true,
                perfil: true
            }
        });
        if (!usuarioListagemDoPerfil) {
            return res.status(404).json({ mensagem: "Usuario não existe" });
        }
        ;
        return res.status(200).json(usuarioListagemDoPerfil);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
    ;
});
exports.default = router;
