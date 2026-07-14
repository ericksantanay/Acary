import e, { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import { verificarToken } from "../middlewares/auth";

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.get("/meusServicos", verificarToken, async (req: RequestUserId, res: Response) => {

    try {

        if (!req.userId) {
            return res.status(401).json({mensagem: "Usuário não autenticado."});
        };
        
        const meusServicos = await prisma.postagemFamilia.findMany({
            where:{
                userId: req.userId
            },

            select:{
                id:true,
                cidade: true,
                responsavel: true,
                criancas: true,
                valor: true,
                dataEhorarioInicio: true,
                dataEhorarioTermino: true
            }
        });

        const meusServicosatualizadoComOValor = meusServicos.map((el) => {

            return {
                ...el,
                valor: el.valor / 100
            }

        })

        return res.status(200).json(meusServicosatualizadoComOValor);
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."});
    };

});
export default router;