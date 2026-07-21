"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
router.get("/pesquisa", async (req, res) => {
    try {
        const { cidade } = req.query;
        if (!cidade) {
            return res.status(404).json({ mensagem: "Cidade não encontrada" });
        }
        ;
        const buscaUsuarioBaba = await prisma_1.default.postagemFamilia.findMany({
            where: {
                cidade: {
                    contains: cidade
                }
            }
        });
        if (buscaUsuarioBaba.length === 0) {
            return res.status(404).json({ mensagem: "Cidade não encontrada" });
        }
        ;
        return res.status(200).json(buscaUsuarioBaba);
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor" });
    }
    ;
});
exports.default = router;
