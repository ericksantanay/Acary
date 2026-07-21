"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.delete("/deletarPostagem/:id", auth_1.verificarToken, async (req, res) => {
    const deleteId = req.params.id;
    try {
        if (!req.userId) {
            return res.status(401).json({
                mensagem: "Usuário não autenticado."
            });
        }
        ;
        const postagemDelete = await prisma_1.default.postagemFamilia.findFirst({
            where: {
                id: deleteId,
                userId: req.userId
            }
        });
        if (!postagemDelete) {
            return res.status(404).json({
                mensagem: "Postagem não encontrada ou não pertence ao usuário."
            });
        }
        ;
        // Apaga todas as candidaturas da postagem
        await prisma_1.default.candidatura.deleteMany({
            where: {
                postagemId: deleteId
            }
        });
        // Apaga a postagem
        await prisma_1.default.postagemFamilia.delete({
            where: {
                id: deleteId
            }
        });
        return res.status(200).json({
            mensagem: "Postagem excluída com sucesso."
        });
    }
    catch (error) {
        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }
    ;
});
exports.default = router;
