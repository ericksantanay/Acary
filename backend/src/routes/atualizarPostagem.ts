import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

type ID = {
    id: string
}

router.patch("/atualizarPostagem/:id", verificarToken, async (req: RequestUserId, res: Response) => {

    const idDaPostagem = req.params.id;

    const {cidade, criancas, valor, responsavel, dataEhorarioInicio, dataEhorarioTermino} = req.body;

    if (!cidade || !criancas || !valor || !responsavel || !dataEhorarioInicio || !dataEhorarioTermino) {
        return res.status(400).json({mensagem: "Valores não correspondidos."});
    };

    try {

        const bucandoPostagem = await prisma.postagemFamilia.findFirst({
            where:{
                userId: req.userId,
                id: idDaPostagem
            } as ID
        });

        if (!bucandoPostagem) {
            return res.status(404).json({mensagem: "Postagem não existe."});
        };

        const valorConvertido = Number(valor);

        // Objeto dos dados atualizados
        const dadosAtualizados: any = {};

        if (cidade) {
            dadosAtualizados.cidade = cidade;
        };

        if (criancas) {
            dadosAtualizados.criancas = criancas;
        };

        if (valor) {
            dadosAtualizados.valor = valorConvertido;
        };

        if (responsavel) {
            dadosAtualizados.responsavel = responsavel;
        };

        if (dataEhorarioInicio) {
            dadosAtualizados.dataEhorarioInicio = dataEhorarioInicio;
        };

        if (dataEhorarioTermino) {
            dadosAtualizados.dataEhorarioTermino = dataEhorarioTermino;
        };

        // Nada enviado?
        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({mensagem: "Nenhum dado enviado para atualização"});
        };

        const postagemAtualizada = await prisma.postagemFamilia.update({
            where: {
                id: idDaPostagem as any
            },

            data: dadosAtualizados
        })

        return res.status(200).json({mensagem: "Postagem atualizada com sucesso.", postagemAtualizada});
        
    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."});
    };

});


export default router;