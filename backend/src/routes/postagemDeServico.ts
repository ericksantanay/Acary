import {Router}  from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";

const router = Router();

router.post("/postarServicos", async (req: Request, res: Response) => {

    const {cidade, criancas, valor, responsavel, dataEhorarioInicio, dataEhorarioTermino} = req.body;

    if (!cidade || !criancas || !valor || !responsavel || !dataEhorarioInicio || !dataEhorarioTermino) {
        return res.status(404).json({mensagem: "Valores não correspondidos."});
    };

    try {

        const criancasConvertido = Number(criancas)
        const valorConvertido = Number(valor);

        const postagensBuscadas = await prisma.postagemFamilia.findFirst({
            where:{
                cidade: cidade,
                criancas: criancasConvertido,
                valor: valorConvertido,
                responsavel: responsavel,
                dataEhorarioInicio: dataEhorarioInicio,
                dataEhorarioTermino: dataEhorarioTermino
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
                    dataEhorarioTermino: dataEhorarioTermino
                }
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