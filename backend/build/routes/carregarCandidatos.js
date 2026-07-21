"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/carregarCandidatura/:id", auth_1.verificarToken, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ mensagem: "Usuário não autenticado." });
        }
        const postagem = await prisma_1.default.postagemFamilia.findFirst({
            where: {
                id: req.params.id,
                userId: req.userId
            }
        });
        if (!postagem) {
            return res.status(404).json({
                mensagem: "Postagem não encontrada ou não pertence ao usuário."
            });
        }
        const listagem = await prisma_1.default.candidatura.findMany({
            where: {
                postagemId: req.params.id
            },
            include: {
                usuario: {
                    select: {
                        nome: true
                    }
                }
            }
        });
        if (listagem.length === 0) {
            return res.status(404).json({
                mensagem: "Nenhuma candidatura encontrada."
            });
        }
        return res.status(200).json(listagem);
    }
    catch (error) {
        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
});
exports.default = router;
