"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/postarServicos", auth_1.verificarToken, async (req, res) => {
    const { cidade, criancas, valor, responsavel, dataEhorarioInicio, dataEhorarioTermino } = req.body;
    if (!cidade || !criancas || !valor || !responsavel || !dataEhorarioInicio || !dataEhorarioTermino) {
        return res.status(404).json({ mensagem: "Valores não correspondidos." });
    }
    ;
    try {
        const criancasConvertido = Number(criancas);
        let valorConvertido = Number(valor);
        if (isNaN(valorConvertido) || valorConvertido <= 0) {
            return res.status(400).json({ mensagem: "Valor inválido" });
        }
        ;
        if (isNaN(criancasConvertido) || criancasConvertido <= 0) {
            return res.status(400).json({ mensagem: "Numero de crianças inválido" });
        }
        ;
        const postagensBuscadas = await prisma_1.default.postagemFamilia.findFirst({
            where: {
                cidade: cidade,
                criancas: criancasConvertido,
                valor: valorConvertido,
                responsavel: responsavel,
                dataEhorarioInicio: dataEhorarioInicio,
                dataEhorarioTermino: dataEhorarioTermino,
                userId: req.userId
            }
        });
        if (!postagensBuscadas) {
            await prisma_1.default.postagemFamilia.create({
                data: {
                    cidade: cidade,
                    criancas: criancasConvertido,
                    valor: valorConvertido,
                    responsavel: responsavel,
                    dataEhorarioInicio: dataEhorarioInicio,
                    dataEhorarioTermino: dataEhorarioTermino,
                    userId: req.userId
                }
            });
            return res.status(201).json({ mensagem: "Serviço criado com sucesso." });
        }
        else {
            return res.status(403).json({ mensagem: "Esse serviço já existe." });
        }
        ;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro no servidor." });
    }
    ;
});
exports.default = router;
