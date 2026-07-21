"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
// Carregar Postagem do propio usuario!
const router = (0, express_1.Router)();
router.get("/meusServicos", auth_1.verificarToken, async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ mensagem: "Usuário não autenticado." });
        }
        ;
        const meusServicos = await prisma_1.default.postagemFamilia.findMany({
            where: {
                userId: req.userId
            },
            select: {
                id: true,
                cidade: true,
                responsavel: true,
                criancas: true,
                valor: true,
                dataEhorarioInicio: true,
                dataEhorarioTermino: true
            }
        });
        if (meusServicos.length === 0) {
            return res.status(404).json({ mensagem: "Voçê não fez nem uma postagem." });
        }
        ;
        const meusServicosatualizadoComOValor = meusServicos.map((el) => {
            return {
                ...el,
                valor: el.valor / 100
            };
        });
        return res.status(200).json(meusServicosatualizadoComOValor);
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor." });
    }
    ;
});
exports.default = router;
