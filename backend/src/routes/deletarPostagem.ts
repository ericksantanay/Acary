import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { verificarToken } from "../middlewares/auth";

const router = Router();

interface RequestUserId extends Request {
    userId?: string;
}

router.delete("/deletarPostagem/:id", verificarToken, async (req: RequestUserId, res: Response) => {

    const deleteId = req.params.id;

    try {

        if (!req.userId) {
            return res.status(401).json({
                mensagem: "Usuário não autenticado."
            });
        };

        const postagemDelete = await prisma.postagemFamilia.findFirst({
            where: {
                id: deleteId as string,
                userId: req.userId
            }
        });

        if (!postagemDelete) {
            return res.status(404).json({
                mensagem: "Postagem não encontrada ou não pertence ao usuário."
            });
        };

        // Apaga todas as candidaturas da postagem
        await prisma.candidatura.deleteMany({
            where: {
                postagemId: deleteId as string
            }
        });

        // Apaga a postagem
        await prisma.postagemFamilia.delete({
            where: {
                id: deleteId as string
            }
        });

        return res.status(200).json({
            mensagem: "Postagem excluída com sucesso."
        });

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    };
});

export default router;