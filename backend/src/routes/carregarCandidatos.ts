import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

router.get("/carregarCandidatura/:id", verificarToken , async (req: Request, res: Response) => {

    try {
        
        

        const listagem = await prisma.candidatura.findMany({
            where:{
                postagemId: req.params.id as string
            }
        })

        if (listagem.length === 0) {
            return res.status(404).json({mensagem: "Você não tem nem um candidatura"});
        };

        return res.status(200).json(listagem)

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor"});  
    };

});



export default router;