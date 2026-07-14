import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

router.delete("/deletarPostagem/:id", verificarToken, async (req: Request, res: Response) => {

    const deleteId = req.params.id as string;

    try {
        
        const postagem = await prisma.postagemFamilia.delete({
            where:{
                id: deleteId
            }
        });

        if (!postagem) {
            return res.status(404).json({mensagem: "Postagem não existe."});
        };

        return res.status(200).json({mensagem: "Postagem excluida com sucesso"});
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"});
    };

});


export default router;