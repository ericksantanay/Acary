"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/verificarPerfil", auth_1.verificarToken, async (req, res) => {
    const usuario = req.userId;
    const usuarioPerfil = await prisma_1.default.usuario.findUnique({
        where: {
            id: usuario
        }
    });
    if (!usuarioPerfil) {
        return res.status(404).json({ mensagem: "Usuario não existe" });
    }
    ;
    // #######################################
    if (usuarioPerfil.perfil === "Família") {
        return res.status(200).json({ perfil: usuarioPerfil.perfil });
    }
    else if (usuarioPerfil.perfil === "Babá") {
        return res.status(200).json({ perfil: usuarioPerfil.perfil });
    }
    else {
        return res.status(403).json({ mensagem: "Você não tem autorização" });
    }
    ;
});
exports.default = router;
