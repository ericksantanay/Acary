import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.get("/carregarServicos", async (req: Request, res: Response) => {

    

    try {
      const servicosDisponiveis = await prisma.postagemFamilia.findMany();

      res.status(200).json(servicosDisponiveis)

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."});
    };

});

export default router;