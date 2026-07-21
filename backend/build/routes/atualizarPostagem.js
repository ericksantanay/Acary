"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.patch("/atualizarPostagem/:id", auth_1.verificarToken, async (req, res) => {
    const idDaPostagem = req.params.id;
    const { cidade, criancas, valor, responsavel, dataEhorarioInicio, dataEhorarioTermino } = req.body;
    if (!cidade || !criancas || !valor || !responsavel || !dataEhorarioInicio || !dataEhorarioTermino) {
        return res.status(400).json({ mensagem: "Valores não correspondidos." });
    }
    ;
    try {
        const bucandoPostagem = await prisma_1.default.postagemFamilia.findFirst({
            where: {
                userId: req.userId,
                id: idDaPostagem
            }
        });
        if (!bucandoPostagem) {
            return res.status(404).json({ mensagem: "Postagem não existe." });
        }
        ;
        const valorConvertido = Number(valor);
        // Objeto dos dados atualizados
        const dadosAtualizados = {};
        if (cidade) {
            dadosAtualizados.cidade = cidade;
        }
        ;
        if (criancas) {
            dadosAtualizados.criancas = criancas;
        }
        ;
        if (valor) {
            dadosAtualizados.valor = valorConvertido;
        }
        ;
        if (responsavel) {
            dadosAtualizados.responsavel = responsavel;
        }
        ;
        if (dataEhorarioInicio) {
            dadosAtualizados.dataEhorarioInicio = dataEhorarioInicio;
        }
        ;
        if (dataEhorarioTermino) {
            dadosAtualizados.dataEhorarioTermino = dataEhorarioTermino;
        }
        ;
        // Nada enviado?
        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({ mensagem: "Nenhum dado enviado para atualização" });
        }
        ;
        const postagemAtualizada = await prisma_1.default.postagemFamilia.update({
            where: {
                id: idDaPostagem
            },
            data: dadosAtualizados
        });
        return res.status(200).json({ mensagem: "Postagem atualizada com sucesso.", postagemAtualizada });
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor." });
    }
    ;
});
exports.default = router;
