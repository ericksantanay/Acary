"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/carregarServicos", auth_1.verificarToken, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ mensagem: "Usuário não autenticado." });
        }
        ;
        const usuario = await prisma_1.default.usuario.findUnique({
            where: {
                id: req.userId
            }
        });
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuario não existe." });
        }
        ;
        if (usuario.perfil !== "Babá") {
            return res.status(401).json({ mensagem: "Voçê não tem autorização!" });
        }
        ;
        const servicosDisponiveis = await prisma_1.default.postagemFamilia.findMany();
        if (servicosDisponiveis.length === 0) {
            return res.status(404).json({ mensagem: "Nem um serviço encontardo" });
        }
        ;
        const servicosDisponiveisAtualizado = servicosDisponiveis.map((el) => {
            return {
                ...el,
                valor: el.valor / 100
            };
        });
        res.status(200).json(servicosDisponiveisAtualizado);
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor." });
    }
    ;
});
exports.default = router;
