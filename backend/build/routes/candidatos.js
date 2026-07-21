"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/candidatar/:id", auth_1.verificarToken, async (req, res) => {
    const idPostagem = req.params.id;
    try {
        const postagem = await prisma_1.default.postagemFamilia.findUnique({
            where: {
                id: idPostagem
            }
        });
        if (!postagem) {
            return res.status(404).json({ mensagem: "Essa postagem não existe." });
        }
        ;
        const baba = await prisma_1.default.usuario.findFirst({
            where: {
                id: req.userId
            }
        });
        if (!baba) {
            return res.status(404).json({ mensagem: "Essa babá não existe." });
        }
        ;
        const candidatosLista = await prisma_1.default.candidatura.findFirst({
            where: {
                postagemId: idPostagem,
                usuarioId: req.userId
            }
        });
        if (baba.perfil !== "Babá") {
            return res.status(401).json({ mensagem: "Voçê não é uma babá" });
        }
        ;
        if (candidatosLista) {
            return res.status(400).json({ mensagem: "Voçê já se candidatou!" });
        }
        ;
        const candidatura = await prisma_1.default.candidatura.create({
            data: {
                usuarioId: baba.id,
                postagemId: postagem.id
            }
        });
        return res.status(201).json({ mensagem: "Candidatura feita com sucesso", candidatura });
    }
    catch (error) {
        return res.status(500).json({ mensagem: "Erro no servidor." });
    }
    ;
});
exports.default = router;
