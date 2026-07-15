import { Router } from "express";
import prisma from "../lib/prisma";
import { Request, Response } from "express";
import {verificarToken} from "../middlewares/auth";

const router = Router();

interface RequestUserId extends Request {
    userId?: string
}

router.get("/carregarServicos", verificarToken, async (req: RequestUserId, res: Response) => {

    try {

      if (!req.userId) {
        return res.status(401).json({ mensagem: "Usuário não autenticado." });
      };

      const usuario = await prisma.usuario.findUnique({
        where:{
          id: req.userId
        }
      })

      if (!usuario) {
        return res.status(404).json({mensagem: "Usuario não existe."});
      };

      if (usuario.perfil !==  "Babá") {
        return res.status(401).json({mensagem: "Voçê não tem autorização!"});
      };

      const servicosDisponiveis = await prisma.postagemFamilia.findMany();

      if (servicosDisponiveis.length === 0) {
        return res.status(404).json({mensagem: "Nem um serviço encontardo"});
      };

      const servicosDisponiveisAtualizado = servicosDisponiveis.map((el) => {

        return {
          ...el,
          valor: el.valor / 100
        }

      })

      res.status(200).json(servicosDisponiveisAtualizado);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro no servidor."});
    };

});

export default router;