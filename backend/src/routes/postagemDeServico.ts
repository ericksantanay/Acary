import {Router}  from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

interface Postagem {
   cidade: string,
   criancas: string,
   valor: string,
   responsavel: string,
   dataEhorarioInicio: string,
   dataEhorarioTermino: string
}

interface RequestUserId extends Request {
    userId?: string
}

router.post("/postarServicos", verificarToken ,async (req: RequestUserId, res: Response) => {

    const {cidade, criancas, valor, responsavel, dataEhorarioInicio, dataEhorarioTermino} = req.body as Postagem;

    if (!cidade || !criancas || !valor || !responsavel || !dataEhorarioInicio || !dataEhorarioTermino) {
        return res.status(404).json({mensagem: "Valores não correspondidos."});
    };

    try {

        const criancasConvertido = Number(criancas)
        let valorConvertido = Number(valor);

        if (isNaN(valorConvertido) || valorConvertido <= 0) {
            return res.status(400).json({ mensagem: "Valor inválido"});
        };


        if (isNaN(criancasConvertido) || criancasConvertido <= 0) {
            return res.status(400).json({ mensagem: "Numero de crianças inválido"});
        };

        const postagensBuscadas = await prisma.postagemFamilia.findFirst({
            where:{
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
            await prisma.postagemFamilia.create({
                data: {
                    cidade: cidade,
                    criancas: criancasConvertido,
                    valor: valorConvertido,
                    responsavel: responsavel,
                    dataEhorarioInicio: dataEhorarioInicio,
                    dataEhorarioTermino: dataEhorarioTermino,
                    userId: req.userId
                } as any
            });

            return res.status(201).json({mensagem: "Serviço criado com sucesso."});
        }else {
            return res.status(403).json({mensagem: "Esse serviço já existe."});
        };
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."})
    };

});

export default router;