import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.post ("/candidatar/:id", verificarToken, async (req: RequestUserId, res: Response) => {

    const idPostagem = req.params.id as string;

    try {

        const postagem = await prisma.postagemFamilia.findUnique({
            where:{
                id: idPostagem
            }
        });

        if (!postagem) {
            return res.status(404).json({mensagem: "Essa postagem não existe."});
        };
    
        const baba = await prisma.usuario.findFirst({
            where:{
                id: req.userId
            }
        });

        

        if (!baba) {
            return res.status(404).json({mensagem: "Essa babá não existe."});
        };

        const candidatosLista = await prisma.candidatos.findFirst({
            where: {
                id: idPostagem,
                candidatos: baba.nome  
            } 
        });

        if (baba.perfil !== "Babá") {
            return res.status(401).json({mensagem: "Voçê não é uma babá"});
        };

        if (candidatosLista) {
            return res.status(400).json({mensagem: "Voçê já se candidatou!"});
        };


        const candidatura = await prisma.candidatos.create({
            data:{
                candidatos: baba.nome,
                id: baba.id
            }
        });

        return res.status(201).json({mensagem: "Candidatura feita com sucesso", candidatura});
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."});
    };

});

export default router;