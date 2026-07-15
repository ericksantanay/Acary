import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { verificarToken } from "../middlewares/auth";

const router = Router();

interface RequestUserId extends Request {
    userId?: string;
}

router.get("/carregarCandidatura/:id", verificarToken, async (req: RequestUserId, res: Response) => {

    try {

        if (!req.userId) {
            return res.status(401).json({ mensagem: "Usuário não autenticado." });
        }

        const postagem = await prisma.postagemFamilia.findFirst({
            where: {
                id: req.params.id as string,
                userId: req.userId
            }
        });

        if (!postagem) {
            return res.status(404).json({
                mensagem: "Postagem não encontrada ou não pertence ao usuário."
            });
        }

        const listagem = await prisma.candidatura.findMany({
            where: {
                postagemId: req.params.id as string
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

    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro no servidor."
        });
    }

});

export default router;