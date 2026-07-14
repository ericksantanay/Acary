import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.get("/pesquisa", async (req: Request, res: Response) => {
    
    try {
        const {cidade} = req.query;

        if (!cidade) {
            return res.status(404).json({mensagem:"Cidade não encontrada"});
        };

        const buscaUsuarioBaba = await prisma.postagemFamilia.findMany({
            where:{
                cidade:{
                    contains: cidade as string
                }
            }
        });

        if (buscaUsuarioBaba.length === 0) {
            return res.status(404).json({mensagem: "Cidade não encontrada"});
        };

        return res.status(200).json(buscaUsuarioBaba);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"});
    };
    
})

export default router;